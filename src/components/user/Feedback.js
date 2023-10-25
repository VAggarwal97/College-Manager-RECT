import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

import DisplayFeedback from './DisplayFeedback';


const Feedback = () => {
    const [feedbackData, setFeedbackData] = useState({
        studentName: '',
        facultyName: '',
        feedbackContent: '',
    });

    const [userEmail, setUserEmail] = useState('');

    // Get the current user's email
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedbackData({
            ...feedbackData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add feedback data to Firestore with user email
            const feedbackRef = collection(firestore, 'feedback');
            await addDoc(feedbackRef, {
                ...feedbackData,
                userEmail, // Include the user's email in the feedback document
            });

            // Clear the form fields after submission
            setFeedbackData({
                studentName: '',
                facultyName: '',
                feedbackContent: '',
            });

            alert('Feedback submitted successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('An error occurred while submitting feedback. Please try again later.');
        }
    };

    return (
        <div className="editstudentdetail">
            <h2 className='editstudheading'>Submit Feedback</h2>
            <form className='editstudform' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="studentName">Student Name:</label>
                    <input className='editstudinput'
                        type="text"
                        id="studentName"
                        name="studentName"
                        value={feedbackData.studentName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="facultyName">Faculty Name:</label>
                    <input className='editstudinput'
                        type="text"
                        id="facultyName"
                        name="facultyName"
                        value={feedbackData.facultyName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="feedbackContent">Feedback:</label>
                    <textarea
                    className='editstudinput'
                        id="feedbackContent"
                        name="feedbackContent"
                        value={feedbackData.feedbackContent}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button className='editstudbtn' type="submit">Submit Feedback</button>
            </form>
            <div className="posts">
                <DisplayFeedback />
            </div>
        </div>
    );
};

export default Feedback;

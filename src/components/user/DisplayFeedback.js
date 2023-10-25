import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const DisplayFeedback = () => {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                // Fetch feedback data from Firestore
                const feedbackRef = collection(firestore, 'feedback');
                const querySnapshot = await getDocs(feedbackRef);

                const feedbackData = [];
                querySnapshot.forEach((doc) => {
                    feedbackData.push({ id: doc.id, ...doc.data() });
                });

                setFeedbackList(feedbackData);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };

        fetchFeedback();
    }, []);

    return (
        <div className="feedback-list">
            <h2>Feedback List</h2>
            <ul>
                {feedbackList.map((feedback) => (
                    <li key={feedback.id}>
                        <h3>Student Name: {feedback.studentName}</h3>
                        <p>Faculty Name: {feedback.facultyName}</p>
                        <p>Feedback: {feedback.feedbackContent}</p>
                        <p>User Email: {feedback.userEmail}</p> {/* Display the user's email */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayFeedback;

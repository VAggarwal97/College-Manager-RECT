import React, { useState } from 'react';
import { firestore } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import StudentList from './StudentList';
import DisplayGrade from '../DisplayGrades';

const UpdateGrade = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [courseName, setCourseName] = useState('');
    const [grade, setGrade] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Add the grade data to Firestore
            const gradesRef = collection(firestore, 'grades');
            await addDoc(gradesRef, {
                rollNumber,
                courseName,
                grade,
            });

            alert('Grade updated successfully!');

            // Clear the form fields after submission
            setRollNumber('');
            setCourseName('');
            setGrade('');
        } catch (error) {
            console.error('Error updating grade:', error);
            alert('An error occurred while updating the grade. Please try again.');
        }
    };

    return (
        <div className="editstudentdetail">
            <h2 className='editstudheading'>Update Grade</h2>
            <form className='editstudform' onSubmit={handleSubmit}>


                <div>
                    <label>Student's Roll Number:</label>
                    <input className='editstudinput'
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        required
                    />
                </div>
                <br />
                <div>
                    <label>Course Name:</label>
                    <input className='editstudinput'
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                    />
                </div>
                <br />
                <div>
                    <label>Grade:</label>
                    <input className='editstudinput'
                        type="text"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                    />
                </div>
                <br />
                <button className='editstudbtn' type="submit">Update Grade</button>
            </form>
            <div className="editstudentdetail">
                <DisplayGrade />
            </div>
            <div className="studentdetails">
                <StudentList filterRole="Student" />
            </div>
        </div>
    );
};

export default UpdateGrade;

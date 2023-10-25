import React, { useState } from 'react';
import { firestore } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const DisplayGrade = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [grades, setGrades] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Query Firestore to fetch grades based on the roll number
            const gradesRef = collection(firestore, 'grades');
            const q = query(gradesRef, where('rollNumber', '==', rollNumber));
            const querySnapshot = await getDocs(q);

            const gradesData = [];
            querySnapshot.forEach((doc) => {
                gradesData.push({ id: doc.id, ...doc.data() });
            });

            setGrades(gradesData);
        } catch (error) {
            console.error('Error fetching grades:', error);
            alert('An error occurred while fetching grades. Please try again.');
        }
    };

    return (
        <div className="editstudentdetail">
            <h2>Display Grade</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Enter Student's Roll Number:</label>
                    <input
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        required
                    />
                </div>
                <button className='editstudbtn' type="submit">Fetch Grades</button>
            </form>

            {grades.length > 0 ? (
                <div>
                    <h3>Grades for Roll Number: {rollNumber}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((grade) => (
                                <tr key={grade.id}>
                                    <td>{grade.courseName}</td>
                                    <td>{grade.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </div>
    );
};

export default DisplayGrade;

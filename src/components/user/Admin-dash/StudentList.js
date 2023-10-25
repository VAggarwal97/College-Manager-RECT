import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase'; // Make sure to import your Firebase Firestore module
import { collection, getDocs, query, where } from 'firebase/firestore';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                // Create a query to filter students by role
                const studentsRef = collection(firestore, 'users');
                const roleFilter = where('role', '==', 'Student');
                const q = query(studentsRef, roleFilter);

                const querySnapshot = await getDocs(q);

                const studentsData = [];
                querySnapshot.forEach((doc) => {
                    studentsData.push({ id: doc.id, ...doc.data() });
                });

                setStudents(studentsData);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className='studentdetails'>
            <h2>Student List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roll No.</th>
                        <th>Group</th>
                        <th>Course</th>
                        <th>Role</th>
                        {/* Add other columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.fullName}</td>
                            <td>{student.email}</td>
                            <td>{student.rollNumber}</td>
                            <td>{student.group}</td>
                            <td>{student.course}</td>
                            <td>{student.role}</td>
                            {/* Add other columns as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;

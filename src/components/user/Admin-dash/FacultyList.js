import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase'; // Make sure to import your Firebase Firestore module
import { collection, getDocs, query, where } from 'firebase/firestore';

const FacultyList = () => {
    const [facultyMembers, setFacultyMembers] = useState([]);

    useEffect(() => {
        const fetchFacultyMembers = async () => {
            try {
                // Create a query to filter faculty members by role
                const facultyRef = collection(firestore, 'users');
                const roleFilter = where('role', '==', 'Faculty');
                const q = query(facultyRef, roleFilter);

                const querySnapshot = await getDocs(q);

                const facultyData = [];
                querySnapshot.forEach((doc) => {
                    facultyData.push({ id: doc.id, ...doc.data() });
                });

                setFacultyMembers(facultyData);
            } catch (error) {
                console.error('Error fetching faculty members:', error);
            }
        };

        fetchFacultyMembers();
    }, []);

    return (
        <div>
            <h2>Faculty List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>contact</th>
                        {/* Add other columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {facultyMembers.map((facultyMember) => (
                        <tr key={facultyMember.id}>
                            <td>{facultyMember.fullName}</td>
                            <td>{facultyMember.email}</td>
                            <td>{facultyMember.role}</td>
                            <td>{facultyMember.contact}</td>
                            {/* Add other columns as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FacultyList;

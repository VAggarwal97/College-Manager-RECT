// export default AssignGroups;
import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase';
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
} from 'firebase/firestore';
import StudentList from './StudentList';

const AssignGroups = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    //   const [groups, setGroups] = useState([]);

    // Fetch the list of students
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentsRef = collection(firestore, 'users');
                const q = query(
                    studentsRef,
                    where('role', '==', 'Student'),
                    // You can add more filters if needed
                );
                const querySnapshot = await getDocs(q);

                const studentsData = [];
                querySnapshot.forEach((doc) => {
                    const studentData = doc.data();
                    studentsData.push({ id: doc.id, ...studentData });
                });

                setStudents(studentsData);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleAssignGroup = async () => {
        try {
            if (selectedStudent && selectedGroup) {
                // Update the student's group assignment in Firestore
                const studentDocRef = doc(firestore, 'users', selectedStudent);
                await setDoc(
                    studentDocRef,
                    { group: selectedGroup },
                    { merge: true } // Merge the new data with existing data
                );
                alert('Student assigned to the group successfully.');
                window.location.reload();
            } else {
                alert('Please select a student and a group to assign.');
            }
        } catch (error) {
            console.error('Error assigning group:', error);
        }
    };

    return (
        <div className="editstudentdetail">
            <h2 className='editstudheading'>Assign Groups to Students</h2>
            <br />

            <div className="editstudform">
                <div className='editstudform' >
                    <label className='editstudlable'>Select Student by Roll Number:</label>
                    <select className='editstudinput'
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                        <option value="">Select a Student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.rollNumber} - {student.fullName}
                            </option>
                        ))}
                    </select>

                </div>
                <div className='editstudform'>
                    <label className='editstudlable'>Select Group:</label>
                    <select
                    className='editstudinput'
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                    >
                        <option value="">Select a Group</option>
                        <option value="G1">Group 1</option>
                        <option value="G2">Group 2</option>
                        <option value="G3">Group 3</option>
                        <option value="G4">Group 4</option>
                        <option value="G5">Group 5</option>
                        <option value="G6">Group 6</option>
                        <option value="G7">Group 7</option>
                        <option value="G8">Group 8</option>
                        <option value="G9">Group 9</option>
                        <option value="G10">Group 10</option>
                        {/* Add other group options */}
                    </select>
                </div>
                <button className='editstudbtn' onClick={handleAssignGroup}>Assign Group</button>
            </div>


            <br />
            <br />
            <br />

            <div className="studentdetails">
                <StudentList filterRole="Student" />
            </div>
        </div>
    );
};

export default AssignGroups;

import React, { useState } from 'react';
import { firestore } from '../../firebase';
import { collection, query, where, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import StudentList from './StudentList';

const EditStudentProfile = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [student, setStudent] = useState(null);
    const [editedStudent, setEditedStudent] = useState({
        name: '',
        email: '',
        rollNumber: '',
        // Add other fields here
    });

    const handleSearch = async () => {
        try {
            // Query Firestore to find the student by roll number
            const studentsRef = collection(firestore, 'users');
            const q = query(studentsRef, where('role', '==', 'Student'), where('rollNumber', '==', rollNumber));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.size === 1) {
                const studentDoc = querySnapshot.docs[0];
                const studentData = studentDoc.data();
                setStudent({ id: studentDoc.id, ...studentData });
                setEditedStudent({ ...studentData });
            } else {
                setStudent(null); // Student not found
                setEditedStudent({
                    name: '',
                    email: '',
                    rollNumber: '',
                    // Reset other fields
                });
            }
        } catch (error) {
            console.error('Error searching for student:', error);
        }
    };

    const handleSave = async () => {
        try {
            if (student) {
                // Update the student's details in Firestore
                const studentDocRef = doc(firestore, 'users', student.id);
                await setDoc(studentDocRef, editedStudent, { merge: true });
                alert('Student details updated successfully.');
                window.location.reload();
            } else {
                alert('Student not found. Please search for a valid student.');
            }
        } catch (error) {
            console.error('Error updating student details:', error);
        }
    };

    const handleDelete = async () => {
        try {
            if (student) {
                // Delete the student's data from Firestore
                const studentDocRef = doc(firestore, 'users', student.id);
                await deleteDoc(studentDocRef);
                alert('Student deleted successfully.');
                setStudent(null); // Clear the student data after deletion
            } else {
                alert('Student not found. Please search for a valid student.');
            }
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    return (
        <div className='editstudentdetail'>
            <h2 className='editstudheading'>Edit Student Profile</h2>
            <div className='editstudlable'>
                <label className='editstudlable'>Enter Student Roll Number:</label>
                <input className='editstudinput'
                placeholder='Enter roll number'
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                />
                <button className='editstudbtn' onClick={handleSearch}>Search</button>
            </div>
            {student && (
                <div>
                    <h3 className='editstudheading'>Student Details</h3>
                    <form className='editstudform'>
                        <div className='editstudform'>
                            <label>Name:</label>
                            <input className='editstudinput'
                                type="text"
                                value={editedStudent.fullName}
                                onChange={(e) => setEditedStudent({ ...editedStudent, fullName: e.target.value })}
                            />
                        </div>
                        <div className='editstudform'>
                            <label>RollNumber:</label>
                            <input className='editstudinput'
                                type="text"
                                value={editedStudent.rollNumber}
                                onChange={(e) => setEditedStudent({ ...editedStudent, rollNumber: e.target.value })}
                            />
                        </div>
                        <div className='editstudform'>
                            <label>Email:</label>
                            <input className='editstudinput'
                                type="text"
                                value={editedStudent.email}
                                onChange={(e) => setEditedStudent({ ...editedStudent, email: e.target.value })}
                            />
                        </div>
                        {/* Add other fields here */}
                        <button className='editstudbtn' type="button" onClick={handleSave}>Save</button>
                        <button className='editstudbtn' type="button" onClick={handleDelete}>Delete</button>
                    </form>
                </div>
            )}
            <div className="details">
                <div className="studentdetails">
                    <StudentList filterRole="Student" />
                </div>


            </div>

        </div>
    );
};

export default EditStudentProfile;


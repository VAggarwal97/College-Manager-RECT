import React, { useState } from 'react';
import { firestore } from '../../firebase';
import { collection, query, where, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import FacultyList from './FacultyList';

const EditFacultyProfile = () => {
    const [contact, setcontact] = useState('');
    const [Faculty, setFaculty] = useState(null);
    const [editedFaculty, setEditedFaculty] = useState({
        name: '',
        email: '',
        contact: '',
        // Add other fields here
    });

    const handleSearch = async () => {
        try {
            // Query Firestore to find the Faculty by roll number
            const FacultyRef = collection(firestore, 'users');
            const q = query(FacultyRef, where('role', '==', 'Faculty'), where('contact', '==', contact));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.size === 1) {
                const FacultyDoc = querySnapshot.docs[0];
                const FacultyData = FacultyDoc.data();
                setFaculty({ id: FacultyDoc.id, ...FacultyData });
                setEditedFaculty({ ...FacultyData });
            } else {
                setFaculty(null); // Student not found
                setEditedFaculty({
                    name: '',
                    email: '',
                    contact: '',
                    // Reset other fields
                });
            }
        } catch (error) {
            console.error('Error searching for Faculty:', error);
        }
    };

    const handleSave = async () => {
        try {
            if (Faculty) {
                // Update the Faculty's details in Firestore
                const FacultyDocRef = doc(firestore, 'users', Faculty.id);
                await setDoc(FacultyDocRef, editedFaculty, { merge: true });
                alert('Faculty details updated successfully.');
                window.location.reload();
            } else {
                alert('Faculty not found. Please search for a valid student.');
            }
        } catch (error) {
            console.error('Error updating Faculty details:', error);
        }
    };

    const handleDelete = async () => {
        try {
            if (Faculty) {
                // Delete the Faculty's data from Firestore
                const FacultyDocRef = doc(firestore, 'users', Faculty.id);
                await deleteDoc(FacultyDocRef);
                alert('Faculty deleted successfully.');
                setFaculty(null); // Clear the student data after deletion
            } else {
                alert('Faculty not found. Please search for a valid student.');
            }
        } catch (error) {
            console.error('Error deleting Faculty:', error);
        }
    };

    return (
        <div className='editstudentdetail'>
            <h2 className='editstudheading'>Edit Faculty Profile</h2>
            <div className='editstudlable'>
                <label>Enter Faculty contact:</label>
                <input
                    className='editstudinput'
                    type="text"
                    value={contact}
                    onChange={(e) => setcontact(e.target.value)}
                />
                <button className='editstudbtn' onClick={handleSearch}>Search</button>
            </div>
            {Faculty && (
                <div className='editstudform'>
                    <h3 className='editstudheading'>Faculty Details</h3>
                    <form className='editstudform'>
                        <div className='editstudform'>
                            <label>Name:</label>
                            <input className='editstudinput'
                                type="text"
                                value={editedFaculty.fullName}
                                onChange={(e) => setEditedFaculty({ ...editedFaculty, fullName: e.target.value })}
                            />
                        </div>
                        <div className='editstudform'>
                            <label>contact:</label>
                            <input className='editstudinput'
                                type="text"
                                value={editedFaculty.contact}
                                onChange={(e) => setEditedFaculty({ ...editedFaculty, contact: e.target.value })}
                            />
                        </div>
                        <div className='editstudform'>
                            <label>Email:</label>
                            <input className='editstudinput'
                                type="text"
                                value={editedFaculty.email}
                                onChange={(e) => setEditedFaculty({ ...editedFaculty, email: e.target.value })}
                            />
                        </div>
                        {/* Add other fields here */}
                        <button className='editstudbtn' type="button" onClick={handleSave}>Save</button>
                        <button className='editstudbtn' type="button" onClick={handleDelete}>Delete</button>
                    </form>
                </div>
            )}
            <div className="details">
                <div className="Facultydetails">
                    <FacultyList filterRole="Faculty" />
                </div>


            </div>

        </div>
    );
};

export default EditFacultyProfile;

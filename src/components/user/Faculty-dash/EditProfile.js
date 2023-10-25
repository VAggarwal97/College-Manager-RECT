import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import { doc, collection, getDoc, updateDoc } from 'firebase/firestore';

const EditProfile = () => {
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedFullName, setUpdatedFullName] = useState('');
    const [updatedcontact, setUpdatedcontact] = useState('');

    useEffect(() => {
        // Fetch user data from Firestore when the page loads
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;

                if (user) {
                    const userEmail = user.email;
                    const userDocSnapshot = await getUserDoc(userEmail);

                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        setUserData(userData);
                        setUpdatedFullName(userData.fullName);
                        setUpdatedcontact(userData.contact);
                    } else {
                        console.log('User data not found');
                    }
                } else {
                    console.log('User is not authenticated.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const getUserDoc = async (email) => {
        const userDocRef = doc(collection(firestore, 'users'), email);
        const userDocSnapshot = await getDoc(userDocRef);
        return userDocSnapshot;
    };

    const handleEditProfile = () => {
        setEditMode(true);
    };

    const handleSaveProfile = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userEmail = user.email;
                const userDocRef = doc(collection(firestore, 'users'), userEmail);
                await updateDoc(userDocRef, {
                    fullName: updatedFullName,
                    contact: updatedcontact,
                });
                setUserData({ ...userData, fullName: updatedFullName });
                setEditMode(false);
                // Provide feedback to the user (e.g., success message)
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            // Provide error feedback to the user
        }
    };

    return (
        <div className="edit-profile">
            {editMode && (
                <div>
                    <input
                        type="text"
                        value={updatedFullName}
                        onChange={(e) => setUpdatedFullName(e.target.value)}
                        placeholder="Full Name"
                    />
                    <input
                        type="text"
                        value={updatedcontact}
                        onChange={(e) => setUpdatedcontact(e.target.value)}
                        placeholder="contact"
                    />
                    <button onClick={handleSaveProfile}>Save</button>
                </div>
            )}
            {!editMode && (
                <div>
                    <button onClick={handleEditProfile}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default EditProfile;

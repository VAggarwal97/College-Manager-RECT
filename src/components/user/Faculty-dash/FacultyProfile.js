import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import { doc, collection, getDoc } from 'firebase/firestore';

const FacultySidebar = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            // Check if the user is authenticated
            if (user) {
                const userEmail = user.email;
                getUserData(userEmail); // Fetch user data
            } else {
                setIsLoading(false); // Set loading to false if user is not authenticated
            }
        });

        return () => {
            unsubscribe(); // Unsubscribe from the auth state change listener when the component unmounts
        };
    }, []);

    const getUserData = async (email) => {
        try {
            const userDocRef = doc(collection(firestore, 'users'), email);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                setUserData(userData);
            } else {
                console.log('User data not found');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false); // Set loading to false when user data fetching is complete
        }
    };

    return (
        <div className="student-profile">
            <h3>Admin Profile</h3>
            {isLoading ? ( // Show loading message while fetching user data
                <p>Loading user data...</p>
            ) : userData ? (
                <div>
                    <p>Name: {userData.fullName}</p>
                    <p>email: {userData.email}</p>
                    <p>Mobile: {userData.contact}</p>
                </div>
            ) : (
                <p>User is not authenticated.</p>
            )}
        </div>
    );
};

export default FacultySidebar;

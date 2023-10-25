import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import { doc, collection, getDoc, setDoc } from 'firebase/firestore';

const SocialMedia = () => {
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [newLink, setNewLink] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    const [userEmail, setUserEmail] = useState(null); // Store user email

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const userEmail = user.email;
                setUserEmail(userEmail); // Store user email
                fetchSocialMediaLinks(userEmail); // Fetch social media links
            } else {
                setIsLoading(false); // Set loading to false if user is not authenticated
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const fetchSocialMediaLinks = async (email) => {
        try {
            const socialMediaDocRef = doc(collection(firestore, 'socialMediaLinks'), email);
            const socialMediaDocSnapshot = await getDoc(socialMediaDocRef);
            if (socialMediaDocSnapshot.exists()) {
                const data = socialMediaDocSnapshot.data();
                setSocialMediaLinks(data.links || []);
            } else {
                console.log('Social media links not found');
            }
        } catch (error) {
            console.error('Error fetching social media links:', error);
        } finally {
            setIsLoading(false); // Set loading to false when data fetching is complete
        }
    };

    const handleAddLink = async () => {
        try {
            const updatedLinks = [...socialMediaLinks, newLink];

            if (userEmail) {
                const socialMediaDocRef = doc(collection(firestore, 'socialMediaLinks'), userEmail);
                await setDoc(socialMediaDocRef, { links: updatedLinks }, { merge: true });
                setSocialMediaLinks(updatedLinks);
                setNewLink('');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error adding social media link:', error);
        }
    };

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    return (
        <div className="social-media-page">
            <h3 className='socialheading'>Social Media Links</h3>

            {isLoading ? (
                <p>Loading social media links...</p>
            ) : userEmail ? (
                <div className='social-container'>
                    {editMode ? (
                        <div className='addlink'>
                            <input className='socailinput' 
                                type="text"
                                value={newLink}
                                onChange={(e) => setNewLink(e.target.value)}
                                placeholder="Enter Link Here"
                            />
                            <button className='socalbtn2' onClick={handleAddLink}>Add Link</button>
                            <button className='socalbtn2' onClick={handleEditToggle}>Done Editing</button>
                        </div>
                    ) : (
                        <button className='socalbtn' onClick={handleEditToggle}>Edit</button>
                    )}

                    {socialMediaLinks.length > 0 ? (
                        <ul >
                            {socialMediaLinks.map((link, index) => (
                                <li  key={index}>
                                    <a className='sociallinks' href={link} target="_blank" rel="noopener noreferrer">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No social media links provided.</p>
                    )}
                </div>
            ) : (
                <p>User is not authenticated.</p>
            )}
        </div>
    );
};

export default SocialMedia;

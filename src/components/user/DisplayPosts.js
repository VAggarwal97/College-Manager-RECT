import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';


const DisplayPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch posts from Firestore
                const postsRef = collection(firestore, 'posts');
                const querySnapshot = await getDocs(postsRef);

                const postsData = [];
                querySnapshot.forEach((doc) => {
                    const postData = doc.data();
                    const postDate = postData.timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date
                    const formattedDate = postDate.toLocaleString(); // Format the date as needed

                    postsData.push({
                        id: doc.id,
                        ...postData,
                        timestamp: formattedDate, // Replace timestamp with formatted date
                    });
                });

                // Sort posts by timestamp (newest first)
                postsData.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleDeletePost = async (postId) => {
        try {
            // Delete the post document from Firestore
            const postRef = doc(firestore, 'posts', postId);
            await deleteDoc(postRef);

            // Remove the deleted post from the local state
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    return (
        <div className="editstudentdetail">
            <h2 className='editstudheading'>Posts</h2>
            <ul className='editstudform'>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>Posted at: {post.timestamp}</p>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default DisplayPosts;

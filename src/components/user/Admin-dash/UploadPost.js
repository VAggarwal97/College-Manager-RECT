import React, { useState } from 'react';
import { firestore } from '../../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import DisplayPosts from '../DisplayPosts';

const UploadPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleUpload = async () => {
        try {
            // Get the current timestamp
            const timestamp = Timestamp.now();

            // Create a new post object
            const newPost = {
                title,
                content,
                timestamp,
            };

            // Add the new post to Firestore
            const postsRef = collection(firestore, 'posts');
            await addDoc(postsRef, newPost);

            // Reset the form
            setTitle('');
            setContent('');

            alert('Post uploaded successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error uploading post:', error);
        }
    };

    return (
        <div className="editstudentdetail">
            <h2 className='editstudheading'>Upload Post</h2>
            <div className='editstudform'>
                <label>Title:</label>
                <input
                    className='editstudinput'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='editstudform'>
                <label >Content:</label>
                <textarea
                    className='editstudinput'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button className='editstudbtn' onClick={handleUpload}>Upload Post</button>

            <div className="editstudheading">
                <DisplayPosts />
            </div>
        </div>
    );
};

export default UploadPost;

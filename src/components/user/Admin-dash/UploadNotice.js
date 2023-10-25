import React, { useState } from 'react';
import { storage, firestore } from '../../firebase'; // Import Firebase Storage and Firestore
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UploadNotice = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        setUploading(true);

        try {
            // Upload the file to Firebase Storage
            const storageRef = ref(storage, `Notices/${file.name}`);
            await uploadBytes(storageRef, file);

            // Get the download URL of the uploaded file
            const downloadURL = await getDownloadURL(storageRef);

            // Get the current date and time
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString();
            const formattedTime = currentDate.toLocaleTimeString();

            // Store notice details in Firestore
            const noticeData = {
                title,
                description,
                fileURL: downloadURL,
                uploadDate: formattedDate,
                uploadTime: formattedTime,
            };

            const noticesRef = collection(firestore, 'Notices');
            await addDoc(noticesRef, noticeData);

            alert('Notice uploaded successfully.');
            setTitle('');
            setDescription('');
            setFile(null);
            window.location.reload();
        } catch (error) {
            console.error('Error uploading notice:', error);
            alert('An error occurred while uploading the notice.');
        } finally {
            setUploading(false);
        }
    };


    return (
        <div className='editstudentdetail'>
            <h2 className='editstudheading'>Upload Notice</h2>
            <div className='editstudform'>
                <label className='editstudlable'>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
            </div>
            {/* <div>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
            </div> */}
            <div>
                <label className='editstudlable'>
                    Select File:
                    <input type="file" onChange={handleFileChange} />
                </label>
            </div>
            <div>
                <button className='editstudbtn' onClick={handleUpload} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </div>
    );
};

export default UploadNotice;

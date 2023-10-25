import React, { useState } from 'react';
import { storage } from '../../firebase'; // Import Firebase Storage
import { ref, uploadBytes } from 'firebase/storage';
import TimetableDisplay from '../TimetableDisplay';

const TimetableUpload = () => {
    const [timetableFile, setTimetableFile] = useState(null);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setTimetableFile(file);
    };

    // Handle form submission
    const handleUpload = async (e) => {
        e.preventDefault();

        if (timetableFile) {
            try {
                const storageRef = ref(storage, 'timetables'); // Set the storage reference
                const fileRef = ref(storageRef, timetableFile.name); // Create a reference to the file with its original name

                // Upload the file to Firebase Storage
                await uploadBytes(fileRef, timetableFile);

                alert('Timetable uploaded successfully!');
                window.location.reload();
            } catch (error) {
                console.error('Error uploading timetable:', error);
                alert('An error occurred while uploading the timetable. Please try again later.');
            }
        } else {
            alert('Please select a timetable file before uploading.');
        }
    };

    return (
        <div className="editstudentdetail">
            <h2 className='editstudheading'>Upload Timetable</h2>
            <form className='editstudform' onSubmit={handleUpload}>
                <input
                    className='editstudinput'
                    type="file"
                    accept=".pdf" // Set accepted file types if needed
                    onChange={handleFileChange}
                />
                <button className='editstudbtn' type="submit">Upload</button>
            </form>


            <div className="Showcase">
                <TimetableDisplay />
            </div>
        </div>
    );
};

export default TimetableUpload;

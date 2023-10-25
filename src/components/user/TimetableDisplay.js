import React, { useState, useEffect } from 'react';
import { storage } from '../firebase'; // Import Firebase Storage
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const TimetableDisplay = () => {
    const [timetables, setTimetables] = useState([]);

    useEffect(() => {
        const fetchTimetables = async () => {
            try {
                const storageRef = ref(storage, 'timetables'); // Set the storage reference to the "timetables" folder
                const fileItems = await listAll(storageRef);

                // Get download URLs for each timetable file
                const filePromises = fileItems.items.map(async (item) => {
                    const downloadURL = await getDownloadURL(item);
                    return {
                        name: item.name,
                        downloadURL,
                    };
                });

                const timetableFiles = await Promise.all(filePromises);
                setTimetables(timetableFiles);
            } catch (error) {
                console.error('Error fetching timetables:', error);
            }
        };

        fetchTimetables();
    }, []);

    return (
        <div className="editstudentdetail">
            <h2 className='editstudheading'>Timetables</h2>
            <ul className='editstudform'>
                {timetables.map((timetable, index) => (
                    <li key={index}>
                        <a href={timetable.downloadURL} target="_blank" rel="noopener noreferrer">
                            {timetable.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TimetableDisplay;

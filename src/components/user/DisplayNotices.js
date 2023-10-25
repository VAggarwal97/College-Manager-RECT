import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const NoticeBoard = () => {
    const [noticeFiles, setNoticeFiles] = useState([]);

    useEffect(() => {
        // Fetch notice files from Firebase Storage
        const fetchNoticeFiles = async () => {
            try {
                const storageRef = ref(storage, 'Notices'); // Updated to 'Notices'
                const fileItems = await listAll(storageRef);

                // Get download URLs for each file
                const filePromises = fileItems.items.map(async (item) => {
                    const downloadURL = await getDownloadURL(item);
                    return {
                        name: item.name,
                        downloadURL,
                    };
                });

                const files = await Promise.all(filePromises);
                setNoticeFiles(files);
            } catch (error) {
                console.error('Error fetching notice files:', error);
            }
        };

        fetchNoticeFiles();
    }, []);

    return (
        <div className="notice-board">
            <h3>Notice Board</h3>
            <ul className='noticelist'>
                {noticeFiles.map((notice, index) => (
                    <li className='notelist' key={index}>
                        <a className='noticelinks' href={notice.downloadURL} target="_blank" rel="noopener noreferrer">
                            {notice.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoticeBoard;



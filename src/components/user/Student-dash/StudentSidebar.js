import React, { useState } from 'react';
import clogo from '../../images/collegelogo.png';

import EditProfile from './EditProfile';
import StudentProfile from './StudentProfile';

function FacultySidebar({ changePage }) {
    const [activePage, setActivePage] = useState('Faculty');

    const handlePageChange = (page) => {
        setActivePage(page);
        changePage(page);
    };

    return (
        <div className="FacultySidebar">

            <div className="image">
                <img src={clogo} alt="College Logo" className="college-logo" />
            </div>

            <div className="student-profile">
                <StudentProfile />
            </div>

            <div className="EditProfile">
                <EditProfile />
            </div>

            <div className="btns">

                <button
                    id='btn'
                    className={activePage === 'SocialMedia' ? 'active' : ''}
                    onClick={() => handlePageChange('SocialMedia')}
                >
                    SocialMedia
                </button>

                <button
                    id='btn'
                    className={activePage === 'DisplayEvents' ? 'active' : ''}
                    onClick={() => handlePageChange('DisplayEvents')}
                >
                    DisplayEvents
                </button>

                <button
                    id='btn'
                    className={activePage === 'DisplayPosts' ? 'active' : ''}
                    onClick={() => handlePageChange('DisplayPosts')}
                >
                    DisplayPosts
                </button>

                <button
                    id='btn'
                    className={activePage === 'TimetableDisplay' ? 'active' : ''}
                    onClick={() => handlePageChange('TimetableDisplay')}
                >
                    TimetableDisplay
                </button>

                <button
                    id='btn'
                    className={activePage === 'Feedback' ? 'active' : ''}
                    onClick={() => handlePageChange('Feedback')}
                >
                    Feedback
                </button>




            </div>
        </div>
    );
}

export default FacultySidebar;

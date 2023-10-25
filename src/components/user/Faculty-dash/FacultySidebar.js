import React, { useState } from 'react';
import clogo from '../../images/collegelogo.png';

import FacultyProfile from './FacultyProfile';
import EditProfile from './EditProfile';

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
                <FacultyProfile />
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
                    className={activePage === 'AssignCourses' ? 'active' : ''}
                    onClick={() => handlePageChange('AssignCourses')}
                >
                    AssignCourses
                </button>

                <button
                    id='btn'
                    className={activePage === 'UploadGrade' ? 'active' : ''}
                    onClick={() => handlePageChange('UploadGrade')}
                >
                    UploadGrade
                </button>

                <button
                    id='btn'
                    className={activePage === 'TakeAttendance' ? 'active' : ''}
                    onClick={() => handlePageChange('TakeAttendance ')}
                >
                    TakeAttendance
                </button>




            </div>
        </div>
    );
}

export default FacultySidebar;

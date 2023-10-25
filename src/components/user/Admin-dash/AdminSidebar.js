import React, { useState } from 'react';
// import clogo from '../../images/collegelogo.png';
import AdminProfile from './AdminProfile';

import '../../Styles/AdminStyle.css';

function AdminSidebar({ changePage }) {
    const [activePage, setActivePage] = useState('students');

    const handlePageChange = (page) => {
        setActivePage(page);
        changePage(page);
    };

    return (
        <div className="AdminSidebar">

            <div className="Pagelogo">
                <p><a className='pagelogolink' href="/AdminDashboard">College Manager</a></p>
            </div>

            <div className="admin-profile">
                <AdminProfile />
            </div>

            <div className="Adminbtns">

                <button
                    id='btn'
                    className={activePage === 'calender' ? 'active' : ''}
                    onClick={() => handlePageChange('SocialMedia')}
                >
                    My Social Links
                </button>


                <div className="studentonly">
                    <span className='onlystudent'>- Student Details -</span>
                    <button
                        id='btn'
                        className={activePage === 'courses' ? 'active' : ''}
                        onClick={() => handlePageChange('EditStudentProfile')}
                    >
                        Edit Student Profile
                    </button>

                    <button
                        id='btn'
                        className={activePage === 'courses' ? 'active' : ''}
                        onClick={() => handlePageChange('AssignGroups')}
                    >
                        AssignGroups
                    </button>

                    <button
                        id='btn'
                        className={activePage === 'courses' ? 'active' : ''}
                        onClick={() => handlePageChange('AssignCourses')}
                    >
                        AssignCourses
                    </button>

                    <button
                        id='btn'
                        className={activePage === 'courses' ? 'active' : ''}
                        onClick={() => handlePageChange('UploadGrade')}
                    >
                        UploadGrade
                    </button>

                    <span className='onlystudent'>- Faculty Details -</span>

                    <button
                        id='btn'
                        className={activePage === 'courses' ? 'active' : ''}
                        onClick={() => handlePageChange('EditFacultyProfile')}
                    >
                        Edit Faculty Profile
                    </button>


                </div>


                <button
                    id='btn'
                    className={activePage === 'courses' ? 'active' : ''}
                    onClick={() => handlePageChange('UploadPost')}
                >
                    UploadPost
                </button>

                <button
                    id='btn'
                    className={activePage === 'courses' ? 'active' : ''}
                    onClick={() => handlePageChange('UploadEvent')}
                >
                    UploadEvent
                </button>

                <button
                    id='btn'
                    className={activePage === 'courses' ? 'active' : ''}
                    onClick={() => handlePageChange('TimetableUpload')}
                >
                    TimetableUpload
                </button>

                <button
                    id='btn'
                    className={activePage === 'courses' ? 'active' : ''}
                    onClick={() => handlePageChange('UploadNotice')}
                >
                    UploadNotice
                </button>



            </div>
        </div>
    );
}

export default AdminSidebar;

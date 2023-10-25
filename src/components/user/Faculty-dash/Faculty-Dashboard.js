import React, { useState } from 'react';
// import './FacultyStyles.css'
import '../../Styles/AdminStyle.css';
import Header from '../Header';
import FacultySidebar from '../Faculty-dash/FacultySidebar';
import Calendar from 'react-calendar';
import NoticeBoard from '../DisplayNotices';


import SocialMedia from '../Student-dash/SocialMedia';
import AssignCourses from '../Admin-dash/AssignCourses';
import UploadGrade from '../Admin-dash/UploadGrade';
import TakeAttendance from './TakeAttendance ';


function FacultyDashboard() {
    const [currentPage, setCurrentPage] = useState('');

    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="Admin-dashboard">

            <div className="header">
                <Header />
            </div>

            <div className="Admin-Sidebar">
                <FacultySidebar changePage={changePage} />
            </div>

            <main className="main-content">

                {currentPage === 'SocialMedia' && < SocialMedia />}
                {currentPage === 'AssignCourses' && < AssignCourses />}
                {currentPage === 'UploadGrade' && < UploadGrade />}
                {currentPage === 'TakeAttendance ' && < TakeAttendance />}

            </main>

            <div className="Rbar">

                <Calendar />
                <NoticeBoard />

            </div>


            {/* <div className="footer">
                hello
            </div>*/}

        </div >
    );
}

export default FacultyDashboard;

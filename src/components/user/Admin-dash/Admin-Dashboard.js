import React, { useState } from 'react';
import '../../Styles/AdminStyle.css';

import Header from '../Header';
import AdminSidebar from './AdminSidebar';
import EditStudentProfile from "./EditStudentDetails";

import AssignGroups from "./AssignGroups";
import AssignCourses from "./AssignCourses";
import UploadPost from "./UploadPost";
import UploadEvent from './UploadEvent';
import TimetableUpload from "./TimetableUpload";
import UploadNotice from "./UploadNotice";
import UploadGrade from "./UploadGrade";
import CountPage from "../countPage";

import SocialMedia from "../Student-dash/SocialMedia";
import Calendar from 'react-calendar';

import NoticeBoard from '../DisplayNotices';
import EditFacultyProfile from './EditFacultyDetails';
function AdminDashboard() {
    const [currentPage, setCurrentPage] = useState('CountPage');

    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="Admin-dashboard">

            <div className="header">
                <Header />
            </div>

            <div className="Admin-Sidebar">
                <AdminSidebar changePage={changePage} />
            </div>

            <main className="main-content">

                {currentPage === 'CountPage' && < CountPage />}

                {currentPage === 'SocialMedia' && < SocialMedia />}
                {currentPage === 'EditStudentProfile' && < EditStudentProfile />}
                {currentPage === 'EditFacultyProfile' && < EditFacultyProfile />}
                {currentPage === 'AssignGroups' && < AssignGroups />}
                {currentPage === 'AssignCourses' && < AssignCourses />}
                {currentPage === 'UploadPost' && < UploadPost />}
                {currentPage === 'UploadEvent' && < UploadEvent />}
                {currentPage === 'TimetableUpload' && < TimetableUpload />}
                {currentPage === 'UploadNotice' && < UploadNotice />}
                {currentPage === 'UploadGrade' && < UploadGrade />}


            </main>


            <div className="Rbar">

                <Calendar />
                <NoticeBoard />
            </div>


        </div >
    );
}

export default AdminDashboard;

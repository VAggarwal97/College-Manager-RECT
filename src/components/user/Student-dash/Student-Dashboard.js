import React, { useState } from 'react';
// import '../Styles.css'; // Import your stylesheet
import Header from '../Header';
import StudentSidebar from './StudentSidebar';
// import Footer from '../Footer';
// import { Link } from 'react-router-dom';
import NoticeBoard from '../DisplayNotices';
import Calendar from '../Calendar';

import SocialMedia from '../Student-dash/SocialMedia';
import DisplayEvents from '../DisplayEvents';
import DisplayPosts from '../DisplayPosts';
import TimetableDisplay from '../TimetableDisplay';
import Feedback from '../Feedback';

import '../../Styles/AdminStyle.css';

function StudentDashboard() {
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
        <StudentSidebar changePage={changePage} />
      </div>

      <main className="main-content">

        {currentPage === 'SocialMedia' && < SocialMedia />}
        {currentPage === 'DisplayEvents' && < DisplayEvents />}
        {currentPage === 'DisplayPosts' && < DisplayPosts />}
        {currentPage === 'TimetableDisplay' && < TimetableDisplay />}
        {currentPage === 'Feedback' && < Feedback />}

      </main>

      <div className="Rbar">
        <Calendar />
        <NoticeBoard />

      </div>


    </div >
  );
}

export default StudentDashboard;
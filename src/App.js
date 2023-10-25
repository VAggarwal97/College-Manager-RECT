// App.js

import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Signup';
import Login from './components/Login';
import Reset from './components/Reset';
import StudentSignUp from './components/user/StudentSignup';
import FacultySignUp from './components/user/FacultySignup';
import AdminSignUp from './components/user/AdminSignup';

import StudentDashboard from './components/user/Student-dash/Student-Dashboard';
import FacultyDashboard from './components/user/Faculty-dash/Faculty-Dashboard';
import AdminDashboard from './components/user/Admin-dash/Admin-Dashboard';

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Signup" element={<SignUp />} />
                <Route path="/Reset" element={<Reset />} />
                <Route path="/student-signup" element={<StudentSignUp />} />
                <Route path="/faculty-signup" element={<FacultySignUp />} />
                <Route path="/admin-signup" element={<AdminSignUp />} />


                <Route path="/StudentDashboard" element={<StudentDashboard />} />
                <Route path="/FacultyDashboard" element={<FacultyDashboard />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />

            </Routes>
        </Router>
    );
};

export default App;

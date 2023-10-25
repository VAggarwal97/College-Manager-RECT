import React, { useState } from 'react';
import { auth, firestore } from '../firebase'; // Import Firebase authentication and Firestore
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import '../Styles/Login-Signup.css';

import studentsignup from '../images/studentsignup.png';


const StudentSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  const handleStudentSignUp = async (e) => {
    e.preventDefault();

    try {
      // Check if the email is already registered
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // If the registration is successful, proceed to save user data to Firestore
      const userData = {
        email: email,
        role: 'Student',
        fullName: fullName,
        rollNumber: rollNumber,
      };

      await setDoc(doc(firestore, "users", email), userData);

      console.log('Student registered:', userCredential.user);

      // Redirect the user to the student dashboard
      window.location.href = '/StudentDashboard';
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.error('Email is already in use. Please use a different email address.');
      } else {
        console.error('Student registration failed:', error.message);
      }
    }
  };


  return (
    <div className="Signup-Container">
      <h2 className='signup-heading'>Student Registration</h2>
      <img className='signupimage' src={studentsignup} alt="" />
      <form className="Studentsignup-Register" onSubmit={handleStudentSignUp}>
        <input
          type="text"
          className="Studentinput"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          className="Studentinput"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
        />

        <input
          type="email"
          className="Studentinput"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="Studentinput"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="StudentBtn">
          Sign Up
        </button>
      </form>
      <Link className='backbtn' to='/SignUp'>back</Link>
    </div>
  );
};

export default StudentSignUp;

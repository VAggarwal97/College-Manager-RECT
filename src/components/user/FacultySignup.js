import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';


import '../Styles/Login-Signup.css';

import facultyimage from '../images/facultyimage.png';

const FacultySignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState(''); // Updated variable name

  const handleFacultySignup = async (e) => {
    e.preventDefault();

    try {
      // Check if the email is already registered
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // If the registration is successful, proceed to save user data to Firestore
      const userData = {
        email: email,
        role: 'Faculty',
        fullName: fullName,
        contact: contact, // Save the contact information
      };

      await setDoc(doc(firestore, "users", email), userData);

      console.log('Faculty registered:', userCredential.user);

      // Redirect the user to the faculty dashboard
      window.location.href = '/FacultyDashboard';
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.error('Email is already in use. Please use a different email address.');
      } else {
        console.error('Faculty registration failed:', error.message);
      }
    }
  };

  return (
    <div className="Signup-Container">
      <h2 className='signup-heading '>Faculty Signup</h2>
      <img className='signupimage' src={facultyimage} alt="" />
      <form className="Studentsignup-Register" onSubmit={handleFacultySignup}>
        <input
          type="text"
          className="Studentinput"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
          className="Studentinput"
          type="text" // Changed the input type to "text" for contact
          name="contact"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
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

export default FacultySignup;

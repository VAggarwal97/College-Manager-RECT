import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Login-Signup.css';

import signupimage from './images/signupimage.png';

// import signupImage from './images/simage.png'; // Import the image

const SignUp = () => {
    return (
        <>
            <div className="Signup-Container">

                <h2 className='signup-heading'>Signup</h2>

                <img className='signupimage' src={signupimage} alt="signupimage" />

                <p>---------- Chose Your Role ----------</p>

                <div className="signin-form">
                    <Link className='signupbutton' to="/student-signup">Student Signup</Link>
                    <Link className='signupbutton' to="/faculty-signup">Faculty Signup</Link>
                    <Link className='signupbutton' to="/admin-signup">Admin Signup</Link>
                </div>
                <Link className='backbtn' to="/">Back</Link>
            </div>
        </>
    );
};

export default SignUp;

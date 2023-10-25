// PasswordReset.js
import React, { useState } from 'react';
import { auth } from './firebase';

import resetimage from './images/resetimage.png';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Reset = () => {
    const [email, setEmail] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        try {
            await sendPasswordResetEmail(auth, email);
            setIsSuccess(true);
            setError(null);
        } catch (error) {
            setIsSuccess(false);
            setError(error.message);
        }
    };

    return (
        <div className='Reser-Container'>
            <h2 className='resetheading'>Password Reset</h2>
            <img className='resetimage' src={resetimage} alt="" />
            {isSuccess ? (
                <p className='resetline'>An email with instructions to reset your password has been sent to your email address.</p>
            ) : (
                <>
                    <form className='resetform' onSubmit={handlePasswordReset}>
                        <input className='resetinputs'
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className='resetbtn' type="submit">Reset Password</button>
                    </form>
                    {error && <p>{error}</p>}
                </>
            )}
            <Link className="backbtn" to="/">Back</Link>
        </div>
    );
};

export default Reset;

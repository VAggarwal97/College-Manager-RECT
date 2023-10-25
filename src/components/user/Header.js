import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import useCurrentUserRole from './useCurrentUserRole'; // Import the custom hook

import '../Styles/CommanStyle.css';
import SearchPage from './SearchPage';


const Header = () => {
  const [loggedOut, setLoggedOut] = useState(false); // State to track if the user is logged out
  const userRole = useCurrentUserRole(); // Fetch the current user's role using the custom hook

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setLoggedOut(true); // Set the loggedOut state to true after logout
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const [date, setDate] = useState(new Date());

  const updateTime = () => {
    setDate(new Date());
  };

  useEffect(() => {
    // Update the time every second (1000 milliseconds)
    const intervalId = setInterval(updateTime, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  // If the user is logged out, render a message and a login link
  if (loggedOut) {
    return (
      <div>
        {window.location.href = '/'}
      </div>
    );
  }

  return (
    <div className="Mheader">

      <p className='user-role'>{userRole || 'Loading...'}  Dashboard </p>
        <SearchPage/>
      <div>

      </div>

      <div className="clock">
        Current Time:
        <span className='timecount'> {date.toLocaleTimeString()}</span>
      </div>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Header;
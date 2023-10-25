// src/components/Login.js
import React, { useState } from "react";
import { auth, firestore } from "./firebase";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import './Styles/Login-Signup.css';

import loginimage from './images/loginimage.png';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user's role from Firestore based on their UID
      const userUid = userCredential.user.email;
      const userDoc = await getUserDoc(userUid);
      const userRole = userDoc.data().role;

      // Redirect users based on their roles
      if (userRole === "Student") {
        window.location.href = "/StudentDashboard";
      } else if (userRole === "Faculty") {
        window.location.href = "/FacultyDashboard";
      } else if (userRole === "Admin") {
        window.location.href = "/AdminDashboard";
      } else {
        setError("Invalid role");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const getUserDoc = async (email) => {
    const userDocRef = doc(collection(firestore, "users"), email);
    const userDocSnapshot = await getDoc(userDocRef);
    return userDocSnapshot;
  };

  return (
    <>
      <div className="mainheading">
        <p className="chalkpad">Chalkpad</p>
        <p className="mainhead">College Management System In Mern</p>
      </div>
      <div className="Login-Container">
        <img className="loginimage" src={loginimage} alt="imagehere" />
        <h2 className="loginheading">Login</h2>
        <div className="inploginfeilds">
          <input className="logininput"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input className="logininput"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="loginbtn" onClick={handleLogin}>Login</button>

        <div className="addons">

          {error && <p className="error">{error}</p>}

          <Link className="backbtn" to="/SignUp">Sign Up</Link>
          <Link className="backbtn" to="/Reset">Reset Password</Link>
        </div>

      </div>
      <div className="mainheading">
        <p className="mainhead">Made By : Vishal Aggarwal ( individual Project Development)</p>
        <p><a className="mylinks" href="https://github.com/VAggarwal97"> GitHub: vishal_aggarwal97</a></p>
      </div>
    </>
  );
}

export default Login;

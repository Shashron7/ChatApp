import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { app, getAuth, signOut } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from 'react-router-dom';
import "./Navbar.css";

export default function Navbar() {
  const { userPhotoURL,setUserPhotoURL } = useUser();  //using the context API custom hook
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const [logged,setLogged]=useState('Login');

  const navigate=useNavigate();
  
  
  useEffect(()=>{
    if(user) //if there is a user present then logout
    {
      setLogged('Logout');
    }
    else
    {
      setLogged('Login');
      setUserPhotoURL(null); //removing the picture
    } //if user is present then login
  })

  const handleSignOut=()=>
  {
    signOut(auth).then(()=>{
      navigate('./');
    }).catch((error) => {
      console.log("An error happened while signing out");
});
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://cryptologos.cc/logos/chatcoin-chat-logo.png"
              alt="Logo"
              width=""
              height="60"
              class="d-inline-block align-text-top"
            />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  ChatApp
                </a>
              </li>
            </ul>
          </div>
          <button type="button" className="btn btn-light" onClick={handleSignOut}>
            {logged}
          </button>
          {userPhotoURL && <img src={userPhotoURL} className="pfp"></img>}
        </div>
      </nav>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { app, getAuth } from './Firebase'
import load from './3-dots-bounce.svg';
import './Signedin.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useUser } from "./UserContext";



//this component basically welcomes the signed in user
const auth = getAuth(app);




export default function Signedin() {
  
  const {setUserPhotoURL}=useUser();
  
  const [user, loading, error] = useAuthState(auth);
  const [userName, setUserName] = useState(""); // Using state to hold the username

  useEffect(() => {
    if (user) {
      setUserName(user.displayName); // Set the username when user is defined
      setUserPhotoURL(user.photoURL);
    }
  }, [user]);

  const navigate=useNavigate();

  const Nav=()=>{
    navigate('/chat');
  }


  return (
    <div className="whole">
     {loading ? <img src={load}></img> : (<div>
      <motion.h2
        initial={{ y: 300, fontSize: "50px", opacity: 0 }}
        animate={{ y: 50, fontSize: "50px", opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1}}
      >
        You are signed in
      </motion.h2>
      <motion.h2
        initial={{ y: 300, fontSize: "50px", opacity: 0 }} // Initial state with opacity set to 0
        animate={{ y: 100, fontSize: "50px", opacity: 1 }} // Animation state with opacity set to 1
        transition={{ ease: "easeOut", duration: 1, delay: 1 }} // Delay of 1 seconds
      >
        Welcome {userName}!
        
      </motion.h2>
      <motion.button
        type="button"
        class="btn btn-primary btn-lg custom-but"
        style={{ width: "400px" , height: 'auto'}}
        initial={{ y: 0, fontSize: "20px", opacity: 0 }} // Initial state with opacity set to 0
        animate={{ y: 300, fontSize: "20px", opacity: 1 }} // Animation state with opacity set to 1
        transition={{ ease: "easeOut", duration: 1, delay: 2 }} // Delay of 2 seconds
        onClick={()=>{Nav();}} //navigate to the chatroom
      >
       Open the chats now!
       <i className="fa-solid fa-comment" style={{marginLeft: '40px', fontSize: '30px'}}></i>
      </motion.button>
    </div>)}
    </div>
  );
}

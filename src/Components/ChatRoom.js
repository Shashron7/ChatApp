  import React from "react";
  import "./ChatRoom.css";
  import { useState } from "react";
  import { motion } from "framer-motion";
  import {app, getAuth} from './Firebase';
  import {getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore';

  const db = getFirestore(app);  // Initialize Cloud Firestore and get a reference to the service
  const auth=getAuth(app);
  export default function ChatRoom() {
    
    const [text, setText]=useState(true);  //state to disable the button if there is nothing written
    const [message, setMessage]=useState(""); //this state is to set the message
    const sendFunc = async (event) => {
      event.preventDefault();
      const { uid, displayName, photoURL } = auth.currentUser;
    
      try {
        console.log('Adding a new document...', displayName);
        await addDoc(collection(db, "messages"), {             //this function adds a document in the database with the following key pair values
          text: message,
          name: displayName,
          avatar: photoURL,
          createdAt: serverTimestamp(),
          uid,
        });
        console.log('Document successfully added!');  //after the promise resolves successfully
        setMessage(""); // Reset message state after successful addition
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
    
    return (
      <>
        <div className="chatroom-container">
          <motion.h3
            initial={{ y: 300, fontSize: "100px", opacity: 1 }} // Initial state with opacity set to 1 and large font size
            animate={{ y: 10, fontSize: "40px", opacity: 0 }} // Animation state with opacity set to 1 and smaller font size
            transition={{ ease: "easeOut", duration: 2, delay: 1 }} // Delay of 2 seconds and transition duration of 4 seconds
          >
            This is the ChatRoom
          </motion.h3> 
        </div>
        <div className="footer-chat">
          <div className="mb-3 container">
            <div class="d-flex justify-content-center">
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e)=>{
                  if (e.target.value.length > 0) {
                    setText(false);
                    setMessage(e.target.value); //setting the message state here
                  } else {
                    setText(true);
                  }
                }}
              />
              <button   
                type="button"
                className="btn btn-light"
                style={{ marginLeft: "20px" }}
                disabled={text}
                onClick={(event)=>sendFunc(event)}
              >
                <i className="fa-regular fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

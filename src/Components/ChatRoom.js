import React, { useEffect, useRef } from "react";
import "./ChatRoom.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { app, getAuth } from "./Firebase";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import Message from "./Message";
const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service
const auth = getAuth(app);
export default function ChatRoom() {
  const [text, setText] = useState(true); //state to disable the button if there is nothing written
  const [message, setMessage] = useState(""); //this state is to set the message
  const [messages, setMessages] = useState([]); //array of messages
  const inputRef = useRef(null); //reference to input field
  const chatroomRef = useRef(null); //for the chatroom for scrolling purposes
  const buttonRef = useRef(null);

  useEffect(() => {
    const messagesRef = collection(db, "messages"); //taking a reference to the messages database

    const q = query(messagesRef, orderBy("createdAt"), limit(100)); //querying the first 50 messages

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //querysnapshot, means the current documents get are stored
      const updatedMessages = []; //we have an empty array that we will populate
      querySnapshot.forEach((doc) => {
        updatedMessages.push(doc.data());
      });
      setMessages(updatedMessages); //update the state
      chatroomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
    return () => unsubscribe(); //we run this function everytime there is a render
  }, []);

  const sendFunc = async (event) => {
    event.preventDefault(); //preventing any default action of the submit button
    const { uid, displayName, photoURL } = auth.currentUser; //getting the current user details and we know someone is definitely signed in

    try {
      console.log("Adding a new document...", displayName);
      await addDoc(collection(db, "messages"), {
        //this function adds a document in the database with the following key pair values
        text: message,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
      console.log("Document successfully added!"); //after the promise resolves successfully
      setMessage(""); // Reset message state after successful addition
      inputRef.current.value = "";
      setText(true); //disable the button
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="chatroom-wrapper">
      <div className="chatroom-container" ref={chatroomRef}>
        <motion.h3
          initial={{ y: 300, fontSize: "100px", opacity: 1 }} // Initial state with opacity set to 1 and large font size
          animate={{ y: 10, fontSize: "40px", opacity: 0 }} // Animation state with opacity set to 1 and smaller font size
          transition={{ ease: "easeOut", duration: 2, delay: 3 }} // Delay of 2 seconds and transition duration of 4 seconds
        >
          This is the ChatRoom
        </motion.h3>
        {messages.map((message, index) => (
          <Message
            key={index}
            curr_uid={message.uid}
            name={message.name}
            url_pic={message.avatar}
            text={message.text}
          />
        ))}
      </div>
      <div className="footer-chat">
        <div className="mb-3 container">
          <div class="d-flex justify-content-center">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  setText(false); //text boolean decides if we have disabled the button or not
                  setMessage(e.target.value); //setting the message state here
                } else {
                  setText(true);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.length > 0) {
                  sendFunc(e);
                  inputRef.current.value = ""; //reset the input text to nothing
                  setText(true); //disabling the button
                }
              }}
              ref={inputRef}
            />
            <button
              type="button"
              className="btn btn-light"
              style={{ marginLeft: "20px" }}
              disabled={text}
              onClick={(event) => sendFunc(event)}
              ref={buttonRef}
            >
              <i className="fa-regular fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

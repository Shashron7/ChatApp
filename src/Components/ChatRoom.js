import React from "react";
import "./ChatRoom.css";
import { motion } from "framer-motion";
export default function ChatRoom() {
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
            />
            <button
              type="button"
              className="btn btn-light"
              style={{ marginLeft: "20px" }}
            >
              <i className="fa-regular fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

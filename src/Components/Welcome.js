import React, { useEffect, useState } from "react";
import UseTypingEffect from "./UseTypingEffect";
import "./Welcome.css";

import { useNavigate } from "react-router-dom";
import {
  app,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  getAuth,
  getAdditionalUserInfo,
} from "./Firebase"; //importing from Firebase.js
import { motion } from "framer-motion";

import load from "./3-dots-bounce.svg";
import pic from "./anim.gif";
const googleAuthProvider = new GoogleAuthProvider();

const texts = [
  //typewriter text animation
  "Hello there!",
  "Welcome to ChatApp!",
  "This is a chat application ",
  "Enjoy chatting!",
];

const auth = getAuth(app); //auth is the authorization object

export default function Welcome() {
  const [textIndex, setTextIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const textToShow = UseTypingEffect(texts[textIndex], 50, true);
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleAuthProvider); //Doesnt return anything, the results and errors are handled by getRedirectResult
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //this is for the typewriter animation.
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) =>
        prevIndex >= texts.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  //seeing if there is already a user signed in or not

  const debugRedirectResult = async () => {
    try {
      setLoading(true);
      const result = await getRedirectResult(auth);
      if (result && result.user) {
        const details = getAdditionalUserInfo(result);
        console.log(details);
        console.log("User logged in:", result.user.displayName);
        let name_user = result.user.displayName;
        navigate("/in"); //navigating to the signedinpage and passing the name
      } else {
        console.log("No user logged in");
      }
    } catch (error) {
      console.log("Error retrieving redirect result:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    //after rendering we are checking if any user is logged in or not
    debugRedirectResult();
  }, []);

  return (
    <div className="whole">
      <div className="container-welcome">
      
        {loading ? (
          <img src={load} style={{ height: "100px" }} />
        ) : (
        <>
          <div className="texts">
        <motion.h1
          style={{ fontFamily: "Reddit Mono" }}
          initial={{ y: 300, fontSize: "50px", opacity: 0 }}
          animate={{ y: 50, fontSize: "50px", opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          {textToShow}
        </motion.h1>
      </div>
          <div className="login" style={{ fontFamily: "Reddit Mono" }}>
            <div>
              <motion.h3
                style={{ marginBottom: "60px" }}
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 50, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 1, delay: 2 }}
              >
                Get started chatting....
              </motion.h3>
              <div className="d-flex flex-column mb-3 button_pic">
                <img
                  src={pic}
                  style={{
                    height: "100 px",
                    width: "200 px",
                    marginTop: "50px",
                  }}
                  className="p-2 img-chat"
                />
                <motion.button
                  type="button"
                  className="btn btn-primary btn-lg custom-but p-2"
                  style={{ width: "500px" }}
                  onClick={handleSignInWithGoogle}
                  initial={{ y: 300, fontSize: "10px", opacity: 0 }}
                  animate={{ y: 50, fontSize: "30px", opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 1, delay: 2 }}
                >
                  Login with Google
                  <i
                    class="fa-brands fa-google"
                    style={{ marginLeft: "20px" }}
                  ></i>
                </motion.button>
              </div>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

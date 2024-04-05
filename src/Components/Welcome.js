import React, { useEffect, useState } from "react";
import UseTypingEffect from "./UseTypingEffect";
import './Welcome.css';
// import { initializeApp } from "firebase/app";
// import { signInWithRedirect, getRedirectResult, GoogleAuthProvider, getAuth, getAdditionalUserInfo} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {app, signInWithRedirect, getRedirectResult, GoogleAuthProvider, getAuth, getAdditionalUserInfo } from './Firebase'   //importing from Firebase.js


import load from './Infinity@1.25x-0.9s-200px-200px.gif';
const googleAuthProvider= new GoogleAuthProvider();


const texts = [                         //typewriter text animation
  "Hello there!",
  "Welcome to ChatApp!",
  "This is a chat application ",
  "Enjoy chatting!",
];
// const firebaseConfig = {       //fire base configuration details
//   apiKey: "AIzaSyDoPTIIOtOhE8K_uwBAuoJ02Vqk52EGVIg",
//   authDomain: "chatapp-7b93e.firebaseapp.com",
//   projectId: "chatapp-7b93e",
//   storageBucket: "chatapp-7b93e.appspot.com",
//   messagingSenderId: "446573562903",
//   appId: "1:446573562903:web:8d5c89a9f007113bb8e052",
//   measurementId: "G-PG2XKKQ02K"
// };

// const app = initializeApp(firebaseConfig); //app object

const auth=getAuth(app);  //auth is the authorization object



export default function Welcome() {
  const [textIndex, setTextIndex] = useState(0);
  const [loading, setLoading]=useState(false);
  const textToShow = UseTypingEffect(texts[textIndex], 50, true); 
  const navigate= useNavigate();

  const handleSignInWithGoogle = async() => {
    try {
      
      await signInWithRedirect(auth, googleAuthProvider);   //Doesnt return anything, the results and errors are handled by getRedirectResult
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {       //this is for the typewriter animation.
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
        let name_user=result.user.displayName;
        navigate(`/in?username=${name_user}`);  //navigating to the signedinpage and passing the name
      } else {
        console.log("No user logged in");
      }
    } catch (error) {
      console.log("Error retrieving redirect result:", error);
    } finally{
      setLoading(false);
    }
  };
  useEffect(() => {       //after rendering we are checking if any user is logged in or not
  debugRedirectResult();
  }, []);
  


  return (
    <div style={{ marginTop: "200px", minHeight: "1000px" }}>
      <div className="container">
        {loading ? <img src={load}/> : (<div
          className="login"
          style={{ marginTop: "100px", fontFamily: "Reddit Mono" }}
        >
          <div className="d-flex flex-column mb-3 ">
            <h3 style={{ marginBottom: "60px" }}>Get started chatting....</h3>
            <div class="text-center">
              <button
                type="button"
                class="btn btn-primary btn-lg custom-but"
                style={{width: "500px"}}
                onClick={handleSignInWithGoogle}
              >
                Login with Google
                <i class="fa-brands fa-google" style={{marginLeft: "20px"}}></i>
              </button>
            

            <img
              src="https://img.freepik.com/free-vector/hand-drawn-flat-people-talking_23-2149051163.jpg"
              style={{ height: "auto", width: "900px" , marginTop: '50px'}}
            />
            </div>
          </div>
          <h1 style={{ fontFamily: "Reddit Mono", marginTop: "100px" }}>
        {textToShow}
      </h1>
        </div>
        )}
      </div>
      
    </div>
  );
}

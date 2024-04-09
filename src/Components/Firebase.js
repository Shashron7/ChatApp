import { initializeApp } from "firebase/app";
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider, getAuth, getAdditionalUserInfo, signOut } from "firebase/auth";



const firebaseConfig = {       //fire base configuration details
    apiKey: "AIzaSyDoPTIIOtOhE8K_uwBAuoJ02Vqk52EGVIg",
    authDomain: "chatapp-7b93e.firebaseapp.com",
    projectId: "chatapp-7b93e",
    storageBucket: "chatapp-7b93e.appspot.com",
    messagingSenderId: "446573562903",
    appId: "1:446573562903:web:8d5c89a9f007113bb8e052",
    measurementId: "G-PG2XKKQ02K"
  };


  const app = initializeApp(firebaseConfig);


  export { app, signInWithRedirect, getRedirectResult, GoogleAuthProvider, getAuth, getAdditionalUserInfo, signOut };
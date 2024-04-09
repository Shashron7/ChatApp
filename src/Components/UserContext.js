// UserContext.js

//this is a context API so that other components can affect the PhotoURL of the Navbar

//this is done so that the signed in page can affect the image URL of the logged in user.
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => { //UserProvider serves as serves as the provider for the context. Children means anything within can access the context
  const [userPhotoURL, setUserPhotoURL] = useState(null); // State to hold the user's photo URL

  return (
    <UserContext.Provider value={{ userPhotoURL, setUserPhotoURL }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);  //Custom hook to consume the context

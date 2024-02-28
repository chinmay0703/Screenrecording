import React, { useState } from "react";
import SigninContext from "./SigninContext.js";

const SigninProvider = ({ children }) => {

  const [isLoggedin, setisLoggedin] = useState(false);

  const signIn = () => {
    setisLoggedin(true);
  };

  const signOut = () => {
    setisLoggedin(false);
  };

  return (
    <SigninContext.Provider value={{ isLoggedin, signIn, signOut }}>
      {children}
    </SigninContext.Provider>
  );
};

export default SigninProvider;

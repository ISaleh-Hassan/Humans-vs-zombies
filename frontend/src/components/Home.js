import React from "react";
import firebaseConfig from "../utils/firebase";
import { clearUser } from "../utils/localstorage.js";

const Home = () => {

  const handleSignOut = () => {
    firebaseConfig.auth().signOut() 
    clearUser();
  }

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
};

export default Home;
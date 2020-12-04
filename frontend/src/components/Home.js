import React from "react";
import firebaseConfig from "../utils/firebase";
import { clearUser } from "../utils/localstorage.js";

const Home = () => {

  const user = firebaseConfig.auth().currentUser.email;
  const isVerified = firebaseConfig.auth().currentUser.emailVerified;

  console.log(firebaseConfig.auth().currentUser.emailVerified)

  const handleSignOut = () => {
    firebaseConfig.auth().signOut()
    clearUser();
  }

  return (
    <>
      <h1>Home</h1>
      <p>Welcome, { user }</p>
      <p>Verified: { isVerified ? <span>true</span> : <span>false</span>}</p>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
};

export default Home;
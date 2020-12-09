import React from "react";
import { Link } from "react-router-dom";
import firebaseConfig from "../utils/firebase";
import { clearUser } from "../utils/localstorage.js";
import './Stylings/Components.css';
import Header from './Stylings/Header';

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
      <Header />
      <section className="home">
        <div className="container">
          <h1>Home</h1>
          <p>Welcome, {user}</p>
          <p>Verified: {isVerified ? <span>true</span> : <span>false</span>}</p>
          <button onClick={handleSignOut}>Sign out</button>
          <Link to="/currentgames">Current Games</Link>
        </div>
        <div>
          <p>{}</p>
        </div>
      </section>
    </>
  );
};

export default Home;
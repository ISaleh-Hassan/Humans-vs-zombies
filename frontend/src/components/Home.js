import React from "react";
import { Link } from "react-router-dom";
import firebase from "../utils/firebase";
import { clearUser } from "../utils/localstorage.js";
import './Stylings/Components.css';
import Header from './Stylings/Header';
import NavBar from "./Stylings/NavBar";

const Home = () => {

  const user = firebase.auth().currentUser.email;
  const isVerified = firebase.auth().currentUser.emailVerified;

  console.log(firebase.auth().currentUser.emailVerified)

  const handleSignOut = () => {
    firebase.auth().signOut()
    clearUser();
  }

  return (
    <>
      <Header />
      <NavBar />
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
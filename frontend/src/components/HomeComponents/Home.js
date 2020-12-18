import React from "react";
import { Link } from "react-router-dom";
import firebase from "../../utils/firebase";
import { getUser } from "../../utils/localstorage.js";
import Header from '../StylingComponents/Header';
import NavBar from "../StylingComponents/NavBar";

const Home = () => {

  const user = getUser();
  const isVerified = firebase.auth().currentUser.emailVerified;

  return (
    <>
      <Header />
      <NavBar />
      <section className="home">
        <div className="container">
          <h1>Home</h1>
          <p>Welcome, {user}</p>
          <p>{isVerified
            ? <span><Link to="/registerphone">You may now register your phone!</Link></span>
            : <span>A verification link has been sent to your email. Please verify your email to register your phone.</span>
          }</p>
        </div>
        <div>
          <p>{ }</p>
        </div>
      </section>
    </>
  );
};

export default Home;
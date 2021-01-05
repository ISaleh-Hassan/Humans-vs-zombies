import React from "react";
import { Link } from "react-router-dom";
import firebase from "../../utils/firebase";
import { getUser } from "../../utils/localstorage.js";
import { Button } from 'react-bootstrap';
import HeaderOutside from "../StylingComponents/HeaderOutside";
import { clearUser } from "../../utils/localstorage";

const Home = (props) => {

  const user = getUser();
  const isVerified = firebase.auth().currentUser.emailVerified;

  const handleSignOut = () => {
    firebase.auth().signOut()
    clearUser();
  }


  // The usertype should be determined by calling the database, not by using local storage as that can be edited.
  // This should be updated ASAP.
  const userType = localStorage.getItem('Usertype');

  function handleAdminAccess() {
    if (userType === 'ADMINISTRATOR') {
        props.history.push('/admin')
    } else {
        alert('You do not have access to the admin menu')
    }
  }



  return (
    <>
      <section className="home">
        <div className="container">
          <HeaderOutside />
          <h1>Home</h1>
          <p>Welcome, {user}</p>
          <p>{isVerified
            ? <span><Link to="/registerphone">You may now register your phone!</Link></span>
            : <span>A verification link has been sent to your email. Please verify your email to register your phone.</span>
          }</p>
          <Button variant="dark" onClick={()=> props.history.push("/currentgames") }>Browse Games</Button>
          <br/>
          <Button variant="dark" onClick={handleAdminAccess}>ADMIN</Button>
          <br/>
          <Button variant="dark" onClick={handleSignOut}>Sign out</Button>
        </div>
        <div>
          <p>{ }</p>
        </div>
      </section>
    </>
  );
};

export default Home;
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../../utils/firebase";
import { getUser } from "../../utils/localstorage.js";
import { Button } from 'react-bootstrap';
import HeaderOutside from "../StylingComponents/HeaderOutside";
import { clearUser } from "../../utils/localstorage";
import { fetchUser } from "../../utils/dbstorage";

const Home = (props) => {

  const user = getUser();
  const isVerified = firebase.auth().currentUser.emailVerified;
  const userPhone = firebase.auth().currentUser.phoneNumber;
  const userId = localStorage.getItem("User ID")
  const usersPhone = localStorage.getItem("User Phone")

  // useEffect(() => {
  //   fetchUserID();
  // }, [])

  // async function fetchUserID() {
  //   await fetchUser(userId).then(result => {
  //     localStorage.setItem("User Phone", result.phoneNumber)
  //   })
  // }

  const handleSignOut = () => {
    firebase.auth().signOut()
    clearUser();
  }


  // The usertype should be determined by calling the database, not by using local storage as that can be edited.
  // This should be updated ASAP.
  const userType = localStorage.getItem('Usertype');

  function handleAdminAccess() {
    if (userType === 'Admin') {
      props.history.push('/admin')
    } else {
      alert('You do not have access to the admin menu')
    }
  }

  if (!isVerified && userPhone === null) {
    return (
      <>
        <section className="home">
          <div className="container">
            <HeaderOutside />
            <h1>Home</h1>
            <p>Welcome, {user}</p>
            <p>A verification link has been sent to your email. Please verify your email to register your phone.</p>
            <Button variant="dark" onClick={() => props.history.push("/currentgames")}>Browse Games</Button>
            <br />
            <Button variant="dark" onClick={handleAdminAccess}>ADMIN</Button>
            <br />
            <Button variant="dark" onClick={handleSignOut}>Sign out</Button>
          </div>
        </section>
      </>
    );
  } else if (isVerified && !usersPhone) {
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }
      else
        localStorage.removeItem('firstLoad');
    }
    return (
      <>
        <section className="home">
          <div className="container">
            <HeaderOutside />
            <h1>Home</h1>
            <p>Welcome, {user}</p>
            <p><Link to="/registerphone">You may now register your phone!</Link></p>
            <Button variant="dark" onClick={() => props.history.push("/currentgames")}>Browse Games</Button>
            <br />
            <Button variant="dark" onClick={handleAdminAccess}>ADMIN</Button>
            <br />
            <Button variant="dark" onClick={handleSignOut}>Sign out</Button>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section className="home">
          <div className="container">
            <HeaderOutside />
            <h1>Home</h1>
            <p>Welcome, {user}</p>
            <Button variant="dark" onClick={() => props.history.push("/currentgames")}>Browse Games</Button>
            <br />
            <Button variant="dark" onClick={handleAdminAccess}>ADMIN</Button>
            <br />
            <Button variant="dark" onClick={handleSignOut}>Sign out</Button>
          </div>
        </section>
      </>
    );
  }
};

export default Home;
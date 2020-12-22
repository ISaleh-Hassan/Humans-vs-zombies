import React from "react";
import { Link } from "react-router-dom";
import Header from "../StylingComponents/Header";
import NavBar from "../StylingComponents/NavBar";

const Admin = () => {

  return (
    <>
      <Header />
      <section className="home">
        <div className="container">
          <h1>Admin</h1>
          <Link to="/create/game">Create Game</Link>
          <Link to="/edit/game">Edit Game</Link>
          <Link to="#">Edit Player State</Link>
          <Link to="#">Create Mission Marker</Link>
          <Link to="#">Edit Mission Marker</Link>
        </div>
      </section>
    </>
  );
};

export default Admin;
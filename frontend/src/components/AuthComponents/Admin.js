import React from "react";
import { Link } from "react-router-dom";
import Header from "../Stylings/Header";
import NavBar from "../Stylings/NavBar";

const Admin = () => {

  return (
    <>
      <Header />
      <NavBar />
      <section className="home">
        <div className="container">
          <h1>Admin</h1>
          <Link to="#">Create Game</Link>
          <Link to="#">Edit Game</Link>
          <Link to="#">Edit Player State</Link>
          <Link to="#">Create Mission Marker</Link>
          <Link to="#">Edit Mission Marker</Link>
        </div>
      </section>
    </>
  );
};

export default Admin;
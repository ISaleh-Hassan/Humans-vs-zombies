import React from "react";
import { Link } from "react-router-dom";
import GameMenu from "../StylingComponents/GameMenu";
import Header from "../StylingComponents/Header";
import NavBar from "../StylingComponents/NavBar";

const Admin = () => {

  return (
    <>
      <section className="home">
        <div className="container">
          <Header />
          <GameMenu />
          <h1>Admin</h1>
          <Link to="/creategame">Create Game</Link>
          <Link to="/editgame">Edit Game</Link>
          <Link to="#">Edit Player State</Link>
          <Link to="/create/missionmarker">Create Mission Marker</Link>
          <Link to="#">Edit Mission Marker</Link>
        </div>
      </section>
    </>
  );
};

export default Admin;
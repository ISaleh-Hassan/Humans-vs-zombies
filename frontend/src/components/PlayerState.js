import React from "react";
import { Link } from "react-router-dom";
import Header from './Stylings/Header';

const PlayerState = () => {

  return (
    <>
      <Header />
      <section className="home">
        <div className="container">
          <h1>Edit Player State</h1>
          <Link to="#">Player Username/ID</Link>
          <Link to="#">Faction (human/zombie)</Link>
          <Link to="#">Alive/Dead (if human)</Link>
          <Link to="#">Add/Remove Squad</Link>
          <Link to="#">Remove from Game</Link>
          <button>Update</button><button>Cancel</button>
        </div>
      </section>
    </>
  );
};

export default PlayerState;
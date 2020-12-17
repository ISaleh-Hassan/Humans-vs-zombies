import React from "react";
import { Link } from "react-router-dom";
import Header from './Stylings/Header';

const Game = () => {

  return (
    <>
      <Header />
      <section className="home">
        <div className="container">
          <h1>Create Game / Edit Game</h1>
          <Link to="#">Game Name</Link>
          <Link to="#">Game Description</Link>
          <Link to="#">Start Date and Time</Link>
          <Link to="#">Start Date and Time</Link>
          <Link to="#">Maximum Players</Link>
          <button>Create</button><button>Edit</button>
        </div>
      </section>
    </>
  );
};

export default Game;
import React from "react";
import { Link } from "react-router-dom";
import Header from './Stylings/Header';

const MissionMarker = () => {

  return (
    <>
      <Header />
      <section className="home">
        <div className="container">
          <h1>Create/Edit Mission Marker</h1>
          <Link to="#">Mission Name</Link>
          <Link to="#">Mission Description</Link>
          <Link to="#">Coordinates</Link>
          <Link to="#">Mission/Marker Type</Link>
          <Link to="#">Start Time</Link>
          <Link to="#">End Time</Link>
          <button>Create</button><button>Cancel</button>
          <button>Update</button><button>Cancel</button>
          <button>Delete</button>
        </div>
        <h1>Map Widget here</h1>
      </section>
    </>
  );
};

export default MissionMarker;
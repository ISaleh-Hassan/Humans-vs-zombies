import React from "react";
import Header from "./Header";

const NotFound = (props) => {

  return (
    <>
    <div>
        <Header />
      <h1>{props.header}</h1>
      <p>{props.message}</p>

      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
    </>
  );
};

export default NotFound;
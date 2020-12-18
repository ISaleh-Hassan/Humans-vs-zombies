import React from "react";

const NotFound = (props) => {

  return (
    <>
    <div>
      <h1>{props.header}</h1>
      <p>{props.message}</p>

      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
    </>
  );
};

export default NotFound;
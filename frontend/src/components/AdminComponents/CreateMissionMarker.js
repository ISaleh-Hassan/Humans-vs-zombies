import { TextField } from "@material-ui/core";
import { Form, Button } from 'react-bootstrap';
import React from "react";
import Header from '../StylingComponents/Header';
import NavBar from "../StylingComponents/NavBar";

const CreateMissionMarker = () => {

  return (
    <>
      <Header />
      <NavBar />
      <section className="home">
        <div className="container">
          <h1>Create Mission Marker</h1>
          <Form.Group>
            <Form.Control type="text" placeholder="Mission Name" />
            <br />
            <Form.Control type="text" placeholder="Mission Description" />
            <br />
            <Form.Control type="text" placeholder="Coordinates" />
            <br />
            <TextField
              id="datetime-local"
              label="Start time"
              type="datetime-local"
              defaultValue="2021-01-01T08:00"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br /><br />
            <TextField
              id="datetime-local"
              label="End time"
              type="datetime-local"
              defaultValue="2021-01-02T08:00"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br /><br />
          <button>Create</button><button>Cancel</button>
          </Form.Group>
        </div>
        <h1>Map Widget here</h1>
      </section>
    </>
  );
};

export default CreateMissionMarker;
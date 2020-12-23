import { TextField } from "@material-ui/core";
import { Form, Button } from 'react-bootstrap';
import React, { useState } from "react";
import Header from '../StylingComponents/Header';
import NavBar from "../StylingComponents/NavBar";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { CreateMission } from '../../utils/markerStorage'
import MainMap from "../MapComponents/MainMap";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const EditMissionMarker = (props) => {

  const [validMissionName, setValidMissionName] = useState(false);
  const [missionObject, setMissionObject] = useState(
    {
      name: "",
      startTime: "2021-01-01T08:00:00.000+00:00",
      endTime: "2021-01-02T08:00:00.000+00:00"
    })
  let markerLng = localStorage.getItem('Marker Lng: ')
  let markerLat = localStorage.getItem('Marker Lat: ')


  async function editMission() {
    if (validMissionName === true) {
      let createMissionResponse = await CreateMission(missionObject);
      if (createMissionResponse.status === 201) {
        props.history.push("/missions");
      } else if (createMissionResponse.status === 400) {
        alert("Mission name must be unique!");
      } else {
        alert("Something went wrong while creating the mission.");
      }
    }
  }

  const onMissionNameChange = ev => {
    let currentMissionName = ev.target.value;
    if (currentMissionName.length < 4) {
      setValidMissionName(false);
    }
    else {
      setMissionObject((prevState) => ({
        ...prevState,
        name: currentMissionName
      }));
      setValidMissionName(true);
    }
  }

  const onStartTimeChange = ev => {
    let time = ev.target.value;
    setMissionObject((prevState) => ({
      ...prevState,
      startTime: time
    }));
  }

  const onEndTimeChange = ev => {
    let time = ev.target.value;
    setMissionObject((prevState) => ({
      ...prevState,
      endTime: time
    }));
  }

  function clicked() {
    console.log("Hello")
    let lng = document.getElementById("markerLng");
    
    lng.select();
    lng.setSelectionRange(0, 99999); /* For mobile devices */

    document.execCommand('copy');

    alert("Copied the text: " + lng.value);
  }

  return (
    <>
      <Header />
      <NavBar />
      <section className="home">
        <div className="container">
          <h1>Edit Mission Marker</h1>
          <Form.Group>
            <Form.Control type="text" placeholder="Enter mission name" onChange={onMissionNameChange} />
            <br />
            <Form.Control type="text" placeholder="Coordinates" />
            <br />
            <MainMap />
            <input id="markerLng" type="text" value={markerLng} hidden />
            <input id="markerLat" type="text" value={markerLat} hidden />
            <button onClick={clicked}>Click</button>
            <br />
            <TextField
              id="datetime-local"
              label="Start time"
              type="datetime-local"
              defaultValue="2021-01-01T08:00"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onStartTimeChange}
            />
            <br />  <br />
            <TextField
              id="datetime-local"
              label="End time"
              type="datetime-local"
              defaultValue="2021-01-02T08:00"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onEndTimeChange}
            />
            <br />
            <br /><br />
            <Button disabled={!validMissionName} onClick={editMission}>Edit</Button><Link to="admin"><Button>Cancel</Button></Link>
          </Form.Group>
        </div>
      </section>
    </>
  );
};

export default EditMissionMarker;
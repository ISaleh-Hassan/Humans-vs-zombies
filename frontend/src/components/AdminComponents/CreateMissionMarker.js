import { TextField } from "@material-ui/core";
import { Form, Button } from 'react-bootstrap';
import React, { useState } from "react";
import Header from '../StylingComponents/Header';
import NavBar from "../StylingComponents/NavBar";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { CreateMission } from '../../utils/missionStorage'
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

const CreateMissionMarker = (props) => {

  let faction = localStorage.getItem("Faction")

  const [validMissionName, setValidMissionName] = useState(false);
  const [missionObject, setMissionObject] = useState(
    {
      name: "",
      faction: faction,
      missionState: "IN_PROGRESS",
      startTime: "2021-01-01T08:00:00.000+00:00",
      endTime: "2021-01-02T08:00:00.000+00:00"
    })
  let markerLng = localStorage.getItem('Marker Lng: ')
  let markerLat = localStorage.getItem('Marker Lat: ')


  async function createMission() {
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

  return (
    <>
      <Header />
      <NavBar />
      <section className="home">
        <div className="container">
          <h1>Create Mission Marker</h1>
          <Form.Group>
            <Form.Control type="text" placeholder="Enter mission name" onChange={onMissionNameChange} />
            <br />
            <Form.Control type="text" placeholder="Coordinates" />
            <br />
            <MainMap />
            <input id="markerLng" type="text" value={markerLng} hidden />
            <input id="markerLat" type="text" value={markerLat} hidden />
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
            <Button disabled={!validMissionName} onClick={createMission}>Create</Button><Link to="/admin"><Button>Cancel</Button></Link>
          </Form.Group>
        </div>
      </section>
    </>
  );
};

export default CreateMissionMarker;
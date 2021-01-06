import { TextField } from "@material-ui/core";
import { Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import Header from '../StylingComponents/Header';
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
  let gameId = localStorage.getItem("Game ID")
  let userId = localStorage.getItem("User ID")

  const [currentPlayer, setCurrentPlayer] = useState([]);

  useEffect(() => {
    fetchCurrentPlayer();
  }, [])

  async function fetchCurrentPlayer() {                                                                    // user should be set to userId, not 1
    const playerResponse = await fetch('/api/fetch/player/game=' + gameId + '/user=' + userId);
    let body;
    if (playerResponse.status === 200) {
      body = await playerResponse.json();
    } else {
      body = null;
    }
    setCurrentPlayer(body);
  }

  const [validMissionName, setValidMissionName] = useState(false);
  const [validDescription, setValidDescription] = useState(true);
  const [missionObject, setMissionObject] = useState(
    {
      name: "",
      missionDescription: "",
      factionVisibility: "HUMAN",
      missionPoint: {
        x: 18.0249,
        y: 59.2132
      },
      startTime: "2021-01-01T08:00:00.000+00:00",
      endTime: "2021-01-02T08:00:00.000+00:00"
    })

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
    localStorage.setItem("Mission Name: ", ev.target.value)
  }

  const onDescriptionChange = ev => {
    let currentDescription = ev.target.value;
    if (currentDescription.length < 4) {
      setValidDescription(false);
    }
    else {
      setMissionObject((prevState) => ({
        ...prevState,
        missionDescription: currentDescription
      }));
      setValidDescription(true);
    }
  }

  const onFactionChange = ev => {
    let currentFaction = ev.target.value;
    setMissionObject((prevState) => ({
      ...prevState,
      factionVisibility: currentFaction
    }));
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

  const onLngChange = ev => {
    let lng = ev.target.value;
    setMissionObject((prevState) => ({
      ...prevState,
      missionPoint: {
        x: lng,
        y: missionObject.missionPoint.y
      }
    }));
  }

  const onLatChange = ev => {
    let lat = ev.target.value;
    setMissionObject((prevState) => ({
      ...prevState,
      missionPoint: {
        x: missionObject.missionPoint.x,
        y: lat
      }
    }));
  }

  function getCoordinates() {
    let lngValue = localStorage.getItem("Lng: ")
    let latValue = localStorage.getItem("Lat: ")

    let lng = document.getElementById('p-lng');
    lng.value = lngValue;

    let lat = document.getElementById('p-lat');
    lat.value = latValue;
  }

  function getLng() {
    let copyText = document.getElementById("p-lng");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    document.execCommand("copy");

    alert("Copied the text: " + copyText.value);
  }

  function getLat() {
    let copyText = document.getElementById("p-lat");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    document.execCommand("copy");

    alert("Copied the text: " + copyText.value);
  }

  return (
    <>
      <section className="home">
        <div className="container">
          <Header />
          <h1>Create Mission Marker</h1>
          <Form.Group>
            <Form.Control type="text" placeholder="Enter mission name" onChange={onMissionNameChange} />
            <br />
            <Form.Control type="text" placeholder="Mission description..." onChange={onDescriptionChange} />
            <br />
            <label>Faction: </label>
            <Form.Control as="select" placeholder="Faction" onChange={onFactionChange}>
              <option>HUMAN</option>
              <option>ZOMBIE</option>
              <option>ALL</option>
            </Form.Control>
            <br />
            <Form.Control type="text" placeholder="Longitude" onChange={onLngChange} />
            <Form.Control type="text" placeholder="Latitude" onChange={onLatChange} />
            <br />
            <MainMap />
            <input id="p-lng" />
            <button onClick={getLng}>Copy Lng</button>
            <input id="p-lat" />
            <button onClick={getLat}>Copy Lat</button>
            <br></br>
            <button onClick={getCoordinates}>Get Coords</button>
            <br />
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
            <br /><br />
            <Button disabled={!validMissionName || !validDescription} onClick={createMission}>Create</Button><Link to="/admin"><Button>Cancel</Button></Link>
            <br></br>
          </Form.Group>
        </div>
      </section>
    </>
  );
};

export default CreateMissionMarker;
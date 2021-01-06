import { TextField } from "@material-ui/core";
import { Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import Header from '../StylingComponents/Header';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { CreateMission } from '../../utils/missionStorage'
import MainMap from "../MapComponents/MainMap";
import { FetchAllGames, FetchGame } from "../../utils/GameStorage";

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

  const [allGames, setAllGames] = useState([])
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [gameObject, setGameObject] = useState({})

  useEffect(() => {
    fetchAllGames();
  }, []);

  useEffect(() => {
    if (selectedGameId !== null) {
      fetchGame()
    }
    else {
      setGameObject({})
    }
  }, [selectedGameId]);

  useEffect(() => {

  }, [gameObject]);

  async function fetchAllGames() {
    let response = await FetchAllGames();
    if (response !== null) {
      setAllGames(response);
    } else {
      alert('Failed to fetch games');
      setAllGames([]);
    }
  }

  async function fetchGame() {
    let game = await FetchGame(selectedGameId);
    if (game !== null) {
      setGameObject(
        {
          name: game.name,
          description: game.description,
          gameState: game.gameState,
          gameId: game.gameId,
          startTime: game.startTime,
          endTime: game.endTime,
          maxNumberOfPlayers: game.maxNumberOfPlayers,
          description: game.description
        }
      );
    } else {
      alert('Failed to fetch games');
      setGameObject({});
    }
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
        props.history.push("/map");
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

  function handleChangeGameToUpdate(ev) {
    let selectedGame = ev.target.value;
    if (selectedGame !== "0") {
      localStorage.setItem("Game ID", selectedGame)
      setSelectedGameId(selectedGame)
      setGameObject({})
    }
    else {
      setSelectedGameId(null);
    }
  }

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }

  return (
    <>
      <section className="home">
        <div className="container">
          <Header />
          <h1>Create Mission Marker</h1>
          <Form.Group>

            <Form.Control
              onChange={handleChangeGameToUpdate}
              className="mb-4"
              as="select">
              <option value="0">Select game...</option>
              {allGames.filter(game => game.gameState !== 'COMPLETED').map(filteredGame => (
                <option key={filteredGame.gameId} value={filteredGame.gameId}>
                  {filteredGame.name}
                </option>
              ))}
            </Form.Control>

            {selectedGameId !== null && !isEmpty(gameObject) ?
              <div>
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
              </div>
              : null}
          </Form.Group>
        </div>
      </section>
    </>
  );
};

export default CreateMissionMarker;
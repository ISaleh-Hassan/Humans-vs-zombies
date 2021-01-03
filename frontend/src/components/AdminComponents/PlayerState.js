import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from '../StylingComponents/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FetchAllPlayers, GetPlayerData, UpdatePlayer, DeletePlayer } from "../../utils/PlayerStorage";
import { Form, Button } from 'react-bootstrap';


const PlayerState = (props) => {
  const [allPlayers, setAllPlayers] = useState([])
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [playerObject, setPlayerObject] = useState({})

  useEffect(() => {
    fetchAllPlayers();
  }, []);

  useEffect(() => {
    if (selectedPlayerId !== null) {
      fetchPlayer()
    }
    else {
      setPlayerObject({})
    }
  }, [selectedPlayerId]);

  useEffect(() => {

  }, [playerObject]);

  async function fetchAllPlayers() {
    let response = await FetchAllPlayers();
    if (response !== null) {
      setAllPlayers(response);
    } else {
      alert('Failed to fetch players');
      setAllPlayers([]);
    }
  }

  async function fetchPlayer() {
    let response = await GetPlayerData(selectedPlayerId);
    if (response !== null) {
      setPlayerObject(response);
    } else {
      alert('Failed to fetch player');
      setPlayerObject({});
    }
  }

  function cancelEditingPlayer(){
    props.history.push("/admin");
  }

  async function editPlayer() {
    let response = await UpdatePlayer(playerObject);
    if (response.status === 200) {
      props.history.push("/admin");
    } else if (response.status === 400) {
      alert("Game name must be unique!");
    } else {
      alert("Something went wrong while updating the player.");
    }
  }

  async function deletePlayer() {
    let response = await DeletePlayer(selectedPlayerId);
    if (response.status === 200) {
      props.history.push("/admin");
    }
    else {
      alert("Something went wrong while deleting the player.");
    }
  }

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }

  function handleChangePlayerToUpdate(ev) {
    let selectedPlayer = ev.target.value;
    if (selectedPlayer !== "0") {
      setSelectedPlayerId(selectedPlayer)
      setPlayerObject({})
    }
    else {
      setSelectedPlayerId(null);
    }
  }

  function handleChangePlayerFaction(ev) {
    let selectedFaction = ev.target.value;
    if (selectedFaction !== "0") {
      setPlayerObject((prevState) => ({
        ...prevState,
        faction: selectedFaction
      }));
    }
    else {
      setSelectedPlayerId(null);
    }
  }

  function handleChangePlayerIsPatientZero(ev) {
    let selectedState = ev.target.value;
    if (selectedState !== "0") {
      setPlayerObject((prevState) => ({
        ...prevState,
        patientZero: convertStringValueToBoolean(selectedState)
      }));
    }
    else {
      setSelectedPlayerId(null);
    }
  }

  function convertStringValueToBoolean(value) {
    if (value === "true") {
      return true;
    }
    else {
      return false;
    }
  }
  function handleChangePlayerIsAlive(ev) {
    let selectedState = ev.target.value;
    if (selectedState !== "0") {
      setPlayerObject((prevState) => ({
        ...prevState,
        alive: convertStringValueToBoolean(selectedState)
      }));
    }
    else {
      setSelectedPlayerId(null);
    }
  }
  return (
    <>
      <Header />
      <section className="home">
        <div className="container">
          <h1>Edit Player State</h1>
          <Form.Group>
            <Form.Label>Player ID</Form.Label>
            <Form.Control
              onChange={handleChangePlayerToUpdate}
              className="mb-4"
              as="select">
              <option value="0">Select player...</option>
              {allPlayers.map(player => (
                <option key={player.playerId} value={player.playerId}>
                  {player.playerId}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {selectedPlayerId !== null && !isEmpty(playerObject) ?
            <div>
              <Form.Label>Faction</Form.Label>
              <Form.Control
                as="select"
                className="mb-4"
                onChange={handleChangePlayerFaction}>
                {playerObject.faction === 'HUMAN' ?
                  <>
                    <option selected value="HUMAN">Human</option>
                    <option value="ZOMBIE">Zombie</option>
                  </>
                  :
                  <>
                    <option
                      value="HUMAN">Human</option>
                    <option
                      selected
                      value="ZOMBIE">Zombie</option>
                  </>
                }

              </Form.Control>

              {playerObject.faction === "HUMAN" ?
                <>
                  <Form.Label>Is alive</Form.Label>
                  <Form.Control
                    className="mb-4"
                    onChange={handleChangePlayerIsAlive}
                    as="select">
                    {playerObject.alive ?
                      <>
                        <option
                          selected
                          value={true}>Yes</option>
                        <option
                          value={false}>No</option>
                      </>
                      :
                      <>
                        <option
                          value={true}>Alive</option>
                        <option
                          selected
                          value={false}>Dead</option>
                      </>
                    }
                  </Form.Control>
                </>
                : null}

              {playerObject.faction === "ZOMBIE" ?
                <>
                  <Form.Label>Is patient zero</Form.Label>
                  <Form.Control
                    onChange={handleChangePlayerIsPatientZero}
                    as="select">
                    {playerObject.patientZero ?
                      <>
                        <option selected value={true}>Yes</option>
                        <option value={false}>No</option>
                      </>
                      :
                      <>
                        <option >Yes</option>
                        <option selected>No</option>
                      </>
                    }
                  </Form.Control>
                </>
                : null}
            </div> : null
          }
          {selectedPlayerId ?
            <>
              <Button
                onClick={editPlayer}
                className="m-1"
                size="sm"
                disabled={isEmpty(playerObject)}>Update</Button>

              <Button
                onClick={deletePlayer}
                className="m-1"
                size="sm"
                disabled={isEmpty(playerObject)}
                variant="danger">Delete</Button>

              <Button
                onClick={cancelEditingPlayer}
                className="m-1"
                size="sm"
                variant="warning">Cancel</Button>
            </> : null}
        </div>
      </section>
    </>
  );
};

export default PlayerState;
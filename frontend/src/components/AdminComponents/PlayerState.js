import React, { useState, useEffect } from "react";
import Header from '../StylingComponents/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  GetPlayerData,
  UpdatePlayer,
  DeletePlayer,
  FetchAllPlayersByGameId
} from "../../utils/PlayerStorage";
import { FetchAllGames } from "../../utils/GameStorage";
import { Form, Button } from 'react-bootstrap';
import { FetchAllSquadsByGameId } from "../../utils/squadstorage";
import { CreateSquadMember, GetSquadMemberById, DeleteSquadMember } from "../../utils/SquadMemberStorage";


const PlayerState = (props) => {
  const [allPlayers, setAllPlayers] = useState([])
  const [playerObject, setPlayerObject] = useState({})
  const [allGames, setAllGames] = useState([])
  const [allSquads, setAllSquads] = useState([])
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedSquadId, setSelectedSquadId] = useState(0);

  useEffect(() => {
    fetchAllGames();
  }, []);

  useEffect(() => {
    if (selectedPlayerId !== null) {
      fetchPlayer()
      fetchSquadMemberById()
    }
    else {
      setPlayerObject({})
    }
  }, [selectedPlayerId]);

  useEffect(() => {
    if (selectedGameId !== null) {
      fetchAllPlayersByGameId()
      fetchAllSquadsByGameId()
    }
    else {
      setPlayerObject({})
    }
  }, [selectedGameId]);

  useEffect(() => {
    fetchSquadMemberById()
  }, [playerObject]);

  async function fetchAllGames() {
    let response = await FetchAllGames();
    if (response !== null) {
      setAllGames(response);
    } else {
      alert('Failed to fetch games');
      setAllGames([]);
    }
  }

  async function fetchAllPlayersByGameId() {
    let response = await FetchAllPlayersByGameId(selectedGameId);
    if (response !== null) {
      setAllPlayers(response)
    } else {
      alert('Failed to fetch players by game id ' + selectedGameId);
      setAllPlayers([]);
    }
  }

  async function fetchSquadMemberById() {
    if (!isEmpty(playerObject) && playerObject.squadMemberId != null) {
      let response = await GetSquadMemberById(playerObject.squadMemberId);
      if (response !== null) {
        setPlayerObject((prevState) => ({
          ...prevState,
          squadId: response.squadId
        }));
      }
    }
  }

  async function fetchAllSquadsByGameId() {
    let response = await FetchAllSquadsByGameId(selectedGameId)
    if (response !== null) {
      setAllSquads(response)
    } else {
      alert('Failed to fetch squads by game id ' + selectedGameId);
      setAllSquads([]);
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

  async function fetchPlayer() {
    let response = await GetPlayerData(selectedPlayerId);
    if (response !== null) {
      setPlayerObject(response);
    } else {
      alert('Failed to fetch squad');
      setPlayerObject({});
    }
  }

  function cancelEditingPlayer() {
    props.history.push("/admin");
  }

  async function addPlayerToSquad() {
    if (!playerObject.squadMemberId && selectedSquadId && selectedSquadId !== "0") {
      let response = await CreateSquadMember(playerObject.gameId, selectedSquadId, playerObject.playerId, "MEMBER")
      if (response.status === 200) {
        props.history.push("/admin");
      }
    }
  }

  async function deleteFromSquad() {
    if (playerObject.squadMemberId && selectedSquadId == null) {
      let response = await DeleteSquadMember(playerObject.squadMemberId)
      if (response.status === 200) {
        props.history.push("/admin");
      }
    }
  }

   function  moveFromSquad() {
    if (playerObject.squadMemberId && selectedSquadId !== null && selectedSquadId !== 0) {
      deleteFromSquad()
      addPlayerToSquad()
      console.log("Hello")
    }
  }

  async function editPlayer() {
    let response = await UpdatePlayer(playerObject);
    if (response.status === 200) {
      props.history.push("/admin");
    }
    else {
      alert("Something went wrong while updating the player.");
    }
    deleteFromSquad()
    addPlayerToSquad()
     moveFromSquad()
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

  function handleChangeGame(ev) {
    let selectedGame = ev.target.value;
    if (selectedGame === "0") {
      setSelectedGameId(null);
      setSelectedPlayerId(null)
      setPlayerObject({})
      setAllSquads([])
      setAllPlayers([])
      setSelectedSquadId(0)
    }
    else {
      setSelectedGameId(selectedGame)
    }
  }

  function handleChangeSquad(ev) {
    let selectedSquad = ev.target.value;
    if (selectedSquad === "none") {
      setSelectedSquadId(null)
    }
    else if (selectedSquad === "0") {
      setSelectedSquadId(0);
    }
    else {
      setSelectedSquadId(selectedSquad)
    }
  }

  function getSquadNameById(id) {
    for (let i = 0; i < allSquads.length; i++) {
      if (allSquads[i].squadId === id) {
        return allSquads[i].name;
      }
    }
  }
  return (
    <>
      <Header />
      <section className="home">
        <div className="container">
          <h1>Edit Player State</h1>

          <Form.Group>
            <Form.Control
              onChange={handleChangeGame}
              className="mb-4"
              as="select">
              <option value="0">Select game...</option>
              {allGames.filter(game => game.gameState !== 'COMPLETED').map(filteredGame => (
                <option key={filteredGame.gameId} value={filteredGame.gameId}>
                  {filteredGame.name}
                </option>
              ))}
            </Form.Control>
            {selectedGameId !== null ?
              <>
                <Form.Label>All players</Form.Label>
                <Form.Control
                  onChange={handleChangePlayerToUpdate}
                  className="mb-2"
                  as="select">
                  <option value="0">Select player...</option>
                  {allPlayers.map(player => (
                    <option key={player.playerId} value={player.playerId}>
                      {player.playerId}
                    </option>
                  ))}
                </Form.Control>
              </> : null}
          </Form.Group>

          {selectedPlayerId !== null && !isEmpty(playerObject) ?
            <div>
              <Form.Label>Faction</Form.Label>
              <Form.Control
                as="select"
                className="mb-2"
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
                  <Form.Label>Human squads</Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="squadComboBox"
                    onChange={handleChangeSquad}
                    as="select">
                    <option value="0">Select squad...</option>

                    {allSquads.filter(squad => squad.faction = 'HUMAN' &&
                      playerObject.squadId !== squad.squadId).map(filteredSquad => (
                        <option key={filteredSquad.squadId} value={filteredSquad.squadId}>
                          {filteredSquad.name}
                        </option>
                      ))}


                    {playerObject.squadId ?
                      <>
                        <option value="none">None</option>
                        <option selected value={playerObject.squadId}>
                          {getSquadNameById(playerObject.squadId)}
                        </option>
                      </> :
                      <option selected value="none">None</option>
                    }

                  </Form.Control>

                  <Form.Label>Is alive</Form.Label>
                  <Form.Control
                    className="mb-2"
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
                  <Form.Label>Zombie squads</Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="zombieSquadComboBox"
                    onChange={handleChangeSquad}
                    as="select">
                    <option value="0">Select squad...</option>
                    {allSquads.filter(squad => squad.faction = 'ZOMBIE' &&
                      playerObject.squadId !== squad.squadId).map(filteredSquad => (
                        <option key={filteredSquad.squadId} value={filteredSquad.squadId}>
                          {filteredSquad.name}
                        </option>
                      ))
                    }


                    {playerObject.squadId ?
                      <>
                        <option value="none">None</option>
                        <option selected value={playerObject.squadId}>
                          {getSquadNameById(playerObject.squadId)}
                        </option>
                      </> :
                      <option selected value="none">None</option>
                    }
                  </Form.Control>

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
          {selectedPlayerId && selectedGameId ?
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
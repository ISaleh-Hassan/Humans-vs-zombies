import React, { useState, useEffect } from "react";
import Header from "../StylingComponents/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { UpdateGame, FetchAllGames, FetchGame } from "../../utils/GameStorage";
import TextField from '@material-ui/core/TextField';
import GameMenu from "../StylingComponents/GameMenu";


const EditGame = (props) => {
  const [validGameName, setValidGameName] = useState(false);
  const [validGameDescription, setValidGameDescription] = useState(false);
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

  async function fetchAllGames() {
    let allGames = await FetchAllGames();
    if (allGames !== null) {
      setAllGames(allGames);
    } else {
      alert('Failed to fetch games');
      setAllGames([]);
    }
  }

  async function fetchGame() {
    let game = await FetchGame(selectedGameId);
    if (game !== null) {
      setGameObject(game);
    } else {
      alert('Failed to fetch games');
      setGameObject({});
    }
  }

  async function editGame() {
    if (validGameDescription === true && validGameName === true) {
      let editGameResponse = await UpdateGame(gameObject);
      if (editGameResponse.status === 201) {
        props.history.push("/currentgames");
      } else if (editGameResponse.status === 400) {
        alert("Game name must be unique!");
      } else {
        alert("Something went wrong while creating the game.");
      }
    }
  }

  const onGameNameChange = ev => {
    let currentGameName = ev.target.value;
    if (currentGameName.length < 4) {
      setValidGameName(false);
    }
    else {
      setGameObject((prevState) => ({
        ...prevState,
        name: currentGameName
      }));
      setValidGameName(true);
    }
  }

  const onGameDescriptionChange = ev => {
    let currentGameDescription = ev.target.value;
    if (currentGameDescription.length < 4) {
      setValidGameDescription(false);
    }
    else {
      setGameObject((prevState) => ({
        ...prevState,
        description: currentGameDescription
      }));
      setValidGameDescription(true);
    }
  }

  const onStartTimeChange = ev => {
    let time = ev.target.value;
    setGameObject((prevState) => ({
      ...prevState,
      startTime: time
    }));
  }

  const onEndTimeChange = ev => {
    let time = ev.target.value;
    setGameObject((prevState) => ({
      ...prevState,
      endTime: time
    }));
  }

  const onSizeChange = ev => {
    let numPlayers = ev.target.value;
    if (numPlayers > 0) {
      setGameObject((prevState) => ({
        ...prevState,
        maxNumberOfPlayers: numPlayers
      }));
    }
  }

  function handleChangeGameToUpdate(ev) {
    let selectedGame = ev.target.value;
    if (selectedGame !== "0") {
      setSelectedGameId(selectedGame)
    }
    else {
      setSelectedGameId(null);
    }
  }


  return (
    <>
      <section className="home">
        <div className="container">
          <Header />
          <GameMenu />
          <h1>Edit game</h1>
          <br />
          <Form.Group>

            <Form.Control onChange={handleChangeGameToUpdate} as="select">
              <option value="0">Select game...</option>
              {allGames.filter(game => game.gameState !== 'COMPLETED').map(filteredGame => (
                <option key={filteredGame.gameId} value={filteredGame.gameId}>
                  {filteredGame.name}
                </option>
              ))}

            </Form.Control>

            {selectedGameId!==null ?
              <div>
                <Form.Control
                  type="text"
                  placeholder="Enter game name..."
                  defaultValue={gameObject.name}
                  onChange={onGameNameChange} />
                <br />
                <Form.Control
                  placeholder="Enter game description..."
                  as="textarea"
                  defaultValue={gameObject.description}
                  rows={3}
                  onChange={onGameDescriptionChange} />
                <br />
                <TextField
                  id="datetime-local"
                  label="Start time"
                  type="datetime-local"
                  defaultValue={console.log(gameObject.startTime)}
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
                  defaultValue="2021-01-01T09:00"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={onEndTimeChange}
                />
                <br />
                <br />
                <Form.Control 
                type="number" 
                defaultValue={gameObject.maxNumberOfPlayers}
                size="sm" 
                onChange={onSizeChange} 
                placeholder="Max number of players...">

                </Form.Control>
                <br /> <br />
                <Button disabled={!validGameName || !validGameDescription} onClick={editGame}>Edit</Button>
              </div>
              : null}

          </Form.Group>
        </div>
      </section>
    </>
  );
};
export default EditGame;
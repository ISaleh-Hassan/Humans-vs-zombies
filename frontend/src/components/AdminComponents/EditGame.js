import React, { useEffect, useState } from "react";
import Header from "../StylingComponents/Header";
import NavBar from "../StylingComponents/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { DeleteGame, FetchGame, UpdateGame } from "../../utils/AdminDbStorge";

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

const EditGame = (props) => {
  const [validGameName, setValidGameName] = useState(true);
  const [validGameDescription, setValidGameDescription] = useState(true);
  const [deleteGame, setDeleteGame] = useState(false);
  const [gameObject, setGameObject] = useState(
    {
      gameId: null,
      name: null,
      gameState: null,
      startTime: null,
      endTime: null,
      maxNumberOfPlayers: 0,
      description: null
    })

  useEffect(() => {
    loadGameDetails();
  }, []);

  async function loadGameDetails() {
    const gameId = localStorage.getItem("Game ID");
    if (gameId != null) {
      const game = await FetchGame(gameId);
      setGameObject({
        gameId: game.gameId,
        name: game.name,
        gameState: game.gameState,
        startTime: game.startTime,
        endTime: game.endTime,
        maxNumberOfPlayers: game.maxNumberOfPlayers,
        description: game.description,
      })
    } else {
      alert("Game ID is null.");
    }
  }

  async function onUpdateClicked() {
    if (validGameDescription === true && validGameName === true) {
      let updateGameResponse = await UpdateGame(gameObject);
      if (updateGameResponse.status === 200) {
        props.history.push("/currentgames");
      } else if (updateGameResponse.status === 400) {
        alert("Game name must be unique!");
      } else {
        alert("Something went wrong while updating game information.");
      }
    }
  }

  async function onDeteleClicked() {
    let deleteGameResponse = await DeleteGame(gameObject.gameId);
    if (deleteGameResponse.status === 200) {
      props.history.push("/currentgames");
    } else {
      console.log("Something went wrong when trying to delete the game.");
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

  const onCheckBoxChanged = ev => {
    setDeleteGame(!deleteGame);
  }

  return (
    <>
      <Header />
      <NavBar />
      <section className="home">
        <div className="container">
          <h1>Edit Game</h1>
          <br />
          <Form.Group>
            <Form.Control type="text" placeholder={gameObject.name} onChange={onGameNameChange} />
            <br />
            <Form.Control as="select" placeholder={gameObject.gameState}>
              <option>PREPERATION</option>
              <option>IN_PROGRESS</option>
              <option>COMPLETED</option>
            </Form.Control>
            <br />
            <Form.Control placeholder={gameObject.description} as="textarea" rows={3} onChange={onGameDescriptionChange} />
            <br />
            <TextField
              id="datetime-local"
              label="Start time"
              type="datetime-local"
              defaultValue={gameObject.startTime}
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
              defaultValue={gameObject.endTime}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onEndTimeChange}
            />
            <br />

            <br />
            <Form.Control type="number" size="sm" onChange={onSizeChange} placeholder={gameObject.maxNumberOfPlayers}>

            </Form.Control>
            <br /> <br />
            <Button disabled={!validGameName || !validGameDescription} onClick={onUpdateClicked}>Update Game</Button>
            <Button disabled={!deleteGame} onClick={onDeteleClicked}>Delete Game</Button>
            <Form.Group controlId="deleteGameCheckbox">
              <Form.Check type="checkbox" label="Delete game?" onChange={onCheckBoxChanged} />
            </Form.Group>
          </Form.Group>
        </div>
      </section>
    </>
  );
};

export default EditGame;
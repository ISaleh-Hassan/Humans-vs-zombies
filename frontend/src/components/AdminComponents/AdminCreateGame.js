import React, { useState } from "react";
import Header from "../StylingComponents/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { CreateGame } from "../../utils/AdminDbStorge";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

const AdminCreateGame = (props) => {
    const [validGameName, setValidGameName] = useState(false);
    const [validGameDescription, setValidGameDescription] = useState(false);
    const [gameObject, setGameObject] = useState(
        {
            name: "",
            gameState: "PREPERATION",
            startTime: "2021-01-01T08:00:00.000+00:00",
            endTime: "2021-01-02T08:00:00.000+00:00",
            maxNumberOfPlayers: 50,
            description: ""
        })

    async function createGame() {
        if (validGameDescription === true && validGameName === true) {
            let createGameResponse = await CreateGame(gameObject);
            if (createGameResponse.status === 201) {
                props.history.push("/currentgames");
            } else if (createGameResponse.status === 400) {
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

    return (
        <>
            <Header />
            <section className="home">
                <div className="container">
                    <h1>Create game</h1>
                    <br />
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter game name..." onChange={onGameNameChange} />
                        <br />
                        <Form.Control placeholder="Enter game description..." as="textarea" rows={3} onChange={onGameDescriptionChange} />
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
        
                        <br />
                        <Form.Control type="number" size="sm" onChange={onSizeChange} placeholder="Max number of players...">

                        </Form.Control>
                        <br /> <br />
                        <Button disabled={!validGameName || !validGameDescription} onClick={createGame}>Create</Button>
                    </Form.Group>
                </div>
            </section>
        </>
    );
};
export default AdminCreateGame;
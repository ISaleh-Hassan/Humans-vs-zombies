import React, { useState } from "react";
import Header from "../StylingComponents/Header";
import NavBar from "../StylingComponents/NavBar";
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

const AdminCreateGame = () => {
    const [validGameName, setValidGameName] = useState(false);
    const [validGameDescription, setValidGameDiscription] = useState(false);
    const [gameObject, setGameObject] = useState(
        {
            name: "",
            gameState: null,
            startTime: "2010-10-10T00:00:00.000+00:00",
            endTime: "2010-11-10T00:00:00.000+00:00",
            maxNumberOfPlayers: 5,
            description: ""
        })

    function createGame() {
        CreateGame(gameObject);
    }

    const onGameNameChange = ev => {
        let currentGameName = ev.target.value;
        setGameObject((prevState) => ({
            ...prevState,
            name: currentGameName
        }));

        if (currentGameName.length < 2) {
            setValidGameName(false);
        }
        else {
            setValidGameName(true);
        }
    }

    const onGameDiscriptionChange = ev => {
        let currentGameDiscription = ev.target.value;
        setGameObject((prevState) => ({
            ...prevState,
            description: currentGameDiscription
        }));

        if (currentGameDiscription.length < 5) {
            setValidGameDiscription(false);
        }
        else {
            setValidGameDiscription(true);
        }
    }

    
    function handleStartTime(e){
        console.log(e)
   
    }

    return (
        <>
            <Header />
            <NavBar />
            <section className="home">
                <div className="container">
                    <h1>Create game</h1>
                    <br />
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter game name..." onChange={onGameNameChange} />
                        <br />
                        <Form.Control placeholder="Enter game description..." as="textarea" rows={3} onChange={onGameDiscriptionChange} />
                        <br />
                        <TextField
                            id="datetime-local"
                            label="Start time"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />  <br />
                        <TextField
                            id="datetime-local"
                            label="End time"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
        
                        <br />
                        <Form.Control as="select" size="sm" custom>
                            <option>Maximum players</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
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
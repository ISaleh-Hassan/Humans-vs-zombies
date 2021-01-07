import React, { useState, useEffect } from "react";
import Header from "../StylingComponents/Header";
import { Button, Form } from 'react-bootstrap';
import { FetchAllGames, FetchGame } from "../../utils/GameStorage";
import { Link } from 'react-router-dom';


const AdminMapChoice = (props) => {

    const BUTTON_STYLES = {
        width: '150px',
        height: '40px',
        margin: '2px',
        padding: '1px'
    }

    const [allGames, setAllGames] = useState([]);
    const [selectedGameId, setSelectedGameId] = useState(null);
    const [gameObject, setGameObject] = useState({})
    const [buttonStatus, setButtonStatus] = useState(true);


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
          setGameObject({});
        }
      }


    async function handleGameChoice(ev) {
        let selectedGame = ev.target.value;
        if (selectedGame !== "0") {
            setSelectedGameId(selectedGame);
            setGameObject({});
            
            let finished = await fetchGame();
            if (finished !== null) {
                localStorage.setItem('Game ID', selectedGameId);
                setButtonStatus(false);
            }
        } else {
            setSelectedGameId(null);
        }
    }


    function confirmChoice() {
        localStorage.setItem('Game ID', selectedGameId);
        if (selectedGameId !== null) {
            props.history.push('map');
        }
    }

    return (
        <>
            <section className="home">
                <div className="container">
                    <Header />
                    <h2>Choose a Game</h2>
                    <br/>

                    <Form.Group>
                        <Form.Control
                            onChange={handleGameChoice}
                            className="gameChoice"
                            as="select">
                            <option value="0">Select Game...</option>
                            {allGames.filter(game => game.gameState !== 'COMPLETED').map(filteredGame => (
                            <option key={filteredGame.gameId} value={filteredGame.gameId}>
                            {filteredGame.name}
                            </option>
                            ))}
                        </Form.Control>
                        
                        <Button variant="dark" disabled={buttonStatus} style={BUTTON_STYLES} onClick={confirmChoice}>Confirm</Button>
                        
                        <Link to="admin">
                            <Button variant="danger" style={BUTTON_STYLES}>Cancel</Button>
                        </Link> 
                    </Form.Group>
                </div>
            </section>
        </>
    );
}

export default AdminMapChoice;
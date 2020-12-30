import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from '../StylingComponents/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FetchAllPlayers, GetPlayerData, UpdatePlayer } from "../../utils/PlayerStorage";
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

  async function editPlayer() {
    let response = await UpdatePlayer(playerObject);
    if (response.status === 200) {
      props.history.push("/admin");
    } else if (response.status === 400) {
      alert("Game name must be unique!");
    } else {
      alert("Something went wrong while updating the game.");
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
    let selectedPlayer = ev.target.value;
    if (selectedPlayer !== "0") {
      setPlayerObject((prevState) => ({
        ...prevState,
        faction: selectedPlayer
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
              <Form.Control as="select" onChange={handleChangePlayerFaction}>
                <option value="0">Select faction...</option>
                {playerObject.faction === 'Human' ?
                  <>
                    <option selected>Human</option>
                    <option >Zombie</option>
                  </>
                  :
                  <>
                    <option >Human</option>
                    <option selected>Zombie</option>
                  </>
                }

              </Form.Control>

              {playerObject.faction === "Human" ?
                <Form.Control as="select">
                  <option value="0">Select if player is alive...</option>
                  {playerObject.alive ?
                    <>
                      <option selected>Alive</option>
                      <option >Dead</option>
                    </>
                    :
                    <>
                      <option >Alive</option>
                      <option selected>Dead</option>
                    </>
                  }
                </Form.Control> : null}

              {playerObject.faction === "Zombie" ?
                <Form.Control as="select">
                  <option value="0">Select if player is patient zero...</option>
                  {playerObject.patientZero ?
                    <>
                      <option selected>Yes</option>
                      <option >No</option>
                    </>
                    :
                    <>
                      <option >Yes</option>
                      <option selected>No</option>
                    </>
                  }
                </Form.Control> : null}
            </div> : null
          }
          <button>Update</button><button>Cancel</button>
        </div>
      </section>
    </>
  );
};

export default PlayerState;
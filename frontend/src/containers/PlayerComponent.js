import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col,Container } from 'react-bootstrap';

const PlayerComponent = () => {
  const [data, upDateData] = React.useState([]);
  const [firstLoad, setLoad] = React.useState(true);
  const [player, setPlayerName] = useState("");
  const [validInput, setValidInput] = useState(false);
  const [inlogged, setInlogged] = useState(false);
  const [invalidInputMessage, setInvalidInputMessage] = useState('Please enter a username with atleast 3 characters.');
  const [welcomeMessage, setWelcomeMessage] = useState('You are welcome ');

  let isLoading = true;

  const history = useHistory();

  const onPlayerNameChanged = ev => {
    let currentInput = ev.target.value;
    setPlayerName(currentInput);
    if (currentInput.length < 3) {
      setValidInput(false);
      setInvalidInputMessage('Please enter a username with atleast 3 characters.');
    } else if (currentInput.length > 15) {
      setValidInput(false);
      setInvalidInputMessage('Username cannot exceed 15 characters in length.');
    } else {
      setValidInput(true);
      for (let i = 0; i < currentInput.length; i++) {
        let currentChar = currentInput[i];
        if (!((currentChar >= 'a' && currentChar <= 'z') || (currentChar >= 'A' && currentChar <= 'Z'))) {
          setValidInput(false);
          setInvalidInputMessage('Error: username may only contain letters.');
        }
      }
    }
  }

  async function getPlayers() {
    let response = await fetch("http://localhost:8080/api/fetch/useraccount/all", {
      method: 'GET',
      mode: 'cors'
    })

    let body = await response.json();
    upDateData(body);
  }


  function postPlayer() {
    console.log(player)
    fetch("http://localhost:8080/api/create/useraccount", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: player })
    })

    console.log("This player has been added " + player)
    setInlogged(true);
  }

  if (firstLoad) {
    getPlayers();
    setLoad(false);
  }

  if (data.length > 0) isLoading = false;

  return (

  <Container>
     { !inlogged ? <Form className="m-5">
        <Row>
          <Col sm={8}>
            <Form.Group>
              <Form.Control type="text" placeholder="Enter a username" onChange={onPlayerNameChanged} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={6}>
            <Button disabled={!validInput} type="button" onClick={postPlayer} >Login</Button>
            {!validInput ? <p>{invalidInputMessage}</p> : null}
          </Col>
        </Row>
      </Form>: null}

      { inlogged ? <h1>{ welcomeMessage  + player}</h1>: null}
    </Container>
    
  )
}
export default PlayerComponent;

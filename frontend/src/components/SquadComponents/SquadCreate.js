import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Header from '../StylingComponents/Header';
import { storeSquadDB } from '../../utils/squadstorage';
import { FetchPlayer } from '../../utils/PlayerStorage';

const SquadCreate = ({ history }) => {

    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');
    let squadId = localStorage.getItem('Squad ID');
    let playerId = localStorage.getItem('Player ID');
    let hasSquadMemberObject = localStorage.getItem('SquadMember ID');

    const [currentPlayer, setCurrentPlayer] = useState([]);

    useEffect(() => {
        fetchCurrentPlayer();
    }, [])

    async function fetchCurrentPlayer() {  
        const playerResponse = await FetchPlayer(gameId, userId);
        if(playerResponse !== null) {
            setCurrentPlayer(playerResponse);
        } else {
            alert("Could not find Player object.");
        }
    }

    localStorage.setItem('Faction', currentPlayer.faction);

    async function handleCreateSquad(event) {
        event.preventDefault();
        const token = localStorage.getItem('jwt');
        const { squadName, squadMemberAmount } = event.target.elements;
        console.log(squadName.value, squadMemberAmount.value)
        let createSquadRepsonse = await storeSquadDB(squadName.value, currentPlayer.faction, squadMemberAmount.value);

        if (createSquadRepsonse === 201) {
            let squadMemberExists = await fetch('/api/fetch/squadmember/game=' + gameId + '/player=' + playerId, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token 
                }
            });
            let newSquadId = localStorage.getItem('Squad ID');
            if (squadMemberExists.status === 200) {
                let response = await fetch('/api/update/squadmember/' + hasSquadMemberObject, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        playerId: playerId,
                        gameId: gameId,
                        squad: {
                            squadId: newSquadId
                        },
                        squadRank: "LEADER",
                        squadMemberId: hasSquadMemberObject
                    })
                });
                let body = await response.json();
                localStorage.setItem('SquadMember ID', body.squadMemberId);

                history.push('/squaddetails/');
            } else if (squadMemberExists.status === 404) {
                let newSquadId = localStorage.getItem('Squad ID');
                let response = await fetch('/api/create/squadmember/' + gameId + '/' + newSquadId + '/' + playerId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        playerId: playerId,
                        gameId: gameId,
                        squadId: squadId,
                        squadRank: "LEADER"
                    })
                });
                if (response.status === 201) {
                    let body = await response.json();
                    localStorage.setItem('SquadMember ID', body.squadMemberId);
                    localStorage.setItem('Squad Rank', 'LEADER');
                } else {
                    alert("Failed to create squad member!")
                }
            }
        }
    }


    return (
        <div>
            <Header />
            <div className="container">
                <div id="squadCreateForm">
                    <h2>Create Squad
                    {console.log(currentPlayer)}
                    </h2>
                    <Form onSubmit={handleCreateSquad}>
                        <Form.Group controlId="formSquadName">
                            <Form.Control id="squadName" name="squadName" type="text" placeholder="Squad Name" required></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formSquadMemberLimit">
                            <Form.Control id="squadMemberAmount" name="squadMemberAmount" type="text" maxLength="2" placeholder="Squad Members (99 max)" required></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formSquadFaction">
                            <Form.Control name="squadFaction" type="text" value={currentPlayer.faction} required></Form.Control>
                        </Form.Group>
                        <button type="submit">Create</button>
                        <Link to="squads">
                            <button>Cancel</button>
                        </Link>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default SquadCreate
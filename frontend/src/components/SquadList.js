import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Stylings/Header';

const SquadList = () => {
    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');

    const [squads, setSquads] = useState([]);

    useEffect(() => {
        fetchSquads();
    }, [])

    async function fetchSquads() {
        const response = await (await fetch('http://localhost:8080/api/fetch/squad/details/game=' + gameId)).json();
        setSquads(response);
    }


    const [currentPlayer, setCurrentPlayer] = useState([]);

    useEffect(() => {
        fetchCurrentPlayer();
    }, [])

    // The userId doesn't work properly (it only works with the dummy data), so we can't fetch the current player
    async function fetchCurrentPlayer() {
        const playerResponse = await (await fetch('http://localhost:8080/api/fetch/player/game=' + gameId + '/user=' + userId));
        setCurrentPlayer(playerResponse);
    }

    // Need the current player's playerId in order to push a new squad member to the database
    function handleJoinSquad(id) {
        localStorage.setItem('squadId', id);
        console.log(id);

        
    }

    return (
        <div>
            <Header />
            <section className="squadList">
                <div className="container">
                    <h1>Active Squads</h1>
                    <div>{console.log(squads)}
                    {console.log(currentPlayer)}</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Members</th>
                                <th>Faction</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {squads.map((s) =>
                                <tr>
                                    <td>{s.squadName}</td>
                                    <td>{s.numberOfRegisteredMembers} / {s.maxNumberOfMembers}</td>
                                    <td>{s.faction}</td>
                                    <td>
                                        <Link to="squaddetails">
                                            <button type="button" onClick={() => handleJoinSquad(s.squadId)}>JOIN</button>
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <br/>
                    <Link to="createsquad">
                        <button>Create New Squad</button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default SquadList;
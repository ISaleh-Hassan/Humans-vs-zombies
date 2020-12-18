import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Stylings/Header';

const SquadList = ({history}) => {
    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');
    let playerId = localStorage.getItem('Player ID');
    let hasSquad = localStorage.getItem('Squad ID');
    let currentFaction = localStorage.getItem('squadFaction');

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

    async function fetchCurrentPlayer() {
        const playerResponse = await (await fetch('http://localhost:8080/api/fetch/player/game=' + gameId + '/user=' + userId));
        setCurrentPlayer(playerResponse);
    }


    /* const [squadMember, setSquadMember] = useState([]);

    useEffect(() => {
        fetchSquadMember();
    }, [])

    async function fetchSquadMember() {
        const response = await (await fetch('http://localhost:8080/'))
    } */

    // let faction = squads.map(f => f.faction);

    async function handleJoinSquad(squadId, faction) {
        if (hasSquad >= 1) {
            alert("You can only join one squad at a time.");
        /* } else if (currentFaction !== faction) {
            console.log(faction);
            alert("You can only join " + currentFaction + " squads."); */
        } else {
            localStorage.setItem('Squad ID', squadId);
            let response = await fetch('http://localhost:8080/api/create/squadmember/' + gameId + '/' + squadId + '/' + playerId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    playerId: playerId,
                    gameId: gameId,
                    squadId: squadId,
                    squadRank: 1,
                    squadMemberId: null
                })
            });
            let body = await response.json();
            localStorage.setItem('Squad Member ID', body.squadMemberId);
            localStorage.setItem('Squad Rank', 'MEMBER');
            history.push('/squaddetails');
        }
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
                                        <button type="button" onClick={() => handleJoinSquad(s.squadId, s.faction)}>JOIN</button>
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
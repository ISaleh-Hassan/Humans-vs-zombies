import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../StylingComponents/Header';
import NavBar from '../StylingComponents/NavBar';

const SquadDetail = ({history}) => {
    let gameId = localStorage.getItem('Game ID');
    let squadId = localStorage.getItem('Squad ID');
    let userId = localStorage.getItem('User ID');
    let playerId = localStorage.getItem('Player ID');
    let squadMemberId = localStorage.getItem('Squad Member ID');
    let squadRank = localStorage.getItem('Squad Rank');

    const [squadMembers, setSquadMembers] = useState([]);

    useEffect(() => {
        fetchSquadMembers();
    }, [])

    async function fetchSquadMembers() {
        const response = await (await fetch('http://localhost:8080/api/fetch/squadmember/details/game=' + gameId + '/squad=' + squadId)).json();
        setSquadMembers(response);
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    function showPosition(position) {
        let currentPosition = document.getElementById("current-location");
        currentPosition.innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;
    }

    const [squad, setSquad] = useState([]);

    useEffect(() => {
        fetchSquad();
    }, [])

    async function fetchSquad() {
        const squadResponse = await (await fetch('http://localhost:8080/api/fetch/squad/' + squadId)).json();
        setSquad(squadResponse);
    }


    const [currentPlayer, setCurrentPlayer] = useState([]);

    useEffect(() => {
        fetchCurrentPlayer();
    }, [])

    async function fetchCurrentPlayer() {
        const playerResponse = await (await fetch('http://localhost:8080/api/fetch/player/game=' + gameId + '/user=' + userId));
        setCurrentPlayer(playerResponse);
    }


    async function handleLeaveSquad() {

        let response = await fetch('http://localhost:8080/api/update/squadmember/' + squadMemberId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    playerId: playerId,
                    gameId: gameId,
                    squadId: null,
                    squadRank: 1,
                    squadMemberId: squadMemberId
                })
            });
        let body = await response.json();
        localStorage.setItem('Squad ID', null);
        history.push('/squads');
    }


        function handleDisbandSquad() {
            if (squadRank === "LEADER") {
                fetch('http://localhost:8080/api/delete/squad/' + squadId, {
                method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(res => console.log(res));
                localStorage.setItem('Squad ID', null);
                localStorage.removeItem('Squad Member ID');
                localStorage.removeItem('Squad Rank');
                history.push('/squads');
            } else {
                alert("You must be a leader to disband the squad.")
            }
        }


    return (
        <div>
            <Header />
            <NavBar />
            <div className="container">
                <section className="squadDetail">
                    <div className="container">
                        <h1>{squad.name}
                            {console.log(squad)}
                            {console.log(squadMembers)}
                            {console.log(currentPlayer)}</h1>
                        <br />

                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Alive</th>
                                    <th>Rank</th>
                                </tr>
                            </thead>
                            <tbody>
                                {squadMembers.map((s) =>
                                    <tr>
                                        <td>{s.username}</td>
                                        <td>{s.alive.toString()}</td>
                                        <td>{s.squadRank}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <br />

                        <button onClick={getLocation}>Mark location</button>
                        <p id="current-location"></p>
                        <button type="button" onClick={() => handleLeaveSquad()}>Leave Squad</button>

                        <br />
                        <button type="button" /* onClick={() => handleDisbandSquad()} */>Disband Squad (only available to the leader)</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SquadDetail;
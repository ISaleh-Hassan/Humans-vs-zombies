import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Stylings/Header';

const SquadDetail = (props) => {
    let gameId = localStorage.getItem('gameId');
    let squadId = localStorage.getItem('squadId');
    let userId = localStorage.getItem('User ID');

    const [squadMembers, setSquadMembers] = useState([]);

    useEffect(() => {
        fetchSquadMembers();
    }, [])

    async function fetchSquadMembers() {
        const response = await (await fetch('/api/fetch/squadmember/details/game=' + gameId + '/squad=' + squadId)).json();
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
        const squadResponse = await (await fetch('/api/fetch/squad/' + squadId)).json();
        setSquad(squadResponse);
    }


    const [currentPlayer, setCurrentPlayer] = useState([]);

    useEffect(() => {
        fetchCurrentPlayer();
    }, [])

    // The userId doesn't work properly (it only works with the dummy data), so we can't fetch the current player
    async function fetchCurrentPlayer() {
        const playerResponse = await (await fetch('/api/fetch/player/game=' + gameId + '/user=' + userId));
        setCurrentPlayer(playerResponse);
    }


    function handleLeaveSquad() {
        localStorage.removeItem('squadId');
        props.history.push('/squads');
    }


    // Need to fetch the current player's id and squad rank in order to make this work properly
    /*     function handleDisbandSquad() {
            if (squadRank = "LEADER") {
                fetch('http://localhost:8080/api/delete/squad/' + squadId, {
                method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(res => console.log(res));
                localStorage.removeItem('squadId');
                props.history.push('/squads');
            } else {
                prompt("You must be the leader to disband the squad.")
            }
        } */


    return (
        <div>
            <Header />
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
    );
}

export default SquadDetail;
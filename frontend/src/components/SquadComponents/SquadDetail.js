import React, { Component, useEffect, useState } from 'react';
import { UpdateSquadMember } from '../../utils/SquadMemberStorage';
import Header from '../StylingComponents/Header';

const SquadDetail = ({ history }) => {
    let gameId = localStorage.getItem('Game ID');
    let squadId = localStorage.getItem('Squad ID');
    let userId = localStorage.getItem('User ID');
    let playerId = localStorage.getItem('Player ID');
    let squadMemberId = localStorage.getItem('SquadMember ID');
    let squadRank = localStorage.getItem('Squad Rank');

    const [squadMembers, setSquadMembers] = useState([]);

    useEffect(() => {
        fetchSquadMembers();
    }, [])

    // A check should be added depending on response code, see function below this one
    async function fetchSquadMembers() {
        const token = localStorage.getItem('jwt');
        const memberResponse = await fetch('/api/fetch/squadmember/details/game=' + gameId + '/squad=' + squadId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token 
            }
        });
        let body;
        if (memberResponse.status === 200) {
            body = await memberResponse.json();
        } else {
            body = [];
        }
        setSquadMembers(body);
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
        const token = localStorage.getItem('jwt');
        const response = await fetch('/api/fetch/squad/' + squadId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token 
            }
        });
        let body;
        if (response.status === 200) {
            body = await response.json();
        } else {
            body = [];
        }
        setSquad(body);
    }


    const [currentPlayer, setCurrentPlayer] = useState([]);

    useEffect(() => {
        fetchCurrentPlayer();
    }, [])

    async function fetchCurrentPlayer() {
        const token = localStorage.getItem('jwt');
        const playerResponse = await fetch('/api/fetch/player/game=' + gameId + '/user=' + userId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token 
            }
        });
        if (playerResponse.status === 200) {
            let body = await playerResponse.json();
            setCurrentPlayer(body);
        } else {
            setCurrentPlayer({});
        }
    }


    function handleAlive() {
        if (squadMembers.alive === true) {
            return 'Alive';
        } else {
            return 'Dead';
        }
    }


    async function handleLeaveSquad() {
        let response = await UpdateSquadMember(squadMemberId, null);
        if (response !== null) {
            localStorage.setItem('Squad ID', response.squadId);
            localStorage.setItem('SquadMember ID', null)
            history.push('/squads');
        } else {
            alert('Failed to leave squad.');
        }
    }


    function handleDisbandSquad() {
        const token = localStorage.getItem('jwt');
        if (squadRank === "LEADER") {
            fetch('/api/delete/squad/' + squadId, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token 
                }
            })
                .then(res => res.json())
                .then(res => console.log(res));
            localStorage.setItem('Squad ID', 'null');
            localStorage.setItem('Squad Member ID', 'null');
            localStorage.setItem('Squad Rank', 'null');
            history.push('/squads');
        } else {
            alert("You do not have permission to disband the squad.")
        }
    }
    

    if (squadMemberId === 'null' || squadMemberId === 'undefined') {
        return (
            <div>
                <div className="container">
                    <Header />
                    <h3>Forbidden</h3>
                    <p>You must first join a squad to gain access to the squad detail page.</p>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <section className="home">
                    <div className="container">
                        <Header />

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
                                        <td>{handleAlive(s.alive.toString())}</td>
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
                        <button type="button" disabled={squadRank !== 'LEADER'} onClick={() => handleDisbandSquad()}>Disband Squad</button>
                    </div>
                </section>
            </div>
        );
    }
}

export default SquadDetail;
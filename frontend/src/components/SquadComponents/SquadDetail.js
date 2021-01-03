import React, { Component, useEffect, useState } from 'react';
import { CreateSquadCheckin } from '../../utils/squadCheckinStorage';
import { UpdateSquadMember } from '../../utils/SquadMemberStorage';
import GameMenu from '../StylingComponents/GameMenu';
import Header from '../StylingComponents/Header';
import NavBar from '../StylingComponents/NavBar';

const SquadDetail = ({ history }) => {
    let gameId = localStorage.getItem('Game ID');
    let squadId = localStorage.getItem('Squad ID');
    let userId = localStorage.getItem('User ID');
    let playerId = localStorage.getItem('Player ID');
    let squadMemberId = localStorage.getItem('SquadMember ID');
    let squadRank = localStorage.getItem('Squad Rank');
    let dateObject = new Date();

    const [squadMembers, setSquadMembers] = useState([]);

    useEffect(() => {
        fetchSquadMembers();
    }, [])

    // A check should be added depending on response code, see function below this one
    async function fetchSquadMembers() {
        const memberResponse = await fetch('/api/fetch/squadmember/details/game=' + gameId + '/squad=' + squadId);
        let body;
        if (memberResponse.status === 200) {
            body = await memberResponse.json();
        } else {
            body = [];
        }
        setSquadMembers(body);
    }

    // The below function doesn't work as is, but should be implemented instead of the one above
    // async function fetchSquadMembers() {
    //     const response = await (await fetch('/api/fetch/squadmember/details/game=' + gameId + '/squad=' + squadId)).json();
    //     let body;
    //     if (response.status === 200) {
    //         body = response.json();
    //     } else {
    //         body = [];
    //     }
    //     setSquadMembers(body);
    // }

    function getLocation() {
        let lng = localStorage.getItem("Squad Lng: ")
        let lat = localStorage.getItem("Squad Lat: ")
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        CreateSquadCheckin(gameId, squadId, squadMemberId, dateObject, lng, lat)
        
    }

    function showPosition(position) {
        let squadLng = position.coords.longitude.toFixed(4);
        let squadLat = position.coords.latitude.toFixed(4);
        let currentPosition = document.getElementById("current-location");
        currentPosition.innerHTML = "Longitude: " + squadLng +
            "<br>Latitude: " + squadLat;
        localStorage.setItem("Squad Lng: ", squadLng)
        localStorage.setItem("Squad Lat: ", squadLat)
    }

    const [squad, setSquad] = useState([]);

    useEffect(() => {
        fetchSquad();
    }, [])

    async function fetchSquad() {
        const response = await fetch('/api/fetch/squad/' + squadId);
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
        const playerResponse = await fetch('/api/fetch/player/game=' + gameId + '/user=' + userId);
        if (playerResponse.status === 200) {
            let body = await playerResponse.json();
            setCurrentPlayer(body);
        } else {
            setCurrentPlayer({});
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
        if (squadRank === "LEADER") {
            fetch('/api/delete/squad/' + squadId, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(res => console.log(res));
            localStorage.setItem('Squad ID', 'null');
            localStorage.setItem('Squad Member ID', 'null');
            localStorage.setItem('Squad Rank', 'null');
            history.push('/squads');
        } else {
            alert("You must be a leader to disband the squad.")
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
                        <button type="button" onClick={() => handleDisbandSquad()}>Disband Squad (only available to the leader)</button>
                    </div>
                </section>
            </div>
        );
    }
}

export default SquadDetail;
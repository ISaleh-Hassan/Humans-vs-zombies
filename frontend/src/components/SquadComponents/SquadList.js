import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../StylingComponents/Header';

const SquadList = ({history}) => {
    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');
    let playerId = localStorage.getItem('Player ID');
    let hasSquad = localStorage.getItem('Squad ID');
    let hasSquadMemberObject = localStorage.getItem('Squad Member ID');
    let currentFaction = localStorage.getItem('squadFaction');

    const [squads, setSquads] = useState([]);

    useEffect(() => {
        fetchSquads();
    }, [])

    async function fetchSquads() {
        const squadResponse = await fetch('/api/fetch/squad/details/game=' + gameId);
        let body;
        if (squadResponse.status === 200) {
            body = await squadResponse.json();       
        } else {
            body = [];
        }
        setSquads(body);
    }


    const [currentPlayer, setCurrentPlayer] = useState([]);

    useEffect(() => {
        fetchCurrentPlayer();
    }, [])

    async function fetchCurrentPlayer() {
        const playerResponse = await (await fetch('/api/fetch/player/game=' + gameId + '/user=' + userId));
        setCurrentPlayer(playerResponse);
    }


    const [squadMember, setSquadMember] = useState([]);

    useEffect(() => {
        fetchSquadMember();
    }, [])

    async function fetchSquadMember() {
        const response = await (await fetch('/api/fetch/squadMember/game=' + gameId + '/player=' + playerId));
        setSquadMember(response);
    }

    // let faction = squads.map(f => f.faction);

    // Add condition to stop player ftom joining a full squad
    async function handleJoinSquad(squadId, faction, registeredMembers, maxMembers, squadName) {
        if (registeredMembers === maxMembers) {
            alert(squadName + " appears to be full, try another squad.");

        } else if (hasSquad >= 1) {
            alert("You can only join one squad at a time. \nIf you wish to join a new squad, you must first leave your current squad.");

        } else if (currentFaction !== faction) {
            console.log(faction);
            alert("You can only join " + currentFaction + " squads.");

        } else if ((hasSquadMemberObject === null) || (hasSquadMemberObject === undefined)) {
            console.log("Player does NOT have a squad member object. Creating one now.");
            localStorage.setItem('Squad ID', squadId);
            let response = await fetch('/api/create/squadmember/' + gameId + '/' + squadId + '/' + playerId, {
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

        } else {
            console.log("Player already has a squad member object (squad member id = " + hasSquadMemberObject + ")");
            console.log("SquadID: " + squadId);
            localStorage.setItem('Squad ID', squadId);
            let response = await fetch('/api/update/squadmember/' + hasSquadMemberObject, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    playerId: playerId,
                    gameId: gameId,
                    squad: {
                        squadId: squadId
                    },
                    squadRank: 1,
                    squadMemberId: hasSquadMemberObject
                })
            });
            let body = await response.json();
            localStorage.setItem('Squad Member ID', body.squadMemberId);
            history.push('/squaddetails');
        }
    }

    function assignSquadMemberId() {
        localStorage.setItem('Squad Member ID', null);
    }

    return (
        <div>
            <Header />
            <section className="squadList">
                <div className="container">
                    <h1>Active Squads</h1>
                    <div>
                        {console.log("This is the current player: \n" + currentPlayer)}
                        {console.log("This is the current squad member: \n" + squadMember)}
                    </div>

                    {/* <div>
                        <button type="button" onClick={assignSquadMemberId}>ASSIGN SM ID</button>
                    </div> */}

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
                                        <button type="button" onClick={() => handleJoinSquad(s.squadId, s.faction, s.numberOfRegisteredMembers, s.maxNumberOfMembers, s.squadName)}>JOIN</button>
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
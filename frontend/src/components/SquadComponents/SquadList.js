import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreateSquadMember, UpdateSquadMember } from '../../utils/SquadMemberStorage';
import Header from '../StylingComponents/Header';
import NavBar from '../StylingComponents/NavBar';

const SquadList = ({history}) => {
    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');
    let playerId = localStorage.getItem('Player ID');
    let storageSquadId = localStorage.getItem('Squad ID');
    let squadMemberId = localStorage.getItem('SquadMember ID');
    let currentFaction = localStorage.getItem('Faction');

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

    async function handleJoinSquad(squadId) {
        if (squadMemberId === 'null') {
            //Player do not have a SquadMember Object yet. Create one.
            let response = await CreateSquadMember(gameId, squadId, playerId, 'MEMBER');
            if (response !== null) {
                localStorage.setItem('Squad ID', response.squadId);
                localStorage.setItem('SquadMember ID', response.squadMemberId);
                localStorage.setItem('Squad Rank', 'MEMBER');
                history.push('squaddetails');
            } else {
                alert('Failed to join squad! Post failed.');
            }
        }  else if (storageSquadId === 'null') {
            //Player has a SquadMember Object but is not assigned to a squad yet. Patch it.
            let response = await UpdateSquadMember(squadMemberId, squadId);
            if (response !== null) {
                localStorage.setItem('Squad ID', response.squadId);
                localStorage.setItem('SquadMember ID', response.squadMemberId);
                localStorage.setItem('Squad Rank', 'MEMBER');
                history.push('/squaddetails');
            } else {
                alert('Failed to join squad! Patch failed.');
                console.log(response);
            }
        } else {
            //Player is already a member of a squad. Prompt them to leave squad before trying again.
            alert('You are already in a squad. Leave current squad and try again.');
        }
    }

    return (
        <div>
            <Header />
            <NavBar />
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
                                        <button type="button" disabled={s.faction !== currentFaction || s.numberOfRegisteredMembers >= s.maxNumberOfMembers} onClick={() => handleJoinSquad(s.squadId)}>JOIN</button>
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
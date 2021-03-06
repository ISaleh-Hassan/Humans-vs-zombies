import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FetchPlayer } from '../../utils/PlayerStorage';
import { CreateSquadMember, FetchSquadMember, UpdateSquadMember } from '../../utils/SquadMemberStorage';
import Header from '../StylingComponents/Header';
import { Button } from 'react-bootstrap';

const SquadList = ({ history }) => {
    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');
    let playerId = localStorage.getItem('Player ID');
    let storageSquadId = localStorage.getItem('Squad ID');
    let squadMemberId = localStorage.getItem('SquadMember ID');
    let currentFaction = localStorage.getItem('Faction');
    let token = localStorage.getItem('jwt');

    const [squads, setSquads] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        fetchSquads();
        fetchCurrentUser();
    }, [])

    async function fetchSquads() {
        const token = localStorage.getItem('jwt');
        const squadResponse = await fetch('/api/fetch/squad/details/game=' + gameId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token 
            }
        });
        let body;
        if (squadResponse.status === 200) {
            body = await squadResponse.json();
        } else {
            body = [];
        }
        setSquads(body);
    }


    async function fetchCurrentUser() {
        const response = await fetch('/api/fetch/useraccount/' + userId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token 
            }
        });
        if (response.status === 200) {
            let body = await response.json();
            setCurrentUser(body);
        } else {
            alert("Could not find user object.")
            setCurrentUser({});
        }
    };


    const [currentPlayer, setCurrentPlayer] = useState([]);

    useEffect(() => {
        fetchCurrentPlayer();
    }, [])

    async function fetchCurrentPlayer() {
        const playerResponse = await FetchPlayer(gameId, userId);
        if (playerResponse !== null) {
            setCurrentPlayer(playerResponse);
        } else {
            alert("Could not find Player object");
        }
    }


    const [squadMember, setSquadMember] = useState([]);

    useEffect(() => {
        fetchSquadMember();
    }, [])

    async function fetchSquadMember() {
        const response = FetchSquadMember(gameId, playerId);
        if (response !== null) {
            setSquadMember(response);
        } else {
            alert("Could not find SquadMember object.");
        }
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
        } else if (storageSquadId === 'null') {
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
            <section className="home">
                <div className="container">
                    <Header />
                    <h1>Active Squads</h1>

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Members (Dead Ones)</th>
                                <th>Faction</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {squads.map((s) =>
                                <tr key={s.squadName}>
                                    <td>{s.squadName}</td>
                                    <td>{s.numberOfRegisteredMembers} / {s.maxNumberOfMembers} ({s.numberOfDeadMembers})</td>
                                    <td>{s.faction}</td>
                                    <td>
                                        <Button type="button" variant="dark" disabled={s.faction !== currentFaction || s.numberOfRegisteredMembers >= s.maxNumberOfMembers || currentUser.userType === 'ADMINISTRATOR'} onClick={() => handleJoinSquad(s.squadId)}>JOIN</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <br />
                    <Link to="createsquad">
                        <Button variant="dark">Create New Squad</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default SquadList;
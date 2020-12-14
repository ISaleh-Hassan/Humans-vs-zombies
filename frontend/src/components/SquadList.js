import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Stylings/Header';

const SquadList = () => {
    let gameId = localStorage.getItem('gameId');

    const [squads, setSquads] = useState([]);

    useEffect(() => {
        fetchSquads();
    }, [])

    async function fetchSquads() {
        const response = await (await fetch('http://localhost:8080/api/fetch/squad/game=' + gameId)).json();
        setSquads(response);
    }

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
                    <div>{console.log(squads)}</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Faction</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {squads.map((s) =>
                                <tr>
                                    <td>{s.name}</td>
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
                </div>
            </section>
        </div>
    );
}

export default SquadList;
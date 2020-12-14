import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Stylings/Header';

const SquadDetail = () => {
    let squadId = localStorage.getItem('squadId');

    const [squadMembers, setSquadMembers] = useState([]);

    useEffect(() => {
        fetchSquadMembers();
    }, [])

    async function fetchSquadMembers() {
        const response = await (await fetch('http://localhost:8080/api/fetch/squadmember/all')).json();
        setSquadMembers(response);
    }

    return (
        <div>
            <Header />
            <section className="squadDetail">
                <div className="container">
                    <h1>{console.log(squadMembers)}</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>DoA</th>
                                <th>Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {squadMembers.map((m) =>
                                <tr>
                                    <td>{m.squadMemberId}</td>
                                    <td>{m.player.faction}</td>
                                    <td>{m.squadRank}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );

}



/* class SquadDetail extends Component {

    state = {
        details: []
    };

    componentDidMount() {
        let squadId = localStorage.getItem('squadId');
        fetch('http://localhost:8080/api/fetch/squad/' + squadId)
            .then(res => res.json())
            .then((data) => {
                this.setState({details: data})
        })
            .catch(console.log);
    };

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <h2>{this.state.details.name}
                        {console.log(this.state.details)}</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>DoA</th>
                                <th>Rank</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>

                    <ul id="squadMembers">
                        <li>Toatsmcgoats(ALIVE) - Leader</li>
                        <li>Desklamp(DEAD) - Member</li>
                    </ul>

                    <button>Mark Location</button>
                    <button>Leave Squad</button>
                    <button>Disband Squad (only available to the leader)</button>
                </div>
            </div>
        );
    }
} */

export default SquadDetail;
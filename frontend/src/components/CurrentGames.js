import React from "react";
import './Components.css';
import Header from "./Header";
import Login from "./Login";

const CurrentGames = () => {

    return (
        <>
            <Header />
            <section className="home">
                <div className="container">
                    <h1>Curent Games</h1>
                    <table>
                        <tr>
                            <th>Game</th>
                            <th>Status</th>
                        </tr>
                        <tr>
                            <td>Cool Game</td>
                            <td>Active</td>
                        </tr>
                        <tr>
                            <td>Cooler Game</td>
                            <td>Register</td>
                        </tr>
                        <tr>
                            <td>Coolest Game</td>
                            <td>Complete</td>
                        </tr>
                    </table>
                    <Login />
                </div>
            </section>
        </>
    );
};

export default CurrentGames;
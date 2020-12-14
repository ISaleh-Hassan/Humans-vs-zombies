import React, { useEffect, useState } from "react";
import firebaseConfig from "../utils/firebase";
import './Stylings/Components.css';
import Header from './Stylings/Header';
// import PhoneLogin from "./PhoneLogin";

const CurrentGames = () => {

    const isVerified = firebaseConfig.auth().currentUser.emailVerified;
    const [games, setGames] = useState([]);


    useEffect(() => {
        fetchGames();
    },[])

    async function fetchGames() {
        const response = await (await fetch('http://localhost:8080/api/fetch/game/all')).json();
        setGames(response);
        console.log(response);
        console.log(games);
    }

    function handleJoin(id){
        console.log(id);
    }

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
                            <th></th>
                        </tr>
                        {games.map((g) =>
                            <tr>
                                <td>{g.name}</td>
                                <td>{g.gameState}</td>
                                <td><button type="button" onClick={() => handleJoin(g.gameId)}>Join</button></td>
                            </tr>
                        )}
                    </table>
                    <br></br>

                    { isVerified ?
                        <p>Phone Login</p>
                        : <p>Verify your email to login with phone.</p>}
                </div>
            </section>
        </>
    );
};

export default CurrentGames;
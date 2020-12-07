import React from "react";
import firebaseConfig from "../utils/firebase";
import './Components.css';
import Header from "./Header";
import PhoneLogin from "./PhoneLogin";

const CurrentGames = () => {

    const isVerified = firebaseConfig.auth().currentUser.emailVerified;

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

                    { isVerified ?
                        <PhoneLogin />
                        : <p>Verify your email to login with phone.</p>}
                </div>
            </section>
        </>
    );
};

export default CurrentGames;
import React from "react";
import firebaseConfig from "../utils/firebase";
import './Components.css';
import Header from "./Header";

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
                        <section className="login-register">
                            <div className="container">
                                <h1>Log in</h1>
                                <div>
                                    <label for="phone">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" required />
                                </div>
                                <div>
                                    <label for="code">Code</label>
                                    <input type="text" id="code" name="code" />
                                </div>
                                <div id="recaptcha-container"></div>
                                <button id="login-button">Login</button>
                            </div>
                        </section>
                        : <p>Verify your email to login with phone.</p>}
                </div>
            </section>
        </>
    );
};

export default CurrentGames;
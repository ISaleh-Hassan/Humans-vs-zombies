import React from "react";
import firebase from "../utils/firebase";
import PhoneLoginTest from "./AuthComponents/PhoneLogin";
import './Stylings/Components.css';
import Header from './Stylings/Header';
import NavBar from "./Stylings/NavBar";
// import PhoneLogin from "./PhoneLogin";

const CurrentGames = () => {

    const isVerified = firebase.auth().currentUser.emailVerified;
    const isLoggedInPhone = firebase.auth().currentUser;

    return (
        <>
            <Header />
            <NavBar />
            <section className="home">
                <div className="container">
                    <h1>Curent Games</h1>
                    <table>
                        <tr>
                            <th>Game</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>Cool Game</td>
                            <td>Active</td>
                            <th><button className="registered">Join</button></th>
                        </tr>
                        <tr>
                            <td>Cooler Game</td>
                            <td>Register</td>
                            <th><button className="unregistered">Join</button></th>
                        </tr>
                        <tr>
                            <td>Coolest Game</td>
                            <td>Complete</td>
                            <th><button className="unregistered">Complete</button></th>
                        </tr>
                    </table>
                    <br></br>

                    {isVerified ?
                        <PhoneLoginTest />
                        : <p>Verify your email to login with phone.</p>}
                </div>
            </section>
        </>
    );
};

export default CurrentGames;
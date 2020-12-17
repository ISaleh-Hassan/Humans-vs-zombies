import React from "react";
import './Stylings/Components.css';
import Header from './Stylings/Header';
import NavBar from "./Stylings/NavBar";
import ChatMessage from './ChatMessageComponents/ChatMessage'

const ChooseFaction = (props) => {

    const joinHumans = () => {
        console.log("Joined humans!")
    }

    const joinZombies = () => {
        console.log("Joined zombies!")
    }

    return (
        <>
            <Header />
            <NavBar />
            <section className="home">
            <ChatMessage />
                <div className="container">
                    <h1>Choose your faction!</h1>
                    <br></br>
                    <button type="button" onClick={() => joinHumans()}>Humans</button>
                    <button type="button" onClick={() => joinZombies()}>Zombies</button>
                </div>
            </section>
        </>
    );
};

export default ChooseFaction;
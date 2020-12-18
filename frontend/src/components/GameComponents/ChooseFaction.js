import React from "react";
import Header from '../StylingComponents/Header';
import NavBar from "../StylingComponents/NavBar";

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
import React, { Component } from 'react';
import Header from '../StylingComponents/Header';

class BiteZombie extends Component {

    killPlayer() {

    };

    makePlayerZombie() {

    };

    render() {
        return (
            <div>
                <Header />
                <div id="codeEntryContainer">
                    <h2>BITE CODE ENTRY</h2>
                    <input type="text" placeholder="CODE-HERE" />
                    <br/>
                    <button>Make Zombie</button>
                    <button>Kill</button>
                </div>
        
                <br/>
        
                <div id="killContainer">
                    <input type="text" placeholder="Coordinates (auto)" />
                    <br/>
                    <input type="text" placeholder="Victim Description" />
                    <br/>
                    <button>Submit</button>
                    <button>Cancel</button>
                </div>
            </div>
        );
    }
};

export default BiteZombie;
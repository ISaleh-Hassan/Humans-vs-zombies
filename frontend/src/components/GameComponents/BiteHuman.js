import React, { Component, useEffect, useState } from 'react';
import Header from '../StylingComponents/Header';

const BiteHuman = ({history}) => {

    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');

    const [currentPlayer, setCurrentPlayer] = useState([]);

    useEffect(() => {
        fetchCurrentPlayer();
    }, [])

    async function fetchCurrentPlayer() {
        const response = await (await fetch('/api/fetch/player/game=' + gameId + '/user=' + userId)).json();
        setCurrentPlayer(response);
    }


    if (currentPlayer.faction === 'HUMAN') {
        return (
            <div>
                <Header />
                <h2>BITE CODE</h2>
                <div id="biteHuman">{currentPlayer.biteCode}</div>
            </div>
        )
    } else if (currentPlayer.faction === 'ZOMBIE') {
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
        )
    } else {
        return (
            <div>
                <Header />
                <h3>Something went wrong...</h3>
            </div>
        )
    }
}

export default BiteHuman;




/* class BiteHuman extends Component {

    state = {
        details: []
    };

    componentDidMount() {
      fetch('/api/fetch/player/1')
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
                <h2>BITE CODE</h2>
                <div id="biteHuman">{this.state.details.biteCode}</div>
            </div>
        );
    }
};

export default BiteHuman; */
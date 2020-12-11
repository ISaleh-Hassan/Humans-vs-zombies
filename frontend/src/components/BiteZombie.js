import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BiteZombie extends Component {

    state = {
        details: []
    };

    componentDidMount() {
      fetch('http://localhost:8080/api/fetch/player/1')
          .then(res => res.json())
          .then((data) => {
              this.setState({details: data})
          })
          .catch(console.log);
    };

    render() {
        return (
            <div>
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
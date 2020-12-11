import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SquadCreate extends Component {

    render() {
        return (
            <div>
                <div id="squadCreateForm">
                <h2>Create Squad</h2>
                <input type="text" placeholder="Squad Name" />
                <br/>
                <input type="text" placeholder="Number of Members (XX max)" />
                <br/>
                <input type="text" placeholder="Faction (auto)" />
                <br/>
                <button>Create</button>
                <button>Cancel</button>
                </div>
            </div>
        );
    }
}

export default SquadCreate
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SquadList extends Component {

    state = {
        details: []
    };

    componentDidMount() {
      fetch('http://localhost:8080/api/fetch/squad/all')
          .then(res => res.json())
          .then((data) => {
              this.setState({details: data})
          })
          .catch(console.log);
    };

    render() {
        return (
            <div>
                <h2>Active Squads {console.log(this.state.details)} </h2>
                <div id="squadListContainer">
                    <div id="testSquad1">
                        <h4>Ominous Latin Name</h4>
                        <p>Members: 8/10   (fetch from database)
                            <br/>
                            HUMAN (fetch from database)
                        </p>
                        <button>JOIN</button>
                    </div>

                    <div id="testSquad2">
                        <h4>Leather Gear Solid</h4>
                        <p>Members: 10/10   (fetch from database)
                            <br/>
                            ZOMBIE (fetch from database)
                        </p>
                        <button>JOIN</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default SquadList;
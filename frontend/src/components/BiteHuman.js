import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BiteHuman extends Component {

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
                <h2>BITE CODE</h2>
                <div id="biteHuman">{this.state.details.biteCode}</div>
            </div>
        );
    }
};

export default BiteHuman;
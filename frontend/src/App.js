import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import playerComponent from './components/container/PlayerComponent';

import './App.css';

function App() {
  return (
    <Router>
      <Route exact path="/" component={playerComponent} />
  </Router>
  );
}

export default App;

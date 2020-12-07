import React from "react";
import "./App.css";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components//Register";
import { AuthProvider } from "./utils/auth";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./components/NotFound";
import CurrentGames from "./components/CurrentGames";
import Admin from "./components/Admin";
import Game from "./components/Game";
import PlayerState from "./components/PlayerState";
import MissionMarker from "./components/MissionMarker";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <BrowserRouter>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/*" component={NotFound} />
            <PrivateRoute exact path="/currentgames" component={CurrentGames} />
            <PrivateRoute exact path="/admin" component={Admin} />
            <PrivateRoute exact path="/game" component={Game} />
            <PrivateRoute exact path="/playerstate" component={PlayerState} />
            <PrivateRoute exact path="/missionmarker" component={MissionMarker} />
          </BrowserRouter>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
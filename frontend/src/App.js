import React from "react";
import "./App.css";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/AuthComponents/Login";
import Register from "./components/AuthComponents/Register";
import { AuthProvider } from "./utils/Auth";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./components/Stylings/NotFound";
import CurrentGames from "./components/CurrentGames";
import Admin from "./components/AuthComponents/Admin";
import Game from "./components/Game";
import PlayerState from "./components/PlayerState";
import MissionMarker from "./components/MissionMarker";
import MainMap from "./components/MapComponents/MainMap";
import PhoneLogin from "./components/AuthComponents/PhoneLogin";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/currentgames" component={CurrentGames} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <PrivateRoute exact path="/game" component={Game} />
          <PrivateRoute exact path="/playerstate" component={PlayerState} />
          <PrivateRoute exact path="/missionmarker" component={MissionMarker} />
          <PrivateRoute exact path="/test" component={PhoneLogin} />
          <PrivateRoute exact path="/map" component={MainMap} />
          <Route path='*'>
            <NotFound header='Page not found' message='The page you requested does not exist' />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
import React from "react";
import "./App.css";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import BiteHuman from "./components/BiteHuman";
import BiteZombie from "./components/BiteZombie";
import SquadList from "./components/SquadList";
import SquadDetail from "./components/SquadDetail";
import SquadCreate from "./components/SquadCreate";
import Login from "./components/AuthComponents/Login";
import Register from "./components/AuthComponents/Register";
import { AuthProvider } from "./utils/Auth";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./components/Stylings/NotFound";
import CurrentGames from "./components/CurrentGames";
import Admin from "./components/AdminPageComponents/Admin";
import Game from "./components/Game";
import PlayerState from "./components/PlayerState";
import MissionMarker from "./components/MissionMarker";
import MainMap from "./components/MapComponents/MainMap";
import PhoneLogin from "./components/AuthComponents/PhoneLogin";
import ChooseFaction from "./components/ChooseFaction";
import AdminCreateGame from './components/AdminPageComponents/AdminCreateGame'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/landing" component={LandingPage} />
          <PrivateRoute exakt path="/bitehuman" component={BiteHuman} />
          <PrivateRoute exakt path="/bitezombie" component={BiteZombie} />
          <PrivateRoute exakt path="/squads" component={SquadList} />
          <PrivateRoute exakt path="/squaddetails" component={SquadDetail} />
          <PrivateRoute exakt path="/createsquad" component={SquadCreate} />
          <PrivateRoute exact path="/currentgames" component={CurrentGames} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <PrivateRoute exact path="/game" component={Game} />
          <PrivateRoute exact path="/playerstate" component={PlayerState} />
          <PrivateRoute exact path="/missionmarker" component={MissionMarker} />
          <PrivateRoute exact path="/test" component={PhoneLogin} />
          <PrivateRoute exact path="/map" component={MainMap} />
          <PrivateRoute exact path="/choosefaction" component={ChooseFaction} />
          <PrivateRoute exact path="/create/game" component={AdminCreateGame} />
          <Route path='*'>
            <NotFound header='Page not found' message='The page you requested does not exist' />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
import React from "react";
import "./App.css";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Login from './components/AuthComponents/Login'
import Register from './components/AuthComponents/Register'
import Phone from './components/AuthComponents/Phone'
import RegisterPhone from './components/AuthComponents/RegisterPhone'
import Admin from './components/AdminComponents/Admin'
import EditGame from './components/AdminComponents/EditGame'
import PlayerState from './components/AdminComponents/PlayerState'
import MissionMarker from './components/AdminComponents/MissionMarker'
import Bite from './components/GameComponents/Bite'
import BiteHuman from './components/GameComponents/BiteHuman'
import BiteZombie from './components/GameComponents/BiteZombie'
import ChooseFaction from './components/GameComponents/ChooseFaction'
import CurrentGames from './components/GameComponents/CurrentGames'
import Home from './components/HomeComponents/Home'
import LandingPage from './components/HomeComponents/LandingPage'
import MainMap from './components/MapComponents/MainMap'
import SquadCreate from './components/SquadComponents/SquadCreate'
import SquadDetail from './components/SquadComponents/SquadDetail'
import SquadList from './components/SquadComponents/SquadList'
import NotFound from './components/StylingComponents/NotFound'
import { AuthProvider } from "./utils/Auth";
import './components/StylingComponents/Components.css'
import AdminCreateGame from './components/AdminComponents/AdminCreateGame'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/phone" component={Phone} />
          <Route exact path="/registerphone" component={RegisterPhone} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/landing" component={LandingPage} />
          <PrivateRoute exact path="/bite" component={Bite} />
          <PrivateRoute exact path="/bitehuman" component={BiteHuman} />
          <PrivateRoute exact path="/bitezombie" component={BiteZombie} />
          <PrivateRoute exact path="/squads" component={SquadList} />
          <PrivateRoute exact path="/squaddetails" component={SquadDetail} />
          <PrivateRoute exact path="/createsquad" component={SquadCreate} />
          <PrivateRoute exact path="/currentgames" component={CurrentGames} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <PrivateRoute exact path="/game" component={EditGame} />
          <PrivateRoute exact path="/playerstate" component={PlayerState} />
          <PrivateRoute exact path="/missionmarker" component={MissionMarker} />
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
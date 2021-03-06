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
import Bite from './components/GameComponents/Bite'
import CreateMissionMarker from './components/AdminComponents/CreateMissionMarker'
import EditMissionMarker from './components/AdminComponents/EditMissionMarker'
import BiteHuman from './components/GameComponents/BiteHuman'
import BiteZombie from './components/GameComponents/BiteZombie'
import ChooseFaction from './components/GameComponents/ChooseFaction'
import CurrentGames from './components/GameComponents/CurrentGames'
import Home from './components/HomeComponents/Home'
import LandingPage from './components/HomeComponents/LandingPage'
import GameMap from './components/GameComponents/GameMap'
import SquadCreate from './components/SquadComponents/SquadCreate'
import SquadDetail from './components/SquadComponents/SquadDetail'
import SquadList from './components/SquadComponents/SquadList'
import NotFound from './components/StylingComponents/NotFound'
import { AuthProvider } from "./utils/Auth";
import './components/StylingComponents/Components.css'
import AdminCreateGame from './components/AdminComponents/AdminCreateGame'
import Missions from "./components/GameComponents/Missions";
import Chat from "./components/ChatMessageComponents/Chat";
import AdminMapChoice from "./components/AdminComponents/AdminMapChoice";
import AdminSquadListChoice from "./components/AdminComponents/AdminSquadListChoice";
import AdminChatChoice from "./components/AdminComponents/AdminChatChoice";

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
          <PrivateRoute exact path="/adminmapchoice" component={AdminMapChoice} />
          <PrivateRoute exact path="/adminsquadlistchoice" component={AdminSquadListChoice} />
          <PrivateRoute exact path="/adminchatchoice" component={AdminChatChoice} />
          <PrivateRoute exact path="/playerstate" component={PlayerState} />
          <PrivateRoute exact path="/map" component={GameMap} />
          <PrivateRoute exact path="/choosefaction" component={ChooseFaction} />
          <PrivateRoute exact path="/create/game" component={AdminCreateGame} />
          <PrivateRoute exact path="/create/missionmarker" component={CreateMissionMarker} />
          <PrivateRoute exact path="/edit/missionmarker" component={EditMissionMarker} />
          <PrivateRoute exact path="/edit/game" component={EditGame} />
          <PrivateRoute exact path="/missions" component={Missions} />
          <PrivateRoute exact path="/chat" component={Chat} />
          <Route path='*'>
            <NotFound header='Page not found' message='The page you requested does not exist' />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
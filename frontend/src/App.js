import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components//Register";
import { AuthProvider } from "./utils/Auth";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./components/NotFound";
import CurrentGames from "./components/CurrentGames";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/currentgames" component={CurrentGames} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
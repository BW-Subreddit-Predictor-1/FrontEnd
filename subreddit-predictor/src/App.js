import React from "react";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import UserHomePage from "./components/UserHomePage.js";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/userHomePage" component={UserHomePage} />
      </Switch>
    </div>
  );
}

export default App;

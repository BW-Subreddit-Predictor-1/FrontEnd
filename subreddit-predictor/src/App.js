import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import UserHomePage from "./components/UserHomePage.js";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={UserHomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import UserHomePage from "./components/UserHomePage.js";
import PrivateRoute from "./components/PrivateRoute";
import { RedditContext } from "./contexts/RedditContext";

function App() {
  const [loggedState, setLoggedState] = useState(
    false,
    JSON.parse(localStorage.getItem("loggedState"))
  );

  const [post, setPost] = useState(initialPost);

  return (
    <div className="App">
      <Switch>
        <RedditContext.Provider
          value={(loggedState, setLoggedState, post, setPost)}
        >
          <PrivateRoute path="/userHomePage" component={UserHomePage} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={Login} />
        </RedditContext.Provider>
      </Switch>
    </div>
  );
}

export default App;

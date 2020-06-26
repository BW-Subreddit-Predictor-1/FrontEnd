import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import UserHomePage from "./components/UserHomePage.js";
import SearchResults from "./components/SearchResults.js";
import PrivateRoute from "./components/PrivateRoute";
import { RedditContext } from "./contexts/RedditContext";

function App() {
  const [loggedState, setLoggedState] = useState(
    false,
    JSON.parse(localStorage.getItem("loggedState"))
  );

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.setItem("loggedState", false);
  };
  const initialPost = {
    title: "My first reddit post",
    body: "Reddit is kinda cool",
  };

  const [post, setPost] = useState(initialPost);

  return (
    <div className="App">
      <Switch>
        <RedditContext.Provider
          value={(loggedState, logOut, setLoggedState, post, setPost)}
        >
          <PrivateRoute path="/userHomePage" component={UserHomePage} />
          <Route path="/searchResults" component={SearchResults} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </RedditContext.Provider>
      </Switch>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import UserHomePage from "./components/UserHomePage.js";
import PrivateRoute from "./components/PrivateRoute";
import { RedditContext } from "./contexts/RedditContext";
import SearchResults from "./components/SearchResults";

function App() {
  const [loggedState, setLoggedState] = useState(
    false,
    JSON.parse(localStorage.getItem("loggedState"))
  );

  const initialPost = [
    {
      title: "My first reddit post",
      body: "Reddit is kinda cool",
    },
    {
      title: "LambdaSchool:  The Official Lambda subreddit",
      body: "Welcome to r/lambdaschool, the official Lambda School subreddit.",
    },
    {
      title: "webdev: reddit for web developers",
      body:
        "A community dedicated to all things web development: both front-end and back-end.",
    },
  ];

  const [post, setPost] = useState(initialPost);

  return (
    <div className="App">
      <Switch>
        <RedditContext.Provider
          value={(loggedState, setLoggedState, post, setPost)}
        >
          <PrivateRoute path="/userHomePage" component={UserHomePage} />
          <Route path="/searchResults" component={SearchResults} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={Login} />
        </RedditContext.Provider>
      </Switch>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import UserHomePage from "./components/UserHomePage.js";
import PrivateRoute from './components/PrivateRoute';
import { RedditContext } from './contexts/RedditContext';
import SearchResults from './components/SearchResults';

function App() {

  const [ loggedState, setLoggedState ] = useState(false, JSON.parse(localStorage.getItem('loggedState')));

  const initialPost = [
    {
    title: "",
    body: "",
  }
];



  const [post, setPost] = useState([]);
  const [ results, setResults ] = useState([])

  return ( 
    <div className="App">
      <Switch>
        <RedditContext.Provider value={loggedState, setLoggedState, post, setPost, results, setResults}>
          <PrivateRoute path="/userHomePage" component={UserHomePage} />
          <Route path='/searchResults' component={SearchResults} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={Login} />
        </RedditContext.Provider>
      </Switch>
    </div>
  );
}

export default App;

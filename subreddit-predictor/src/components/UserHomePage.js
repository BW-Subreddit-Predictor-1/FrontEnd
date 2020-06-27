import React, { useEffect, useState, useContext } from "react";
import Search from "./Search.js";
import UserPost from "./UserPost.js";
import { Link } from "react-router-dom";
import { RedditContext } from "../contexts/RedditContext";
import axios from "axios";


const UserHomePage = () => {
  
  const setPost = useContext(RedditContext);
  const post = useContext(RedditContext);

  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.setItem('loggedState', false)
  }


  return (
    <>
      <nav>
        <h1>Post Here: Subreddit - Predictor</h1>
        {<a href='https://theposthere.netlify.app/'>Home</a>}
        {<a href='https://theposthere.netlify.app/about.html'>About us</a>}
        {<a onClick={() => logOut()} href='/'>Log Out</a>}
        <Link to={"/signup"}>Sign Up</Link>
      </nav>

      <RedditContext.Provider value={post, setPost}>
        <h1 className="userHomePgh1">Profile Post Page</h1>
        <Search />
        <br />
        <UserPost />
      </RedditContext.Provider>
    </>
  );
};

export default UserHomePage;

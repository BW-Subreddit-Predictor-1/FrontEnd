import React, { useEffect, useState, useContext } from "react";
import Search from "./Search.js";
import UserPost from "./UserPost.js";
import SearchResults from "./SearchResults.js";
import { Link } from "react-router-dom";
import { RedditContext } from "../contexts/RedditContext";
import axios from "axios";

const UserHomePage = () => {
  const { post, setPost } = useContext(RedditContext);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/post")
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.error(err.message, err.response);
      });
  }, []);

  return (
    <>
      <nav>
        <h1>Post Here: Subreddit - Predictor</h1>
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>About</Link>
        <Link to={"/login"}>Log out</Link>
        <Link to={"/signup"}>Sign Up</Link>
      </nav>

      <RedditContext.Provider value={(post, setPost)}>
        <h1 className="userHomePgh1">Profile Post Page</h1>
        <Search />
        <SearchResults />
        <br />
        <UserPost />
      </RedditContext.Provider>
    </>
  );
};

export default UserHomePage;

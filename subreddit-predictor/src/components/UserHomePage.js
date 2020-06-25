import React, { useEffect, useState } from "react";
import Search from "./Search.js";
import UserPost from "./UserPost.js";
import { Link } from "react-router-dom";
import { RedditContext } from "../contexts/RedditContext";
import axios from "axios";

const UserHomePage = () => {
  const initialPost = {
    title: "My first reddit post",
    post: "Reddit is kinda cool",
  };

  const [post, setPost] = useState(initialPost);

  useEffect(() => {
    axios
      .get("`https://bwptphsp1ds.herokuapp.com/predict_subreddit")
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
        <Link to={"/"}>Log out</Link>
        <Link to={"/signup"}>Sign Up</Link>
      </nav>

      <RedditContext.Provider value={(post, setPost)}>
        <h1 className="userHomePgh1">Profile Post Page</h1>
        <Search />
        <br />
        <UserPost />
      </RedditContext.Provider>
    </>
  );
};

export default UserHomePage;

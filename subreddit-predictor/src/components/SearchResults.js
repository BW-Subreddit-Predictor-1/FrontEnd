import React, { useState, useContext } from "react";
import { Label, Form, Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { RedditContext } from "../contexts/RedditContext";
import UserPost from "./UserPost";

const SearchResults = () => {
  // const post = useContext(RedditContext);
  const [post, setPost] = useState([]);
  const addPost = (newPost) => {
    setPost([...post, newPost]);
  };
  // const [loading, setLoading] = useState(false);
  // const [storiesPerPage] = useState(8);
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

  return (
    <>
      <div className="Searches">
        {/* <nav>
          <h1>Post Here: Subreddit - Predictor</h1>
          <Link to={"/"}>Home</Link>
          <Link to={"/"}>About</Link>
          <Link to={"/login"}>Log In</Link>
          <Link to={"/signup"}>Sign Up</Link>
        </nav> */}
        <Label>Search Results</Label>
        <initialPost addPost={addPost} />
        {initialPost.map((post, i) => (
          // console.log("index"),
          <Container
            style={{ marginTop: "20px", color: "blue", background: "white" }}
            key={i++}
          >
            Title: {post.title}
            <br />
            Body: {post.body}
            <br />
            <Button>Delete Post</Button>
          </Container>
        ))}
        ;
      </div>
    </>
  );
};
export default SearchResults;

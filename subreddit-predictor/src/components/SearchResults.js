import React, { useState, useContext } from "react";
import { Label, Form, Card, Container, Button } from "reactstrap";
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

  return (
    <>
      <div className="Searches">
        <nav>
          <h1>Post Here: Subreddit - Predictor</h1>
          <Link to={"/"}>Home</Link>
          <Link to={"/"}>About</Link>
          <Link to={"/login"}>Log In</Link>
          <Link to={"/signup"}>Sign Up</Link>
        </nav>

        <Label>Search Results</Label>
        <UserPost addPost={addPost} />
        {post.map(
          (post, i) => (
            console.log("index"),
            (
              <Card key={i++}>
                <Container key={i}>Title: {post.title}</Container>
                <Container> {post.body}</Container>
                <Button>Delete Post</Button>
              </Card>
            )
          )
        )}
      </div>
    </>
  );
};
export default SearchResults;

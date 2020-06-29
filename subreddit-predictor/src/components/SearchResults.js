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
        <Label>Search Results</Label>
        <initialPost addPost={addPost} />
        {initialPost.map((post, i) => (
          // console.log("index"),
          <Container
            style={{ width: "40%", margin: "0 auto", color: "white" }}
            key={i++}
          >
            <Row>Title: {post.title}</Row>

            {/* <br />
            Body: {post.body}
            <br /> */}
            <Button>Delete Post</Button>
          </Container>
        ))}
        ;
      </div>
    </>
  );
};
export default SearchResults;

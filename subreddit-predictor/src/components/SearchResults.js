import React, { useContext } from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";
import { RedditContext } from "../contexts/RedditContext";

function SearchResults() {
  const { post } = useContext(RedditContext);
  // make sure props.title and props.post are correct
  return (
    <>
      <nav>
        <h1>Post Here: Subreddit - Predictor</h1>
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>About</Link>
        <Link to={"/login"}>Log In</Link>
        <Link to={"/signup"}>Sign Up</Link>
      </nav>

      <div className="searchResults">
        {post.map((p, index) => {
          return (
            <div key={index}>
              <Card>
                <p>Title: {post.title}</p>
                <p>{post.body}</p>
                <button>Delete Post</button>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SearchResults;

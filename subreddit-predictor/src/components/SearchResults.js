import React from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Search } from "./Search.js";

// // edit styling
// const Card = styled.div`
//   background: #83715b;
//   color: lightblue;
//   padding: 5px;
//   margin: 25px;
//   text-align: center;
//   width: 250px;
//   border-radius: 7px;
//   box-shadow: 7px 7px 5px #aaaaaa;
// `;

// const Name = styled.h2`
//   margin: 5px;
//   text-align: center;
// `;

// const Info = styled.h4`
//   color: white;
// `;

const handleDelete = (e) => {};

function SearchResults() {
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
            <Card>
              <p>Title: {post.title}</p>
              <p>{post.body}</p>
              <button onClick={handleDelete}>Delete Post</button>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default SearchResults;

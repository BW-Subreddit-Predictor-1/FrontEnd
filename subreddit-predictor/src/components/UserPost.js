import React, { useState, useContext } from "react";
import { Form, Label, Input, Button, FormGroup } from "reactstrap";
import axiosWithAuth from "../utils/axiosWithAuth";
import { RedditContext } from "../contexts/RedditContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

const UserPost = () => {
  const initialState = {
    title: "",
    body: "",
  };

  const [results, setResults] = useState([]);

  const [postInput, setPostInput] = useState(initialState);
  const setPost = useContext(RedditContext);
  const { push } = useHistory();

  const handleChange = (e) => {
    setPostInput({
      ...postInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://bwptphsp1ds.herokuapp.com/predict_subreddit",
        postInput
      )
      .then((res) => {
        console.log("Res in user post", res.data);
        setPost(res.data);
        setResults(res.data);
      })
      .catch((err) => {
        console.error(err.message, err.response);
      });
  };

  return (
    <>
      {results.length === 0 ? (
        <Form
          onSubmit={handleSubmit}
          style={{ width: "40%", margin: "0 auto" }}
        >
          <FormGroup>
            <Label style={{ color: "white" }}>Title</Label>
            <Input
              type="textarea"
              name="title"
              onChange={handleChange}
              value={postInput.title}
            />
          </FormGroup>
          <FormGroup>
            <Label style={{ color: "white" }}>Post</Label>
            <Input
              type="textarea"
              name="body"
              onChange={handleChange}
              value={postInput.body}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      ) : (
        <>
          <h1 style={{ color: "white" }}>Subreddit Prediction Results</h1>
          <p style={{ color: "white" }}>{JSON.stringify(results.subreddit)}</p>
        </>
      )}
    </>
  );
};

export default UserPost;

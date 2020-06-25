import React, { useState, useContext } from "react";
import { Form, Label, Input, Button, FormGroup } from "reactstrap";
import axiosWithAuth from "../utils/axiosWithAuth";
import { RedditContext } from "../contexts/RedditContext";
import axios from 'axios';

const UserPost = () => {

  const initialState = {
    title: "",
    body: "",
  };

  const [ postInput, setPostInput ] = useState(initialState);
  const { post, setPost } = useContext(RedditContext);

  const handleChange = (e) => {
    setPostInput({
      ...postInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://bwptphsp1ds.herokuapp.com/predict_subreddit`, postInput)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.error(err.message, err.response);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ width: "40%", margin: "0 auto" }}>
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
        <Button disabled={!postInput}>Submit</Button>
      </Form>
    </>
  );
};

export default UserPost;

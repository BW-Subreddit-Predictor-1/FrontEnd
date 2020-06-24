import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import * as yup from "yup";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const Signup = (e) => {
  const [user, setUser] = useState(initialState);

  const Signup = (e) => {
    return (
      <>
        <nav>
          <h1>Post Here: Subreddit - Predictor</h1>
          <Link to={"/"}>Home</Link>
          <Link to={"/"}>About</Link>
          <Link to={"/"}>Log In</Link>
          <Link to={"/signup"}>Sign Up</Link>
        </nav>
      </>
    );
  };
};

export default Signup;

import React, { useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import {
  Navbar,
  Card,
  Form,
  Label,
  Input,
  Button,
  FormGroup,
} from "reactstrap";
// import * as yup from "yup";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // const [loading, setLoading] = useState(true);

  // //Time for Loading Screen
  // setTimeout(() => {
  //   setLoading(false);
  // }, 900);

  return (
    <>
      <Navbar color="info">
        <h1>Post Here: Subreddit - Predictor</h1>
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>About</Link>
        <Link to={"/"}>Log In</Link>
        <Link to={"/"}>Sign Up</Link>
      </Navbar>

      <Form onSubmit={handleSubmit} style={{ width: "20%", margin: "0 auto" }}>
        <h1>LOG IN</h1>
        <FormGroup>
          {/* left align text */}
          <Label style={{ textAlign: "left" }}>Email</Label>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            id="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          {/* left align text */}
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit">Log In</Button>
        <h5>
          New to Reddit? <Link to="/">SIGN UP</Link>
        </h5>
      </Form>
    </>
  );
};

export default Login;

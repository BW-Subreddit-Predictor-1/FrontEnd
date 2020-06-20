import React, { useState } from "react";
// import axios from "axios";
import { Route, Link } from "react-router-dom";
import { Navbar, FormGroup, Form, Label, Input, Button } from "reactstrap";
// import * as yup from "yup";

const Signup = (e) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (e) => {
    console.log("form submitted");
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
      <Navbar>
        <div>
          <h1 style={{ color: "white" }}>Post Here: Subreddit - Predictor</h1>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Log In</Link>
          <Link to="/">Sign Up</Link>
        </div>
      </Navbar>
      <div>
        <h1>SIGN UP</h1>
        <h4>
          By having a Subreddit account, you can join, vote, and comment on all
          your favorite Subreddit content.
        </h4>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              id="firstName"
              value={user.firstName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              id="lastName"
              value={user.lastName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
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
          <FormGroup>
            <Label>Confirmation Password</Label>
            <Input
              type="password"
              name="password_confirmation"
              placeholder="Password Confirmation"
              id="password"
              value={user.password_confirmation}
              onChange={handleChange}
            />
          </FormGroup>
          <Button type="submit">Sign Up</Button>

          <h3>
            Already a Redditor? <Link to="/">LOG IN</Link>
          </h3>
        </Form>
      </div>
    </>
  );
};

export default Signup;

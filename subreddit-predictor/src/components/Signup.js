import React, { useState, useEffect, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { FormGroup, Form, Input, Button } from "reactstrap";
import * as yup from "yup";
import { RedditContext } from "../contexts/RedditContext";

const Signup = () => {
  const initialState = {
    FirstName: "",
    LastName: "",
    Email: "",
    password: "",
  };

  const [userForm, setUserForm] = useState(initialState);
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState(initialState);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { push } = useHistory();
  const setLoggedState = useContext(RedditContext);

  const schema = yup.object().shape({
    FirstName: yup.string().required("Enter your first name").min(2),
    LastName: yup.string().required("Enter your last name").min(2),
    Email: yup.string().email().required("Enter an email"),
    password: yup.string().required("Enter a valid password").min(6),
  });

  const validateChange = (e) => {
    yup
      .reach(schema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  useEffect(() => {
    console.log(
      "checking to see if all values in form state follows the rules set in schema"
    );
    schema.isValid(userForm).then((valid) => {
      console.log("is form valid?", valid);
      setIsButtonDisabled(!valid);
    });
  }, [userForm]);

  const handleSubmit = (e) => {
    console.log("sign up form submitted");
    e.preventDefault();
    console.log("User Form", userForm);
    axiosWithAuth()
      .post("https://subreddit-post.herokuapp.com/api/auth/register", userForm)
      .then((res) => {
        console.log("res results", res.data);
        const { token } = res.data;
        localStorage.setItem("token", token);
        setUser(res.data);
        setUserForm(initialState);
        push("/userHomePage");
      })
      .catch((err) => {
        console.error(err.message, err.response);
      });
    setLoggedState(true);
    localStorage.setItem("loggedState", true);
  };

  const handleChange = (e) => {
    e.persist();
    validateChange(e);
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <nav>
        <h1>Post Here: Subreddit - Predictor</h1>
        {<a href="https://theposthere.netlify.app/">Home</a>}
        {<a href="https://theposthere.netlify.app/about.html">About us</a>}
        <Link to={"/"}>Log In</Link>
        <Link to={"/signup"}>Sign Up</Link>
      </nav>

      <div className="signupTop">
        <h1 className="signuph1">SIGN UP</h1>
        <h4 className="signuph4">
          By having a Subreddit Predictor account, you can find the best
          subreddit for all of your awesome posts!.
        </h4>
      </div>

      <Form onSubmit={handleSubmit} style={{ width: "20%", margin: "0 auto" }}>
        <FormGroup>
          <Input
            type="text"
            name="FirstName"
            placeholder="First Name"
            id="FirstName"
            value={userForm.FirstName}
            onChange={handleChange}
          />
          {errors.FirstName.length > 0 ? (
            <p className="error">{errors.FirstName}</p>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="LastName"
            placeholder="Last Name"
            id="LastName"
            value={userForm.LastName}
            onChange={handleChange}
          />
          {errors.LastName.length > 0 ? (
            <p className="error">{errors.LastName}</p>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="Email"
            placeholder="Email"
            value={userForm.Email}
            onChange={handleChange}
            required
          />
          {errors.Email.length > 0 ? (
            <p className="error">{errors.Email}</p>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={userForm.password}
            onChange={handleChange}
            required
          />
          {errors.password.length > 0 ? (
            <p className="error">{errors.password}</p>
          ) : null}
        </FormGroup>

        <Button type="submit">Sign Up</Button>

        <div className="signupBottom">
          <h4 className="signuph4">
            Already a Redditor? <Link to="/">Log In</Link>
          </h4>
        </div>
      </Form>
    </>
  );
};

export default Signup;

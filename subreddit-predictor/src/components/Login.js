import React, { useState, useEffect, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Input, Button, FormGroup } from "reactstrap";
import { RedditContext } from "../contexts/RedditContext";
import * as yup from "yup";

const Login = () => {
  const initialState = {
    Email: "",
    password: "",
  };

  const [userForm, setUserForm] = useState(initialState);
  const [user, setUser] = useState([]);
  // const { setLoggedState } = useContext(RedditContext);
  const { push } = useHistory();
  const [errors, setErrors] = useState(initialState);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const loginSchema = yup.object().shape({
    Email: yup
      .string()
      .email("Must be a valid email address")
      .required("Must include email"),
    password: yup.string().required("Password is required").min(8),
  });

  const validateChange = (e) => {
    yup
      .reach(loginSchema, e.target.name)
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
      "checking to see if all values in form state follows the rules set in loginSchema"
    );
    loginSchema.isValid(userForm).then((valid) => {
      console.log("is form valid?", valid);
      setIsButtonDisabled(!valid);
    });
  }, [userForm]);

  const login = (e) => {
    console.log("login form submitted");
    e.preventDefault();
    axios
      .post("https://subreddit-post.herokuapp.com/api/auth/login", userForm)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        push("/userHomePage");
        setUser(res.data);
        console.log("successful API POST!");
        setUserForm(initialState);
      })
      .catch((err) => {
        console.error(err.message, err.response);
      });

    // setLoggedState(true);
    // localStorage.setItem("loggedState", true);
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
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>About</Link>
        <Link to={"/"}>Log In</Link>
        <Link to={"/signup"}>Sign Up</Link>
      </nav>

      <h1 className="loginh1">Log In</h1>
      <Form onSubmit={login} style={{ width: "20%", margin: "0 auto" }}>
        <FormGroup>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            id="email"
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

        <Button type="submit" disabled={isButtonDisabled}>
          Log In
        </Button>

        <div className="loginBottom">
          <h5>
            New to Reddit? <Link to="/signup">SIGN UP</Link>
          </h5>
        </div>
      </Form>
    </>
  );
};

export default Login;

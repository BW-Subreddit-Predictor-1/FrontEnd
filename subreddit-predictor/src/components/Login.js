import React, { useState, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Input, Button, FormGroup } from "reactstrap";
import { RedditContext } from "../contexts/RedditContext";
import * as yup from "yup";

const initialLoginState = {
  email: "",
  password: "",
};

const Login = (e) => {
  const [user, setUser] = useState(initialLoginState);
  const { setLoggedState } = useContext(RedditContext);
  const { push } = useHistory();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Not a valid email address")
      .min(2),
    // add .matches content
    password: yup.string().required("Password is required").matches().min(8),
  });

  const login = (e) => {
    schema.validate(user).then(() => {
      e.preventDefault();
      axiosWithAuth()
        .post("login", user)
        .then((res) => {
          localStorage.setItem("token", res.data.payload);
          push("/userHomePage");
        })
        .catch((error) => {
          console.log("Error loggin in!", error);
        });

      setLoggedState(true);
      localStorage.setItem("loggedState", true);
    });
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
            value={user.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
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
        {/* link button to userHomePage */}
        <Button type="submit" disabled={!user}>
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

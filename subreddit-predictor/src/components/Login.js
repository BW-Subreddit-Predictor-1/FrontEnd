import React, { useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
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
      <nav>
        <div>
          <h1>Post Here: Subreddit - Predictor</h1>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Log In</Link>
          <Link to="/">Sign Up</Link>
        </div>
      </nav>
      <div>
        <h1>LOG IN</h1>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            id="email"
            value={user.email}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
          <button type="submit">Log In</button>

          <h3>Forgot your email or password?</h3>
          <br />
          <h3>
            New to Reddit? <Link to="/">SIGN UP</Link>
          </h3>
        </form>
      </div>
    </>
  );
};

export default Login;

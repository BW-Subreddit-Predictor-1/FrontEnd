import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as yup from "yup";

const [login, setlogin] = useState({
  email: "",
  password: "",
});

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
      <form onSubmit={submit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value="login.email"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value="login.password"
          id="password"
          onChange={handleChange}
        />
        <button>Log In</button>

        <h3>Forgot your username or password?</h3>
        <br />
        <h3>New to Reddit? SIGN UP</h3>
      </form>
    </div>
  </>
);

export default Login;

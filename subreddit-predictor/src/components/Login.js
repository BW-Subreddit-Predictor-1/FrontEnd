import React, { useState, useContext } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
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
import { RedditContext } from '../contexts/RedditContext';
// import * as yup from "yup";

const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { setLoggedState } = useContext(RedditContext);
  const { push } = useHistory();

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('login', user)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        push('/userHomePage')
      })
      setLoggedState(true)
      localStorage.setItem('loggedState', true)
  }

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

<h1 className='loginh1'>Log In</h1>
      <Form onSubmit={login} style={{ width: "20%", margin: "0 auto" }}>
        
        <FormGroup>
          {/* left align text */}
      
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
        <Button type="submit" disabled={!user}>Log In</Button>

        <div className='loginBottom'>
             <h5>
          New to Reddit? <Link to="/signup">SIGN UP</Link>
        </h5>
        </div>
     
      </Form>
    </>
  );
};

export default Login;

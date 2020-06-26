import React, { useState, useContext, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Input, Button, FormGroup } from "reactstrap";
import { RedditContext } from "../contexts/RedditContext";
import * as yup from "yup";

const Login = () => {

  const initialState = {
    Email: '',
    password: ''
  }

  const [ user, setUser ] = useState(initialState);

  const { setLoggedState } = useContext(RedditContext);
  const { push } = useHistory();
  const [isButtonDisabled, setIsButtonDisabled ] = useState(true);
  const [ errors, setErrors ] = useState(initialState);

  const loginSchema = yup.object().shape({
    Email: yup.string().email().required('Enter an email').min(2),
    password: yup.string().required('Enter a valid password').min(2)
  })

  const validateLoginChange = e => {
    yup
      .reach(loginSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({...errors, [e.target.name] : ''})
      })
      .catch(err => {
        setErrors({...errors, [e.target.name]: err.errors[0]})
      })
  }

  useEffect(() => {
    loginSchema.isValid(user)
      .then(valid => {
        setIsButtonDisabled(!valid)
      })
  }, [user])

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/auth/login", user)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        push("/userHomePage");
      });
    setLoggedState(true);
    localStorage.setItem("loggedState", true);
  };

  const handleChange = (e) => {
    e.persist();
    validateLoginChange(e);
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
            name="Email"
            placeholder="Email"
            id="Email"
            value={user.Email}
            onChange={handleChange}
            required
          />
          {errors.Email.length > 0 ? <p className='error'>{errors.Email}</p> : null}
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
          {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}
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

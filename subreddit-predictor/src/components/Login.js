import React, { useState, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Input, Button, FormGroup } from "reactstrap";
import { RedditContext } from "../contexts/RedditContext";
import * as yup from "yup";

const Login = () => {
  const initialLoginState = {
    email: "",
    password: "",
  };

  const [userForm, setUserForm] = useState(initialLoginState);
  const [user, setUser] = useState([]);
  const { setLoggedState } = useContext(RedditContext);
  const { push } = useHistory();
  const [errors, setErrors] = useState(initialLoginState);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Must include email"),
    password: yup.string().required("Password is required").min(8),
  });

  const validateChange = (e) => {
    yup
      .reach(schema, e.target.email)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.email]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.email]: err.errors[0] });
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

  const login = (e) => {
    console.log("login form submitted");
    e.preventDefault();
    axiosWithAuth()
      .post("login", user)
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

    setLoggedState(true);
    localStorage.setItem("loggedState", true);
  };

  const handleChange = (e) => {
    e.persist();
    validateChange(e);
    setUserForm({ ...user, [e.target.email]: e.target.value });
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
            value={user.email}
            onChange={handleChange}
            required
          />
          {errors.email.length > 0 ? (
            <p className="error">{errors.email}</p>
          ) : null}
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

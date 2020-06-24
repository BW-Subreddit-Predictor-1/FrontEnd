import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import * as yup from "yup";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const Signup = (e) => {
  const [user, setUser] = useState(initialState);
  const schema = yup.object().shape({
    firstName: yup.string().required().min(2),
    lastName: yup.string().required().min(2),
    email: yup.string().required().min(2),
    password: yup.string().required().min(8),
    password_confirmation: yup.string().required().min(8),
  });

  const submitSignup = () => {
    schema.validate(user).then(() => {
      // install api inside of .post( , state) - get endpoint
      axios
        .post()
        .then((res) => {
          console.log(res.register, "You've just signed up");
        })

        // .catch complete code
        .catch((error) => {
          console.log("Error signing up!", error);
        });

      const handleSubmit = (e) => {
        console.log("form submitted");
        e.preventDefault();
        submitSignup();
        setUser(initialState);
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

          <div className="signupTop">
            <h1 className="signuph1">SIGN UP</h1>
            <h4 className="signuph4">
              By having a Subreddit account, you can join, vote, and comment on
              all your favorite Subreddit content.
            </h4>
          </div>

          <Form
            onSubmit={handleSubmit}
            style={{ width: "20%", margin: "0 auto" }}
          >
            <FormGroup>
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

            <div className="signupBottom">
              <h4 className="signuph4">
                Already a Redditor? <Link to="/">Log In</Link>
              </h4>
            </div>
          </Form>
        </>
      );
    });
  };
};

export default Signup;

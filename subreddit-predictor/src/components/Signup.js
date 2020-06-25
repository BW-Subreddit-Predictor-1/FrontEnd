import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FormGroup, Form, Input, Button } from "reactstrap";
import * as yup from "yup";

const Signup = () => {

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: ""
  }

  const [userForm, setUserForm] = useState(initialState);
  const [user, setUser] = useState([]);
  const [ errors, setErrors ] = useState(initialState);
  const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);

  const schema = yup.object().shape({
    firstName: yup.string().required('Enter your first name').min(2),
    lastName: yup.string().required('Enter your last name').min(2),
    email: yup.string().email().required('Enter an email').min(2),
    password: yup.string().required('Enter a valid password').min(8),
    password_confirmation: yup.string().required('Re-enter password').min(8)
  })

  const validateChange = e => {
    yup
      .reach(schema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({...errors, [e.target.name]: ''})
      })
      .catch(err => {
        setErrors({...errors, [e.target.name]: err.errors[0]})
      })
  };

  useEffect(() => {
    schema.isValid(userForm)
    .then(valid => {
        setIsButtonDisabled(!valid)
    })
  }, [userForm])

  const handleSubmit = (e) => {
    console.log("form submitted");
    e.preventDefault();
      axios
        .post('http://localhost:5000/api/users', userForm)
        .then(res => {
          setUser(res.data)
          setUserForm(initialState)
        })
        .catch(err => {
          console.error(err.message, err.response)
        })
  };

  const handleChange = (e) => {
    e.persist();
    validateChange(e);
    setUserForm({ ...user, [e.target.name]: e.target.value });
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
      
    
     <div className='signupTop'>
       <h1 className='signuph1'>SIGN UP</h1>
        <h4 className='signuph4'>
          By having a Subreddit account, you can join, vote, and comment on all
          your favorite Subreddit content.
        </h4>
     </div>
        
        <Form onSubmit={handleSubmit} style={{ width: "20%", margin: "0 auto" }}>
          <FormGroup>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              id="firstName"
              value={userForm.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName.length > 0 ? <p className="error">{errors.firstName}</p> : null}
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              id="lastName"
              value={userForm.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName.length > 0 ? <p className="error">{errors.lastName}</p> : null}
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="email"
              placeholder="Email"
              value={userForm.email}
              onChange={handleChange}
              required
            />
            {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
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
            {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password_confirmation"
              placeholder="Password Confirmation"
              id="password"
              value={userForm.password_confirmation}
              onChange={handleChange}
            />
            {errors.password_confirmation.length > 0 ? <p className="error">{errors.password_confirmation}</p> : null}
          </FormGroup>
          <Button type="submit" disabled={isButtonDisabled}>Sign Up</Button>

    <div className='signupBottom'>
       <h4 className='signuph4'>
            Already a Redditor? <Link to="/">Log In</Link>
          </h4>
    </div>
         
        </Form>
   
    </>
  );
};

export default Signup;

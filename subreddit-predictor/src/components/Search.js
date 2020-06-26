import React, { useState, useEffect } from "react";
import { Form, Input, Label, Button, Modal } from "reactstrap";
// import * as yup from "yup";
import axios from 'axios';

const Search = () => {

  const [search, setSearch ] = useState('');

  const handleChange = e => {
    setSearch({
      ...search, [e.target.name] : e.target.value
    })
  }

  const getPost = e => {
    e.preventDefault();
       axios
      .get(`https://localhost:5000/api/post/${search}`)
      .then(res => {
        setSearch(res.data)
      })
      .catch(err => {
        console.error(err.message, err.response)
      })
  }


  return (
    <>
      <Form style={{ width: "50%", margin: "0 auto" }}
        onSubmit={getPost}
      >
        <Input
          type="textarea"
          name="search"
          placeholder="Search for a post!"
          onChange={handleChange}
          restricted
        />
        <div className='spacer'></div>
        <Button className='searchButton' disabled={!search} onClick={Modal}>Search</Button>
      </Form>
    </>
  );
};
export default Search;

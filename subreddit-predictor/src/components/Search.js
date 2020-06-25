import React, { useState, useEffect } from "react";
import { Form, Input, Label, Button, Modal } from "reactstrap";
import axios from "axios";
import { SearchResults } from "./SearchResults.js";

const Search = (e) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const getPost = (e) => {
    e.preventDefault();
    axios
      .get(`https://localhost:5000/api/${search}`)
      .then((res) => {
        setSearch(res.data);
      })
      .catch((err) => {
        console.error(err.message, err.response);
      });
  };

  return (
    <>
      <Form style={{ width: "50%", margin: "0 auto" }} onSubmit={getPost}>
        <Label>
          Search
          <Input
            type="textarea"
            name="search"
            placeholder="Search subreddit posts..."
            onChange={handleChange}
            restricted
          />
        </Label>
        <div className="spacer"></div>
        <Button className="searchButton" disabled={!search} onClick={Modal}>
          Search
        </Button>
      </Form>
    </>
  );
};

export default Search;

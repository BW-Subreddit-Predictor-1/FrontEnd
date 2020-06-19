import React from "react";
import { Form, Input, Label, Button, Modal } from "reactstrap";
// import * as yup from "yup";

const Search = () => {
  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Label>Search</Label>
        <Input
          type="textarea"
          name="search"
          placeholder="Type what you wish to search..."
          value="searchData.search"
        />
        <Button onClick={Modal}>Search</Button>
      </Form>
    </>
  );
};
export default Search;

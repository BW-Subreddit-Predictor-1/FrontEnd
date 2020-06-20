import React from "react";
import { Form, Label, Input, Button, FormGroup } from "reactstrap";

const UserPost = () => {
  return (
    <>
      <Form>
        <FormGroup>
          <Label>Title</Label>
          <Input type="textarea" name="title" />
        </FormGroup>
        <FormGroup>
          <Label>Post</Label>
          <Input type="textarea" name="post" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </>
  );
};

export default UserPost;

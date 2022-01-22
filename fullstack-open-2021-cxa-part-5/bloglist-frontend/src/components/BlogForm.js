import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const addBlog = (event) => {
    event.preventDefault();

    createBlog(newBlog);

    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  const handleBlogChange = (event) => {
    setNewBlog((prevNewBlog) => ({
      ...prevNewBlog,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <Form className="m-3" onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleBlogChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleBlogChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>URL</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleBlogChange}
          />
        </Form.Group>

        <Button className="mt-2" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;

import React from "react";
import Togglable from "./Togglable";

import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div className="title-and-author">
        <Link to={`blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </Link>
      </div>
      <Togglable
        buttonShowId="button-togg-show"
        buttonLabelShow="show"
        buttonLabelHide="hide"
      >
        <div>{blog.url}</div>
        <div>{blog.user.username}</div>
      </Togglable>
    </div>
  );
};
export default Blog;

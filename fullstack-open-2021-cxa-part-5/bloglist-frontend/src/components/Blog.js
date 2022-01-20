import React from "react";
import Togglable from "./Togglable";

const Blog = ({ blog, updateBlogLikes, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const deleteConfirmation = (blogToDelete) => {
    return window.confirm("Delete blog?") ? deleteBlog(blogToDelete) : null;
  };

  return (
    <div className="blog" style={blogStyle}>
      <div className="title-and-author">
        {blog.title} by {blog.author}
      </div>
      <Togglable
        buttonShowId="button-togg-show"
        buttonLabelShow="show"
        buttonLabelHide="hide"
      >
        <div>{blog.url}</div>
        <div className="like">
          {blog.likes}
          <button
            id="button-like"
            type="submit"
            onClick={() => {
              updateBlogLikes(blog);
            }}
          >
            like
          </button>
        </div>
        <div>{blog.user.username}</div>
        {blog.user.username === user.username ? (
          <button
            id="button-delete"
            onClick={() => {
              deleteConfirmation(blog);
            }}
          >
            Delete
          </button>
        ) : (
          <div></div>
        )}
      </Togglable>
    </div>
  );
};
export default Blog;

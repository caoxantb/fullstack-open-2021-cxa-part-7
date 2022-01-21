import React from "react";

import { useDispatch } from "react-redux";

import {
  likeActionCreators,
  deleteActionCreators,
} from "../reducers/blogsReducer";

const UserView = ({ blogView, user }) => {
  const dispatch = useDispatch();

  const updateBlogLikes = (blog) => {
    dispatch(likeActionCreators(blog));
  };

  const deleteBlog = async (blog) => {
    dispatch(deleteActionCreators(blog));
  };

  const deleteConfirmation = (blogToDelete) => {
    return window.confirm("Delete blog?") ? deleteBlog(blogToDelete) : null;
  };

  return !blogView ? null : (
    <div>
      <h2>
        {blogView.title} by {blogView.author}
      </h2>
      <div>{blogView.url}</div>
      <div className="like">
        {blogView.likes}
        <button
          id="button-like"
          type="submit"
          onClick={() => {
            updateBlogLikes(blogView);
          }}
        >
          like
        </button>
      </div>
      {blogView.user.username === user.username ? (
        <button
          id="button-delete"
          onClick={() => {
            deleteConfirmation(blogView);
          }}
        >
          Delete
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default UserView;

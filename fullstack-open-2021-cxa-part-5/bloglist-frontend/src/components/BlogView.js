import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { useHistory } from "react-router";

import {
  likeActionCreators,
  deleteActionCreators,
  addCommentActionCreators,
} from "../reducers/blogsReducer";

const UserView = ({ blogView, user }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const updateBlogLikes = async (blog) => {
    dispatch(likeActionCreators(blog));
  };

  const addComment = (event, id, comm) => {
    event.preventDefault();
    dispatch(addCommentActionCreators(id, comm));
    setComment("");
  };

  const deleteBlog = async (blog) => {
    dispatch(deleteActionCreators(blog));
    history.push("/");
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
      <h3>comments</h3>
      <div>
        <form
          onSubmit={(event) =>
            addComment(event, blogView.id, { comment: comment })
          }
        >
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit">add comment</button>
        </form>
      </div>
      <ul>
        {blogView.comments.map((comm, i) => (
          <li key={`${blogView.id}comment${i}`}>{comm}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;

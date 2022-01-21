import React from "react";

const UserView = ({ userView }) => {
  return !userView ? null : (
    <div>
      <h2>{userView.name}</h2>
      <h3>added blogs</h3>
      {userView.blogs.map((blog) => (
        <div key={blog.id}>
          {blog.title} by {blog.author}
        </div>
      ))}
    </div>
  );
};

export default UserView;

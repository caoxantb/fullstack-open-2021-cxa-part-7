import React, { useState } from "react";

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
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id="title"
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleBlogChange}
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleBlogChange}
          />
        </div>
        <div>
          url
          <input
            id="url"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleBlogChange}
          />
        </div>
        <button id="button-submit-blog" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;

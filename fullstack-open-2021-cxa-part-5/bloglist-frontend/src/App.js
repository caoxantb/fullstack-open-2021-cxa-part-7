import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      setUser(parsedUser);
      blogService.setToken(parsedUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const credentials = { username, password };
      const loggedUser = await loginService.login(credentials);

      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

      blogService.setToken(loggedUser.token);

      setUser(loggedUser);
      setUsername("");
      setPassword("");
    } catch (ex) {
      setMessage("Wrong username or password");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const loginForm = (
    <div>
      <h2>Log in</h2>
      <h3 className="error">{message}</h3>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );

  const blogFormRef = useRef();

  const addBlog = async (newBlog) => {
    const createdBlog = await blogService.create(newBlog);
    setBlogs([...blogs, createdBlog]);

    blogFormRef.current.toggleVisibility();

    setMessage(
      `a new blog ${createdBlog.title} by ${createdBlog.author} added`
    );
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const updateBlogLikes = async (id) => {
    const blogToUpdate = blogs.find((b) => b.id === id);
    const updatedBlog = {
      ...blogToUpdate,
      user: blogToUpdate.user.id,
      likes: blogToUpdate.likes + 1,
    };

    await blogService.update(updatedBlog);
    setBlogs(
      blogs.map((b) =>
        b.id !== id ? b : { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      )
    );
  };

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id);
    await blogService.remove(blogToDelete);
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div>
      {user === null ? (
        loginForm
      ) : (
        <div>
          <div>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </div>
          <h2>create new blog</h2>
          <Togglable
            buttonShowId="button-togg-create-new-blog"
            buttonLabelShow="create new blog"
            buttonLabelHide="cancel"
            ref={blogFormRef}
          >
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <h2>blogs</h2>
          <h3>{message}</h3>
          {blogs
            .sort((a, b) => {
              return b.likes - a.likes;
            })
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlogLikes={updateBlogLikes}
                deleteBlog={deleteBlog}
                user={user}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;

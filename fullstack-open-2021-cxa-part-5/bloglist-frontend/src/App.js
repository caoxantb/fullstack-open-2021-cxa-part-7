import React, { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

import { useSelector, useDispatch } from "react-redux";

import { initializeNotiActionCreators } from "./reducers/notiReducer";
import {
  getBlogsActionCreators,
  addBlogActionCreators,
  likeActionCreators,
  deleteActionCreators,
} from "./reducers/blogReducer";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogs = useSelector((state) => state.blog);
  const noti = useSelector((state) => state.noti);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogsActionCreators());
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
      setUsername("");
      setPassword("");
      dispatch(
        initializeNotiActionCreators("Wrong username or password", 5000)
      );
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
      <h3 className="error">{noti}</h3>
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

  const addBlog = (newBlog) => {
    dispatch(addBlogActionCreators(newBlog));

    blogFormRef.current.toggleVisibility();

    dispatch(
      initializeNotiActionCreators(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        5000
      )
    );
  };

  const updateBlogLikes = (blog) => {
    dispatch(likeActionCreators(blog));
  };

  const deleteBlog = async (blog) => {
    dispatch(deleteActionCreators(blog));
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
          <h3>{noti}</h3>
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

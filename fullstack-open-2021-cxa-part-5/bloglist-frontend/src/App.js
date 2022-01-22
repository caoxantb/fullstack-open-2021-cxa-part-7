import React, { useState, useEffect, useRef } from "react";

import { Switch, Route, useRouteMatch, Link } from "react-router-dom";

import BlogView from "./components/BlogView";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import UserView from "./components/UserView";

import { useSelector, useDispatch } from "react-redux";

import { initializeNotiActionCreators } from "./reducers/notiReducer";
import {
  getBlogsActionCreators,
  addBlogActionCreators,
} from "./reducers/blogsReducer";

import {
  loginActionCreators,
  logoutActionCreators,
  parseActionCreators,
} from "./reducers/loginReducer";

import { Table, Form, Button } from "react-bootstrap";
import { Alert } from "@material-ui/lab";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);
  const noti = useSelector((state) => state.noti);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogsActionCreators());
  }, []);

  useEffect(() => {
    dispatch(parseActionCreators());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const credentials = { username, password };
      await dispatch(loginActionCreators(credentials));
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
    dispatch(logoutActionCreators());
  };

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

  const loginForm = (
    <div className="container">
      <h2 className="m-3">login</h2>
      {noti && (
        <Alert className="m-3" severity="error">
          {noti}
        </Alert>
      )}
      <Form className="m-3" onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Button className="mt-2" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );

  const userMatch = useRouteMatch("/users/:id");
  const userView = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null;

  const blogMatch = useRouteMatch("/blogs/:id");
  const blogView = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null;

  const navStyle = {
    padding: 5,
  };

  return (
    <div>
      {user === null ? (
        loginForm
      ) : (
        <div className="container">
          <div>
            <Link style={navStyle} to="/">
              blogs
            </Link>
            <Link style={navStyle} to="/users">
              users
            </Link>
            <span style={navStyle}>
              {user.name} logged in{" "}
              <button onClick={handleLogout}>logout</button>
            </span>
          </div>
          <Switch>
            <Route path="/users/:id">
              <UserView userView={userView} />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <BlogView blogView={blogView} user={user} />
            </Route>
            <Route path="/">
              <h2>create new blog</h2>
              <Togglable
                buttonShowId="button-togg-create-new-blog"
                buttonLabelShow="create new blog"
                buttonLabelHide="Cancel"
                ref={blogFormRef}
              >
                <BlogForm createBlog={addBlog} />
              </Togglable>
              <h2>blogs</h2>
              {noti && <Alert severity="success">{noti}</Alert>}
              <Table striped>
                <tbody>
                  {blogs
                    .sort((a, b) => {
                      return b.likes - a.likes;
                    })
                    .map((blog) => (
                      <tr key={blog.id}>
                        <td>
                          <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
                        </td>
                        <td>{blog.author}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
};

export default App;

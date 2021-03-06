import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getUsersActionCreators } from "../reducers/usersReducer";

import { Link } from "react-router-dom";

import { Table } from "react-bootstrap";

const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersActionCreators());
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => {
              return b.likes - a.likes;
            })
            .map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;

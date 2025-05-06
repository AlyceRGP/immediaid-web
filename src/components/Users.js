import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from "react-bootstrap";
import axios from 'axios';

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend API
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);  // Store the fetched users in state
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center pb-3">Users</h1>

      <Table striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0).reverse().map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.fullName}</td>
              <td>{user.username}</td>
              <td>{user.address}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

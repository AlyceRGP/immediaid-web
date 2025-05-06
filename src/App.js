import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navi } from './components/Navi';
import { Home } from './components/Home';
import { Users } from './components/Users';
import { Alerts } from './components/Alerts';
import { MakePost } from './components/MakePost';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const [postData, setPostData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (idToDelete) => {
    try {
      await fetch(`http://localhost:5000/api/posts/${idToDelete}`, {
        method: 'DELETE',
      });

      setPostData(prevPosts => prevPosts.filter(post => post._id !== idToDelete));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />

        <Route path="/" element={<Navi setLoggedIn={setLoggedIn} />}>
          <Route
            index
            element={
              <ProtectedRoute isLoggedIn={loggedIn}>
                <Home postData={postData} handleDelete={handleDelete} />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute isLoggedIn={loggedIn}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="alerts"
            element={
              <ProtectedRoute isLoggedIn={loggedIn}>
                <Alerts />
              </ProtectedRoute>
            }
          />
          <Route
            path="post"
            element={
              <ProtectedRoute isLoggedIn={loggedIn}>
                <MakePost setPostData={setPostData} />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export const Login = ({ setLoggedIn }) => {

    const [validated, setValidated] = useState(false);
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPass, setAdminPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); 
        const form = event.currentTarget;
      
        if (form.checkValidity() === false) {
          event.stopPropagation(); 
          setValidated(true);
          return;
        }
      
        setValidated(true);
      
        if (adminEmail === 'immediaid_admin@email.com' && adminPass === 'immediaid25') {
          setLoggedIn(true);
          navigate('/');
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          alert('Invalid credentials');
        }
      };      

    return (
        <div className="loginStyle">
            <h1 className="text-center">Immediaid Admin Login</h1>

            <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
                <Form.Group controlId="postTitle" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                />
                </Form.Group>

                <Form.Group controlId="postContent" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="Enter password"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                />
                </Form.Group>

                <div className="text-end">
                    <Button type="submit">Log In</Button>
                </div>
            </Form>
        </div>
    )
}
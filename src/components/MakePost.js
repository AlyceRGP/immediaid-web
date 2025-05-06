import React, { useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const MakePost = ({ setPostData }) => {
  const [validated, setValidated] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
  
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
  
    const currentDate = new Date().toLocaleString();
    const formData = new FormData();
    formData.append('title', postTitle);
    formData.append('content', postContent);
    formData.append('timestamp', currentDate);
    if (file) {
      formData.append('file', file);
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: formData
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Post successfully created!');
        window.location.reload();
        setPostData(prev => [...prev, result.post]);
        setValidated(false);
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting post.');
    }
  };  

  return (
    <div className="p-4">
      <h1 className="text-center">Create A Post</h1>

      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group controlId="postTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="postContent" className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            required
            as="textarea" rows={3}
            placeholder="Enter content"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile) {
                const validTypes = ['image/png', 'image/jpeg'];
                if (validTypes.includes(selectedFile.type)) {
                  setFile(selectedFile);
                } else {
                  alert('Only PNG and JPG files are allowed.');
                  e.target.value = null;
                  setFile(null);
                }
              }
            }}
          />
        </Form.Group>

        <div className="text-end">
            <Button type="submit">Post</Button>
        </div>
      </Form>
    </div>
  );
};

import React from 'react';
import { Card, Button } from 'react-bootstrap';

export const Home = ({ postData, handleDelete }) => {
  return (
    <div className="p-4 d-flex flex-column align-items-center">
      {postData.length > 0 ? (
        postData.map((post) => (
          <Card key={post._id} className="mt-4" style={{ width: '35rem' }}>
            {post.file && (
              <Card.Img
              variant="top"
              src={`http://localhost:5000/uploads/${post.file}`}
              alt="Post"
              />
            )}
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">{post.timestamp}</Card.Subtitle>
              <Card.Text>{post.content}</Card.Text>
              <div className="d-flex justify-content-center">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this post?')) {
                      handleDelete(post._id);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <h5 className="p-4 text-center">No news available.</h5>
      )}
    </div>
  );
};

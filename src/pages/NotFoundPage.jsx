import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Page Not Found</p>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
}

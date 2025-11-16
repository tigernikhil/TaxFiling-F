import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>ClearTax Clone</h1>
        </div>
        <nav className="nav">
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/filing')}>File Return</button>
          <button onClick={() => navigate('/documents')}>Documents</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </div>
    </header>
  );
}

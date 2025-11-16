import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="home-page">
      <header className="hero">
        <h1>File Your Income Tax Returns</h1>
        <p>Fast, Accurate, and Hassle-free ITR Filing</p>
        <button onClick={() => navigate('/register')}>Get Started</button>
      </header>
      <section className="features">
        <div className="feature">
          <h3>📊 Easy Filing</h3>
          <p>Step-by-step guided process</p>
        </div>
        <div className="feature">
          <h3>💰 Maximum Refund</h3>
          <p>Optimize your tax savings</p>
        </div>
        <div className="feature">
          <h3>🔒 Secure</h3>
          <p>Bank-level security</p>
        </div>
      </section>
    </div>
  );
}

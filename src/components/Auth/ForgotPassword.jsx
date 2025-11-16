import React, { useState } from 'react';
import { authAPI } from '../../services/api';
import Button from '../common/Button';
import Input from '../common/Input';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setMessage('Password reset link sent to your email');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset link</p>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" loading={loading}>
            Send Reset Link
          </Button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

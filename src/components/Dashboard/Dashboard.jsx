// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { returnsAPI } from '../../services/api';
import ReturnsList from './ReturnsList';

export default function Dashboard() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      const response = await returnsAPI.getAll();
      setReturns(response.data);
    } catch (err) {
      setError('Failed to fetch returns');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReturn = async () => {
    try {
      const response = await returnsAPI.create({ assessmentYear: '2024-25' });
      navigate(`/filing/${response.data.return._id}`);
    } catch (err) {
      setError('Failed to create return');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">ClearTax Clone</h1>
            <p className="text-gray-600">Welcome, {user.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Create New Return Button */}
        <div className="mb-8">
          <button
            onClick={handleCreateReturn}
            className="btn-primary text-lg"
          >
            + Create New Return
          </button>
        </div>

        {/* Returns List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading your returns...</p>
          </div>
        ) : returns.length === 0 ? (
          <div className="card text-center">
            <p className="text-gray-600 mb-4">No returns yet</p>
            <button
              onClick={handleCreateReturn}
              className="btn-primary"
            >
              Start Your First Return
            </button>
          </div>
        ) : (
          <ReturnsList returns={returns} onRefresh={fetchReturns} />
        )}
      </main>
    </div>
  );
}
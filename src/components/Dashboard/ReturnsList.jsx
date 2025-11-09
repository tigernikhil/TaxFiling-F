// src/components/Dashboard/ReturnsList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { returnsAPI } from '../../services/api';

export default function ReturnsList({ returns, onRefresh }) {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    const colors = {
      draft: 'bg-yellow-100 text-yellow-800',
      ready: 'bg-green-100 text-green-800',
      submitted: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleEdit = (id) => {
    navigate(`/filing/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this return?')) {
      try {
        await returnsAPI.delete(id);
        onRefresh();
      } catch (err) {
        alert('Failed to delete return');
      }
    }
  };

  return (
    <div className="grid gap-6">
      {returns.map((ret) => (
        <div key={ret._id} className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {ret.personalInfo?.name || 'New Return'}
              </h3>
              <p className="text-sm text-gray-600">
                Assessment Year: {ret.assessmentYear}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(ret.status)}`}>
              {ret.status.charAt(0).toUpperCase() + ret.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-gray-600">Income</p>
              <p className="text-lg font-semibold text-gray-800">
                ₹{(ret.incomeDetails?.salary || 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Total Tax</p>
              <p className="text-lg font-semibold text-gray-800">
                ₹{(ret.taxCalculationNewRegime?.totalTax || 0).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(ret._id)}
              className="btn-primary flex-1"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(ret._id)}
              className="btn-danger flex-1"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
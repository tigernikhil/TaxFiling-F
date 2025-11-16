import React, { useState, useEffect } from 'react';
import { returnsAPI } from '../../services/api';

export default function FilingHistory() {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      const { data } = await returnsAPI.getAll();
      setReturns(data);
    } catch (error) {
      console.error('Failed to fetch returns:', error);
    }
  };

  return (
    <div className="filing-history">
      <h3>Filing History</h3>
      <table>
        <thead>
          <tr>
            <th>Financial Year</th>
            <th>Status</th>
            <th>Filed On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {returns.map((ret) => (
            <tr key={ret._id}>
              <td>{ret.financialYear}</td>
              <td><span className={`status-${ret.status}`}>{ret.status}</span></td>
              <td>{new Date(ret.filedDate).toLocaleDateString()}</td>
              <td>
                <button>View</button>
                <button>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

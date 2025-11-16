import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import ReturnsList from '../components/Dashboard/ReturnsList';
import { calculationAPI } from '../services/api';

export default function DashboardPage() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      // Fetch tax returns
      setLoading(false);
    } catch (error) {
      console.error('Error fetching returns:', error);
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <Dashboard returns={returns} />
      <ReturnsList returns={returns} />
    </div>
  );
}

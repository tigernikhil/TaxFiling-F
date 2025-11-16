import React, { useState, useEffect } from 'react';
import { returnsAPI } from '../../services/api';
import StatsCard from './StatsCard';
import TaxSummaryWidget from './TaxSummaryWidget';
import UpcomingDeadlines from './UpcomingDeadlines';
import FilingHistory from './FilingHistory';
import QuickActions from './QuickActions';

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await returnsAPI.getDashboard();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-home">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <StatsCard title="Returns Filed" value={stats?.filed || 0} icon="📊" />
        <StatsCard title="Tax Saved" value={`₹${stats?.taxSaved || 0}`} icon="💰" />
        <StatsCard title="Documents" value={stats?.documents || 0} icon="📄" />
        <StatsCard title="Investments" value={stats?.investments || 0} icon="📈" />
      </div>
      <div className="dashboard-widgets">
        <TaxSummaryWidget />
        <UpcomingDeadlines />
      </div>
      <QuickActions />
      <FilingHistory />
    </div>
  );
}

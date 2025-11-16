import React, { useState, useEffect } from 'react';
import { investmentService } from '../services/investmentService';
import Button from '../components/common/Button';

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const data = await investmentService.getAll();
      setInvestments(data);
    } catch (error) {
      console.error('Failed to fetch investments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="investments-page">
      <h1>Investment Portfolio</h1>
      <Button onClick={() => {}}>Add Investment</Button>
      <div className="investments-list">
        {investments.map((inv) => (
          <div key={inv._id} className="investment-card">
            <h3>{inv.name}</h3>
            <p>Amount: ₹{inv.amount?.toLocaleString()}</p>
            <p>Category: {inv.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

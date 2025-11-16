import React, { useState, useEffect } from 'react';
import { calculationAPI } from '../../services/api';

export default function TaxSummaryWidget() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchTaxSummary();
  }, []);

  const fetchTaxSummary = async () => {
    try {
      const { data } = await calculationAPI.getSummary();
      setSummary(data);
    } catch (error) {
      console.error('Failed to fetch tax summary:', error);
    }
  };

  if (!summary) return null;

  return (
    <div className="tax-summary-widget">
      <h3>Tax Summary (FY 2023-24)</h3>
      <div className="summary-items">
        <div className="summary-item">
          <span>Gross Income:</span>
          <span>₹{summary.grossIncome?.toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span>Deductions:</span>
          <span>₹{summary.deductions?.toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span>Tax Payable:</span>
          <span className="highlight">₹{summary.taxPayable?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

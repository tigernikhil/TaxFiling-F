import React from 'react';

export default function IncomeSummary({ incomeData }) {
  const categories = [
    { label: 'Salary Income', value: incomeData?.salary || 0 },
    { label: 'House Property', value: incomeData?.houseProperty || 0 },
    { label: 'Capital Gains', value: incomeData?.capitalGains || 0 },
    { label: 'Business Income', value: incomeData?.business || 0 },
    { label: 'Other Sources', value: incomeData?.otherSources || 0 },
    { label: 'Agricultural Income', value: incomeData?.agricultural || 0 }
  ];

  const total = categories.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <div className="income-summary">
      <h3>Income Summary</h3>
      <div className="summary-table">
        {categories.map((cat, idx) => (
          <div key={idx} className="summary-row">
            <span className="label">{cat.label}:</span>
            <span className="value">₹{cat.value.toLocaleString()}</span>
          </div>
        ))}
        <div className="summary-row total">
          <span className="label">Total Gross Income:</span>
          <span className="value">₹{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

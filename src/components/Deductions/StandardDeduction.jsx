import React from 'react';

export default function StandardDeduction({ salaryIncome }) {
  const standardDeduction = 50000;
  const applicable = salaryIncome > 0;

  return (
    <div className="standard-deduction">
      <h3>Standard Deduction</h3>
      <p>Automatic deduction of ₹50,000 for salaried individuals and pensioners</p>

      <div className="deduction-card">
        <div className="row">
          <span>Salary Income:</span>
          <span>₹{salaryIncome?.toLocaleString() || 0}</span>
        </div>
        <div className="row highlight">
          <span>Standard Deduction:</span>
          <span>{applicable ? `₹${standardDeduction.toLocaleString()}` : 'N/A'}</span>
        </div>
      </div>

      {!applicable && (
        <p className="note">Standard deduction is not applicable as there is no salary income</p>
      )}
    </div>
  );
}

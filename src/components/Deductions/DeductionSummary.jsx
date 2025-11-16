import React from 'react';

export default function DeductionSummary({ deductionData }) {
  const sections = [
    { label: 'Section 80C', value: deductionData?.section80C || 0, limit: 150000 },
    { label: 'Section 80D', value: deductionData?.section80D || 0, limit: 50000 },
    { label: 'Section 80E', value: deductionData?.section80E || 0, limit: null },
    { label: 'Section 80G', value: deductionData?.section80G || 0, limit: null },
    { label: 'HRA Exemption', value: deductionData?.hra || 0, limit: null },
    { label: 'Standard Deduction', value: 50000, limit: 50000 }
  ];

  const total = sections.reduce((sum, sec) => sum + sec.value, 0);

  return (
    <div className="deduction-summary">
      <h3>Deduction Summary</h3>
      <div className="summary-table">
        {sections.map((sec, idx) => (
          <div key={idx} className="summary-row">
            <span className="label">{sec.label}:</span>
            <span className="value">
              ₹{sec.value.toLocaleString()}
              {sec.limit && sec.value > sec.limit && (
                <span className="exceeded"> (exceeds limit)</span>
              )}
            </span>
          </div>
        ))}
        <div className="summary-row total">
          <span className="label">Total Deductions:</span>
          <span className="value">₹{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

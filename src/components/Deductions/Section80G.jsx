import React, { useState } from 'react';

export default function Section80G({ data, onChange }) {
  const [deduction, setDeduction] = useState(data || {});

  const handleChange = (field, value) => {
    const updated = {...deduction, [field]: value};
    setDeduction(updated);
    onChange(updated);
  };

  const totalDonation = (deduction.fiftyPercent || 0) * 0.5 + (deduction.hundredPercent || 0);

  return (
    <div className="section-80g">
      <h3>Section 80G - Donations</h3>
      <div className="form-group">
        <label>Donations (50% Deductible)</label>
        <input type="number" value={deduction.fiftyPercent || ''} onChange={(e) => handleChange('fiftyPercent', parseFloat(e.target.value))} />
        <small>Deduction: ₹{((deduction.fiftyPercent || 0) * 0.5).toLocaleString()}</small>
      </div>
      <div className="form-group">
        <label>Donations (100% Deductible)</label>
        <input type="number" value={deduction.hundredPercent || ''} onChange={(e) => handleChange('hundredPercent', parseFloat(e.target.value))} />
        <small>Deduction: ₹{(deduction.hundredPercent || 0).toLocaleString()}</small>
      </div>
      <div className="total">
        <strong>Total Deduction: ₹{totalDonation.toLocaleString()}</strong>
      </div>
    </div>
  );
}

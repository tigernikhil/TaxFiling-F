import React, { useState } from 'react';

export default function Section80E({ data, onChange }) {
  const [deduction, setDeduction] = useState(data || {});

  const handleChange = (field, value) => {
    const updated = {...deduction, [field]: value};
    setDeduction(updated);
    onChange(updated);
  };

  return (
    <div className="section-80e">
      <h3>Section 80E - Education Loan Interest</h3>
      <div className="form-group">
        <label>Education Loan Interest Paid</label>
        <input type="number" value={deduction.interestPaid || ''} onChange={(e) => handleChange('interestPaid', parseFloat(e.target.value))} />
        <small>No limit - Full interest is deductible</small>
      </div>
      <div className="form-group">
        <label>Loan Purpose</label>
        <select value={deduction.loanPurpose || ''} onChange={(e) => handleChange('loanPurpose', e.target.value)}>
          <option>Higher Education</option>
          <option>Professional Course</option>
          <option>Research</option>
        </select>
      </div>
    </div>
  );
}

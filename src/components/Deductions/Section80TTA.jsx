import React, { useState } from 'react';
import Input from '../common/Input';

export default function Section80TTA({ value, onChange }) {
  const [interest, setInterest] = useState(value || 0);
  const maxDeduction = 10000;

  const handleChange = (val) => {
    const amount = parseFloat(val) || 0;
    setInterest(amount);
    const deduction = Math.min(amount, maxDeduction);
    if (onChange) onChange(deduction);
  };

  return (
    <div className="section-80tta">
      <h3>Section 80TTA - Interest on Savings</h3>
      <p>Deduction for interest earned on savings account (up to ₹10,000)</p>

      <Input
        label="Interest on Savings Account"
        type="number"
        value={interest}
        onChange={(e) => handleChange(e.target.value)}
        helperText="Interest from savings account with banks/post office"
      />

      <div className="deduction-info">
        <p>Eligible Deduction: <strong>₹{Math.min(interest, maxDeduction).toLocaleString()}</strong></p>
        {interest > maxDeduction && (
          <p className="note">Maximum deduction under 80TTA is ₹10,000</p>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Input from '../common/Input';

export default function OtherDeductions({ value, onChange }) {
  const [deductions, setDeductions] = useState(value || {});

  const handleChange = (field, val) => {
    const updated = { ...deductions, [field]: parseFloat(val) || 0 };
    setDeductions(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className="other-deductions">
      <h3>Other Deductions (Chapter VI-A)</h3>

      <Input
        label="Section 80CCC - Pension Plans"
        type="number"
        value={deductions.section80CCC || ''}
        onChange={(e) => handleChange('section80CCC', e.target.value)}
        helperText="Contribution to pension plans"
      />

      <Input
        label="Section 80CCD(1B) - NPS Additional"
        type="number"
        value={deductions.section80CCD1B || ''}
        onChange={(e) => handleChange('section80CCD1B', e.target.value)}
        helperText="Additional NPS contribution (up to ₹50,000)"
      />

      <Input
        label="Section 80EE - Home Loan Interest"
        type="number"
        value={deductions.section80EE || ''}
        onChange={(e) => handleChange('section80EE', e.target.value)}
        helperText="First-time home buyers (up to ₹50,000)"
      />

      <Input
        label="Section 80GG - Rent Paid (if no HRA)"
        type="number"
        value={deductions.section80GG || ''}
        onChange={(e) => handleChange('section80GG', e.target.value)}
      />

      <div className="total">
        <strong>Total Other Deductions: </strong>
        <span>₹{Object.values(deductions).reduce((a, b) => a + (b || 0), 0).toLocaleString()}</span>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Input from '../common/Input';

export default function ExemptedIncome({ value, onChange }) {
  const [exemptions, setExemptions] = useState(value || {});

  const handleChange = (field, val) => {
    const updated = { ...exemptions, [field]: parseFloat(val) || 0 };
    setExemptions(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className="exempted-income">
      <h3>Exempted Income</h3>
      <p>These incomes are not taxable but may need to be reported</p>

      <Input
        label="Agricultural Income"
        type="number"
        value={exemptions.agricultural || ''}
        onChange={(e) => handleChange('agricultural', e.target.value)}
        helperText="Income from agricultural land in India"
      />

      <Input
        label="Long-term Capital Gains on Listed Equity (up to ₹1 lakh)"
        type="number"
        value={exemptions.ltcgEquity || ''}
        onChange={(e) => handleChange('ltcgEquity', e.target.value)}
      />

      <Input
        label="Dividend Income (if STT paid)"
        type="number"
        value={exemptions.dividend || ''}
        onChange={(e) => handleChange('dividend', e.target.value)}
      />

      <Input
        label="Other Exempt Income"
        type="number"
        value={exemptions.other || ''}
        onChange={(e) => handleChange('other', e.target.value)}
      />

      <div className="total">
        <strong>Total Exempted Income: </strong>
        <span>₹{Object.values(exemptions).reduce((a, b) => a + (b || 0), 0).toLocaleString()}</span>
      </div>
    </div>
  );
}

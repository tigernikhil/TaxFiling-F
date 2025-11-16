import React, { useState } from 'react';

export default function AgriculturalIncome({ data, onChange }) {
  const [income, setIncome] = useState(data || {});

  const handleChange = (field, value) => {
    const updated = {...income, [field]: value};
    setIncome(updated);
    onChange(updated);
  };

  return (
    <div className="agricultural-income">
      <h3>Agricultural Income</h3>
      <div className="form-group">
        <label>Gross Agricultural Income</label>
        <input type="number" value={income.gross || ''} onChange={(e) => handleChange('gross', parseFloat(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Less: Expenses</label>
        <input type="number" value={income.expenses || ''} onChange={(e) => handleChange('expenses', parseFloat(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Net Agricultural Income</label>
        <div className="value">₹{((income.gross || 0) - (income.expenses || 0))}</div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Input from '../common/Input';

export default function AdvanceTax({ taxPayable, onChange }) {
  const [payments, setPayments] = useState({
    q1: 0, q2: 0, q3: 0, q4: 0
  });

  const handleChange = (quarter, value) => {
    const updated = { ...payments, [quarter]: parseFloat(value) || 0 };
    setPayments(updated);
    if (onChange) onChange(updated);
  };

  const totalPaid = Object.values(payments).reduce((a, b) => a + b, 0);

  return (
    <div className="advance-tax">
      <h3>Advance Tax Payments</h3>
      <div className="quarters">
        <Input label="Q1 (by 15 June)" type="number" value={payments.q1} 
               onChange={(e) => handleChange('q1', e.target.value)} />
        <Input label="Q2 (by 15 Sep)" type="number" value={payments.q2}
               onChange={(e) => handleChange('q2', e.target.value)} />
        <Input label="Q3 (by 15 Dec)" type="number" value={payments.q3}
               onChange={(e) => handleChange('q3', e.target.value)} />
        <Input label="Q4 (by 15 Mar)" type="number" value={payments.q4}
               onChange={(e) => handleChange('q4', e.target.value)} />
      </div>
      <div className="summary">
        <p>Total Advance Tax Paid: ₹{totalPaid.toLocaleString()}</p>
        <p>Tax Payable: ₹{taxPayable?.toLocaleString()}</p>
        <p className={totalPaid >= taxPayable ? 'success' : 'warning'}>
          {totalPaid >= taxPayable ? 'Fully Paid' : `Remaining: ₹${(taxPayable - totalPaid).toLocaleString()}`}
        </p>
      </div>
    </div>
  );
}

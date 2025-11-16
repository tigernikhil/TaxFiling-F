import React, { useState } from 'react';
import Input from '../common/Input';

export default function SelfAssessmentTax({ taxDue, advanceTaxPaid, tdsPaid, onChange }) {
  const [satAmount, setSatAmount] = useState(0);

  const totalPaid = (advanceTaxPaid || 0) + (tdsPaid || 0);
  const balanceDue = Math.max(0, (taxDue || 0) - totalPaid);

  return (
    <div className="self-assessment-tax">
      <h3>Self Assessment Tax</h3>
      <div className="calculation">
        <div className="row">
          <span>Total Tax Payable:</span>
          <span>₹{taxDue?.toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Less: Advance Tax Paid:</span>
          <span>₹{advanceTaxPaid?.toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Less: TDS:</span>
          <span>₹{tdsPaid?.toLocaleString()}</span>
        </div>
        <div className="row highlight">
          <span>Balance Due:</span>
          <span>₹{balanceDue.toLocaleString()}</span>
        </div>
      </div>
      {balanceDue > 0 && (
        <Input
          label="Self Assessment Tax to be Paid"
          type="number"
          value={satAmount}
          onChange={(e) => {
            setSatAmount(parseFloat(e.target.value) || 0);
            if (onChange) onChange(parseFloat(e.target.value) || 0);
          }}
          helperText="Pay before filing your return"
        />
      )}
    </div>
  );
}

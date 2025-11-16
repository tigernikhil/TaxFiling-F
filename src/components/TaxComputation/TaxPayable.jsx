import React from 'react';

export default function TaxPayable({ calculation }) {
  if (!calculation) return null;

  return (
    <div className="tax-payable">
      <h3>Tax Calculation</h3>
      <div className="calculation-details">
        <div className="row">
          <span>Gross Total Income:</span>
          <span>₹{calculation.grossIncome?.toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Less: Deductions:</span>
          <span>₹{calculation.deductions?.toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Taxable Income:</span>
          <span>₹{calculation.taxableIncome?.toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Income Tax:</span>
          <span>₹{calculation.incomeTax?.toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Surcharge:</span>
          <span>₹{calculation.surcharge?.toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Health & Education Cess (4%):</span>
          <span>₹{calculation.cess?.toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Less: Rebate u/s 87A:</span>
          <span>-₹{calculation.rebate?.toLocaleString()}</span>
        </div>
        <div className="row total">
          <span>Total Tax Payable:</span>
          <span>₹{calculation.totalTax?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

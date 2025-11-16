import React from 'react';

export default function NewRegimeTax({ data }) {
  if (!data) return null;

  return (
    <div className="new-regime-tax">
      <h3>New Tax Regime</h3>
      <div className="tax-breakdown">
        <div className="row">
          <span>Gross Income:</span>
          <span>₹{(data.grossIncome || 0).toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Standard Deduction:</span>
          <span>₹{(data.standardDeduction || 0).toLocaleString()}</span>
        </div>
        <div className="row font-bold">
          <span>Taxable Income:</span>
          <span>₹{(data.taxableIncome || 0).toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Income Tax:</span>
          <span>₹{(data.tax || 0).toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Surcharge:</span>
          <span>₹{(data.surcharge || 0).toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Cess:</span>
          <span>₹{(data.cess || 0).toLocaleString()}</span>
        </div>
        <div className="row text-green">
          <span>Rebate (87A):</span>
          <span>-₹{(data.rebate || 0).toLocaleString()}</span>
        </div>
        <div className="row font-bold text-red">
          <span>Total Tax:</span>
          <span>₹{(data.totalTax || 0).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

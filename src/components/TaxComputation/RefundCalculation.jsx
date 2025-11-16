import React from 'react';

export default function RefundCalculation({ taxData }) {
  const totalTax = taxData?.totalTax || 0;
  const totalTDS = taxData?.totalTDS || 0;
  const refund = Math.max(0, totalTDS - totalTax);

  return (
    <div className="refund-calculation">
      <h3>Refund/Tax Due</h3>
      <div className="calculation">
        <div className="row">
          <span>Total Tax Payable:</span>
          <span>₹{totalTax.toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Less: TDS Paid:</span>
          <span>-₹{totalTDS.toLocaleString()}</span>
        </div>
        <div className={`row font-bold ${refund > 0 ? 'text-green' : 'text-red'}`}>
          <span>{refund > 0 ? 'Refund Due:' : 'Tax Due:'}</span>
          <span>₹{Math.abs(refund).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

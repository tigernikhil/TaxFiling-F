import React from 'react';

export default function InterestCalculation({ filingDate, taxDue, advanceTaxPaid }) {
  const calculateInterest = () => {
    if (!filingDate || !taxDue) return { u234A: 0, u234B: 0, u234C: 0 };

    // Simplified interest calculation
    const dueDate = new Date('2024-07-31');
    const filed = new Date(filingDate);
    const monthsDelay = Math.max(0, Math.floor((filed - dueDate) / (30 * 24 * 60 * 60 * 1000)));

    const u234A = monthsDelay > 0 ? taxDue * 0.01 * monthsDelay : 0;
    const u234B = advanceTaxPaid < (taxDue * 0.9) ? taxDue * 0.01 : 0;
    const u234C = 0; // Requires detailed quarterly calculation

    return { u234A, u234B, u234C };
  };

  const interest = calculateInterest();
  const total = interest.u234A + interest.u234B + interest.u234C;

  return (
    <div className="interest-calculation">
      <h3>Interest Calculation</h3>
      <div className="interest-details">
        <div className="row">
          <span>Interest u/s 234A (Late Filing):</span>
          <span>₹{interest.u234A.toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Interest u/s 234B (Advance Tax Shortfall):</span>
          <span>₹{interest.u234B.toLocaleString()}</span>
        </div>
        <div className="row">
          <span>Interest u/s 234C (Deferment):</span>
          <span>₹{interest.u234C.toLocaleString()}</span>
        </div>
        <div className="row total">
          <span>Total Interest:</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

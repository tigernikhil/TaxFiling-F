import React, { useState } from 'react';

export default function ReviewPage() {
  return (
    <div className="review-page">
      <h1>Review Your Return</h1>
      <div className="review-sections">
        <section>
          <h2>Personal Information</h2>
          {/* Display personal info summary */}
        </section>
        <section>
          <h2>Income Summary</h2>
          {/* Display income summary */}
        </section>
        <section>
          <h2>Deductions Summary</h2>
          {/* Display deductions summary */}
        </section>
        <section>
          <h2>Tax Payable</h2>
          {/* Display tax calculation */}
        </section>
      </div>
      <button className="submit-btn">Submit Return</button>
    </div>
  );
}

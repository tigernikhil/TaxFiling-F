import React from 'react';

export default function FilingProgress({ currentStep, steps }) {
  const defaultSteps = [
    'Personal Info',
    'Income Details',
    'Deductions',
    'Tax Computation',
    'Schedules',
    'Review & Submit'
  ];

  const allSteps = steps || defaultSteps;
  const progress = ((currentStep + 1) / allSteps.length) * 100;

  return (
    <div className="filing-progress">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="steps">
        {allSteps.map((step, idx) => (
          <div 
            key={idx} 
            className={`step ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
          >
            <div className="step-number">
              {idx < currentStep ? '✓' : idx + 1}
            </div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

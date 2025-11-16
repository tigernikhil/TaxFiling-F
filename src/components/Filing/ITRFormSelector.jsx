import React, { useState, useEffect } from 'react';

export default function ITRFormSelector({ incomeData, onChange }) {
  const [selectedForm, setSelectedForm] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const form = determineITRForm(incomeData);
    setRecommendation(form);
    setSelectedForm(form.form);
    if (onChange) onChange(form.form);
  }, [incomeData]);

  const determineITRForm = (data) => {
    // ITR-1 (Sahaj)
    if (data.income?.total <= 5000000 &&
        !data.capitalGains &&
        !data.businessIncome &&
        !data.foreignIncome) {
      return { form: 'ITR-1', reason: 'Simple salary income' };
    }

    // ITR-2
    if (data.capitalGains || data.multipleSources) {
      return { form: 'ITR-2', reason: 'Capital gains or multiple income sources' };
    }

    // ITR-3
    if (data.businessIncome || data.professionalIncome) {
      return { form: 'ITR-3', reason: 'Business or professional income' };
    }

    // ITR-4 (Presumptive)
    if (data.presumptiveIncome) {
      return { form: 'ITR-4', reason: 'Presumptive taxation scheme' };
    }

    return { form: 'ITR-2', reason: 'General case' };
  };

  const forms = [
    { value: 'ITR-1', label: 'ITR-1 (Sahaj)', description: 'For salary, one house, other income' },
    { value: 'ITR-2', label: 'ITR-2', description: 'For capital gains, multiple properties' },
    { value: 'ITR-3', label: 'ITR-3', description: 'For business or professional income' },
    { value: 'ITR-4', label: 'ITR-4 (Sugam)', description: 'For presumptive income' }
  ];

  return (
    <div className="itr-form-selector">
      <h3>ITR Form Selection</h3>
      {recommendation && (
        <div className="recommendation">
          <strong>Recommended: {recommendation.form}</strong>
          <p>{recommendation.reason}</p>
        </div>
      )}
      <div className="form-options">
        {forms.map((form) => (
          <label key={form.value} className="form-option">
            <input
              type="radio"
              name="itrForm"
              value={form.value}
              checked={selectedForm === form.value}
              onChange={(e) => {
                setSelectedForm(e.target.value);
                if (onChange) onChange(e.target.value);
              }}
            />
            <div className="form-details">
              <strong>{form.label}</strong>
              <p>{form.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Section80C from '../components/Deductions/Section80C';
import Section80D from '../components/Deductions/Section80D';
import HRAExemption from '../components/Deductions/HRAExemption';

export default function DeductionsPage() {
  const [deductions, setDeductions] = useState({});
  const [activeTab, setActiveTab] = useState('80c');

  const tabs = [
    { id: '80c', label: 'Section 80C', component: Section80C },
    { id: '80d', label: 'Section 80D', component: Section80D },
    { id: 'hra', label: 'HRA Exemption', component: HRAExemption }
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component;

  return (
    <div className="deductions-page">
      <h1>Tax Deductions</h1>
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {ActiveComponent && (
          <ActiveComponent
            data={deductions[activeTab]}
            onChange={(data) => setDeductions({...deductions, [activeTab]: data})}
          />
        )}
      </div>
    </div>
  );
}

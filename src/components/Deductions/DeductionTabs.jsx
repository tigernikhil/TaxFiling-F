import React, { useState } from 'react';
import Section80C from './Section80C';
import Section80D from './Section80D';
import Section80E from './Section80E';
import Section80G from './Section80G';
import HRAExemption from './HRAExemption';

export default function DeductionTabs({ data, onChange }) {
  const [activeTab, setActiveTab] = useState('80c');

  const tabs = [
    { id: '80c', label: '80C', component: Section80C },
    { id: '80d', label: '80D', component: Section80D },
    { id: '80e', label: '80E', component: Section80E },
    { id: '80g', label: '80G', component: Section80G },
    { id: 'hra', label: 'HRA', component: HRAExemption }
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component;

  return (
    <div className="deduction-tabs">
      <div className="tab-buttons">
        {tabs.map(tab => (
          <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {ActiveComponent && <ActiveComponent data={data[activeTab]} onChange={(d) => onChange({...data, [activeTab]: d})} />}
      </div>
    </div>
  );
}

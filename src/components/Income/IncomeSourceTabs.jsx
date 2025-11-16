import React, { useState } from 'react';
import SalaryIncome from './SalaryIncome';
import HouseProperty from './HouseProperty';
import CapitalGains from './CapitalGains';
import BusinessIncome from './BusinessIncome';
import OtherSources from './OtherSources';
import AgriculturalIncome from './AgriculturalIncome';

export default function IncomeSourceTabs({ data, onChange }) {
  const [activeTab, setActiveTab] = useState('salary');

  const tabs = [
    { id: 'salary', label: 'Salary', component: SalaryIncome },
    { id: 'property', label: 'House Property', component: HouseProperty },
    { id: 'capital', label: 'Capital Gains', component: CapitalGains },
    { id: 'business', label: 'Business', component: BusinessIncome },
    { id: 'other', label: 'Other Sources', component: OtherSources },
    { id: 'agricultural', label: 'Agricultural', component: AgriculturalIncome }
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component;

  return (
    <div className="income-tabs">
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

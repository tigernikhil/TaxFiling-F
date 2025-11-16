import React, { useState } from 'react';
import SalaryIncome from '../components/Income/SalaryIncome';
import HouseProperty from '../components/Income/HouseProperty';
import CapitalGains from '../components/Income/CapitalGains';
import BusinessIncome from '../components/Income/BusinessIncome';
import OtherSources from '../components/Income/OtherSources';
import AgriculturalIncome from '../components/Income/AgriculturalIncome';
import IncomeSummary from '../components/Income/IncomeSummary';

export default function IncomePage() {
  const [incomeData, setIncomeData] = useState({});
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
    <div className="income-page">
      <h1>Income Details</h1>
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
            data={incomeData[activeTab]}
            onChange={(data) => setIncomeData({...incomeData, [activeTab]: data})}
          />
        )}
      </div>
      <IncomeSummary incomeData={incomeData} />
    </div>
  );
}

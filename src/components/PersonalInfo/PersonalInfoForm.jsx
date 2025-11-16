import React, { useState, useEffect } from 'react';
import BasicDetails from './BasicDetails';
import ContactDetails from './ContactDetails';
import PanAadhaarCard from './PanAadhaarCard';
import AddressManager from './AddressManager';
import ResidentialStatus from './ResidentialStatus';
import BankAccountManager from './BankAccountManager';

export default function PersonalInfoForm({ returnData, onSave, prefillData }) {
  const [formData, setFormData] = useState({
    personalInfo: {},
    addresses: [],
    bankAccounts: [],
    residentialStatus: {}
  });

  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (prefillData) {
      setFormData(prev => ({
        ...prev,
        personalInfo: prefillData.personalInfo || {},
        addresses: prefillData.address ? [prefillData.address] : [],
        bankDetails: prefillData.bankDetails || {},
        residentialStatus: prefillData.residentialStatus || {}
      }));
    }
  }, [prefillData]);

  const handleSave = () => {
    onSave(formData);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Details', icon: '👤' },
    { id: 'contact', label: 'Contact', icon: '📞' },
    { id: 'identity', label: 'Identity', icon: '🆔' },
    { id: 'address', label: 'Address', icon: '🏠' },
    { id: 'residency', label: 'Residency', icon: '🌍' },
    { id: 'bank', label: 'Bank', icon: '🏦' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

      {/* Tabs */}
      <div className="flex border-b mb-6 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mb-6">
        {activeTab === 'basic' && (
          <BasicDetails 
            data={formData.personalInfo}
            onChange={(data) => setFormData({...formData, personalInfo: data})}
          />
        )}
        {activeTab === 'contact' && (
          <ContactDetails 
            data={formData.personalInfo}
            onChange={(data) => setFormData({...formData, personalInfo: data})}
          />
        )}
        {activeTab === 'identity' && (
          <PanAadhaarCard 
            data={formData.personalInfo}
            onChange={(data) => setFormData({...formData, personalInfo: data})}
          />
        )}
        {activeTab === 'address' && (
          <AddressManager 
            addresses={formData.addresses}
            onChange={(addresses) => setFormData({...formData, addresses})}
          />
        )}
        {activeTab === 'residency' && (
          <ResidentialStatus 
            data={formData.residentialStatus}
            onChange={(data) => setFormData({...formData, residentialStatus: data})}
          />
        )}
        {activeTab === 'bank' && (
          <BankAccountManager 
            accounts={formData.bankAccounts}
            onChange={(accounts) => setFormData({...formData, bankAccounts: accounts})}
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

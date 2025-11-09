// src/components/Filing/ManualEntry.jsx
import React, { useState, useEffect } from 'react';
import { returnsAPI } from '../../services/api';

export default function ManualEntry({ returnId, onNext, defaultValues, onFormChange  }) {
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      pan: '',
      dob: '',
      aadhaar: '',
      address: '',
      phone: '',
      email: ''
    },
    incomeDetails: {
      salary: 0,
      housePropertyIncome: 0,
      capitalGains: 0,
      otherSources: 0
    },
    taxCredits: {
      tdsSalary: 0,
      tdsOtherSources: 0,
      advanceTax: 0
    },
    deductions: {
      section80C: 0,
      section80D: 0,
      section80E: 0,
      section80G: 0,
      section80CCD: 0
    },
    refundDetails: {
      accountHolder: '',
      accountNumber: '',
      ifscCode: '',
      bankName: ''
    }
  });

  useEffect(() => {
  if (defaultValues) {
    setFormData(defaultValues);
  }
}, [defaultValues]);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = isNaN(value) ? value : parseInt(value);
      onFormChange?.(newData);
      return newData;
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');

    try {
      await returnsAPI.update(returnId, formData);
      if (step < 5) {
        setStep(step + 1);
      } else {
        onNext(formData);
      }
    } catch (err) {
      setError('Failed to save form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {step === 1 && 'Personal Information'}
          {step === 2 && 'Income Details'}
          {step === 3 && 'Tax Credits'}
          {step === 4 && 'Deductions'}
          {step === 5 && 'Refund Details'}
        </h2>
        <div className="w-full bg-gray-200 rounded h-2">
          <div className="bg-blue-600 h-2 rounded" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Step 1: Personal Information */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="personalInfo.name"
              value={formData.personalInfo.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">PAN</label>
            <input
              type="text"
              name="personalInfo.pan"
              value={formData.personalInfo.pan}
              onChange={handleInputChange}
              placeholder="ABCDE1234F"
              className="form-input"
              maxLength="10"
            />
          </div>
          <div>
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="personalInfo.dob"
              value={formData.personalInfo.dob}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Address</label>
            <textarea
              name="personalInfo.address"
              value={formData.personalInfo.address}
              onChange={handleInputChange}
              placeholder="Your address"
              className="form-input"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              name="personalInfo.email"
              value={formData.personalInfo.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className="form-input"
            />
          </div>
        </div>
      )}

      {/* Step 2: Income Details */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="form-label">Salary Income (₹)</label>
            <input
              type="number"
              name="incomeDetails.salary"
              value={formData.incomeDetails.salary}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">House Property Income (₹)</label>
            <input
              type="number"
              name="incomeDetails.housePropertyIncome"
              value={formData.incomeDetails.housePropertyIncome}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Capital Gains (₹)</label>
            <input
              type="number"
              name="incomeDetails.capitalGains"
              value={formData.incomeDetails.capitalGains}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Other Sources (₹)</label>
            <input
              type="number"
              name="incomeDetails.otherSources"
              value={formData.incomeDetails.otherSources}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>
      )}

      {/* Step 3: Tax Credits */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className="form-label">TDS on Salary (₹)</label>
            <input
              type="number"
              name="taxCredits.tdsSalary"
              value={formData.taxCredits.tdsSalary}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">TDS on Other Sources (₹)</label>
            <input
              type="number"
              name="taxCredits.tdsOtherSources"
              value={formData.taxCredits.tdsOtherSources}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Advance Tax Paid (₹)</label>
            <input
              type="number"
              name="taxCredits.advanceTax"
              value={formData.taxCredits.advanceTax}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>
      )}

      {/* Step 4: Deductions */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <label className="form-label">Section 80C (₹) - Max: ₹1,50,000</label>
            <input
              type="number"
              name="deductions.section80C"
              value={formData.deductions.section80C}
              onChange={handleInputChange}
              max="150000"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Section 80D - Medical Insurance (₹)</label>
            <input
              type="number"
              name="deductions.section80D"
              value={formData.deductions.section80D}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Section 80E - Education Loan (₹)</label>
            <input
              type="number"
              name="deductions.section80E"
              value={formData.deductions.section80E}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Section 80CCD - Pension (₹)</label>
            <input
              type="number"
              name="deductions.section80CCD"
              value={formData.deductions.section80CCD}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>
      )}

      {/* Step 5: Refund Details */}
      {step === 5 && (
        <div className="space-y-4">
          <div>
            <label className="form-label">Account Holder Name</label>
            <input
              type="text"
              name="refundDetails.accountHolder"
              value={formData.refundDetails.accountHolder}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Account Number</label>
            <input
              type="text"
              name="refundDetails.accountNumber"
              value={formData.refundDetails.accountNumber}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">IFSC Code</label>
            <input
              type="text"
              name="refundDetails.ifscCode"
              value={formData.refundDetails.ifscCode}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Bank Name</label>
            <input
              type="text"
              name="refundDetails.bankName"
              value={formData.refundDetails.bankName}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => step > 1 && setStep(step - 1)}
          disabled={step === 1}
          className="btn-secondary disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? 'Saving...' : step === 5 ? 'Calculate Tax' : 'Next'}
        </button>
      </div>
    </div>
  );
}
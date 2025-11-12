// src/components/Filing/ManualEntry.jsx
import React, { useState, useEffect } from 'react';
import { returnsAPI } from '../../services/api';

// Merge helper: shallow merge only known sections and convert numeric strings
function mergeValues(target, source) {
  if (!source) return target;
  const out = { ...target };
  for (const key of Object.keys(source)) {
    const val = source[key];
    if (val === undefined || val === null) continue;
    // If it's an object and both are objects, merge shallowly
    if (typeof val === 'object' && !Array.isArray(val) && typeof out[key] === 'object') {
      out[key] = { ...out[key], ...val };
    } else {
      out[key] = val;
    }
  }
  return out;
}

export default function ManualEntry({ returnId, onNext, defaultValues, onFormChange, extractedData }) {
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
      employerName: '',
      employerPAN: '',
      salary: 0,
      taxableSalary: 0,
      exemptAllowances: 0,
      professionalTax: 0,
      housePropertyIncome: 0,
      capitalGains: 0,
      otherSources: 0,
      bankInterest: 0
    },
    taxCredits: {
      tdsSalary: 0,
      tdsOtherSources: 0,
      advanceTax: 0,
      selfAssessmentTax: 0
    },
    deductions: {
      section80C: 0,
      section80D: 0,
      section80E: 0,
      section80G: 0,
      section80CCD: 0,
      section80U: 0,
      section80TTA: 0,
      section80TTB: 0,
      otherDeductions: 0
    },
    refundDetails: {
      accountHolder: '',
      accountNumber: '',
      ifscCode: '',
      bankName: ''
    }
  });

  // Apply server default values (existing saved return)
  useEffect(() => {
    if (defaultValues) {
      // Only copy known sections to avoid overwriting other server fields
      setFormData(prev => {
        const merged = { ...prev };
        if (defaultValues.personalInfo) merged.personalInfo = mergeValues(merged.personalInfo, defaultValues.personalInfo);
        if (defaultValues.incomeDetails) merged.incomeDetails = mergeValues(merged.incomeDetails, defaultValues.incomeDetails);
        if (defaultValues.taxCredits) merged.taxCredits = mergeValues(merged.taxCredits, defaultValues.taxCredits);
        if (defaultValues.deductions) merged.deductions = mergeValues(merged.deductions, defaultValues.deductions);
        if (defaultValues.refundDetails) merged.refundDetails = mergeValues(merged.refundDetails, defaultValues.refundDetails);
        return merged;
      });
    }
  }, [defaultValues]);

  // When extractedData is provided (from upload), map common fields into the manual form
  useEffect(() => {
    if (!extractedData) return;

    setFormData(prev => {
      const next = { ...prev };

      // Personal info
      if (extractedData.personalInfo) {
        next.personalInfo = mergeValues(next.personalInfo, extractedData.personalInfo);
      }

      // Income mapping: either top-level income or extractedData.income
      const incomeSrc = extractedData.income || extractedData.incomeDetails || extractedData;
      if (incomeSrc) {
        const incomeMap = {};
        if (incomeSrc.salary !== undefined) incomeMap.salary = Number(incomeSrc.salary) || 0;
        if (incomeSrc.taxableSalary !== undefined) incomeMap.taxableSalary = Number(incomeSrc.taxableSalary) || incomeMap.salary || 0;
        if (incomeSrc.capitalGains !== undefined) incomeMap.capitalGains = Number(incomeSrc.capitalGains) || 0;
        if (incomeSrc.otherSources !== undefined) incomeMap.otherSources = Number(incomeSrc.otherSources) || 0;
        if (incomeSrc.housePropertyIncome !== undefined) incomeMap.housePropertyIncome = Number(incomeSrc.housePropertyIncome) || 0;
        if (incomeSrc.bankInterest !== undefined) incomeMap.bankInterest = Number(incomeSrc.bankInterest) || 0;
        if (incomeSrc.employerName) incomeMap.employerName = incomeSrc.employerName;
        if (incomeSrc.employerPAN) incomeMap.employerPAN = incomeSrc.employerPAN;
        next.incomeDetails = mergeValues(next.incomeDetails, incomeMap);
      }

      // Tax credits / TDS
      if (extractedData.taxCredits) {
        const tc = {};
        if (extractedData.taxCredits.tdsSalary !== undefined) tc.tdsSalary = Number(extractedData.taxCredits.tdsSalary) || 0;
        if (extractedData.taxCredits.tdsOtherSources !== undefined) tc.tdsOtherSources = Number(extractedData.taxCredits.tdsOtherSources) || 0;
        if (extractedData.taxCredits.advanceTax !== undefined) tc.advanceTax = Number(extractedData.taxCredits.advanceTax) || 0;
        next.taxCredits = mergeValues(next.taxCredits, tc);
      }

      // Deductions
      if (extractedData.deductions) {
        next.deductions = mergeValues(next.deductions, extractedData.deductions);
      }

      // Refund / bank
      if (extractedData.refundDetails) {
        next.refundDetails = mergeValues(next.refundDetails, extractedData.refundDetails);
      }

      // Some upload endpoints return a flat extractedData.personalInfo / incomeDetails inside response.extractedData
      // Additionally, if uploadedFiles array exists on server defaultValues, prefer that too (handled by defaultValues useEffect)

      return next;
    });
  }, [extractedData]);

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
      // if numeric field, convert
      const finalKey = keys[keys.length - 1];
      const isNumber = e.target.type === 'number';
      current[finalKey] = isNumber ? (value === '' ? '' : Number(value)) : value;
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
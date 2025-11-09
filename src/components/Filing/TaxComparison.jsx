// src/components/Filing/TaxComparison.jsx
import React, { useState, useEffect } from 'react';
import { returnsAPI } from '../../services/api';

export default function TaxComparison({ returnId, formData, onNext }) {
  const [taxData, setTaxData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chosenRegime, setChosenRegime] = useState('new');

  useEffect(() => {
    calculateTax();
  }, []);

  const calculateTax = async () => {
    setLoading(true);
    try {
      const response = await returnsAPI.calculateTax(returnId);
      setTaxData(response.data);
    } catch (err) {
      setError('Failed to calculate tax');
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = async () => {
    try {
      await returnsAPI.update(returnId, { chosenRegime });
      onNext();
    } catch (err) {
      setError('Failed to save regime choice');
    }
  };

  if (loading) {
    return <div className="text-center py-12"><p>Calculating tax...</p></div>;
  }

  if (!taxData) {
    return <div className="text-center py-12"><p>No tax data available</p></div>;
  }

  const newRegime = taxData.newRegime;
  const oldRegime = taxData.oldRegime;
  const comparison = taxData.comparison;

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Comparison Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Tax Comparison</h2>
        <p className="text-blue-100">Choose the regime that saves you the most tax</p>
      </div>

      {/* Savings Highlight */}
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
        <p className="text-gray-700 mb-2">You can save</p>
        <h3 className="text-4xl font-bold text-green-600 mb-2">
          ₹{comparison.savings.toLocaleString()}
        </h3>
        <p className="text-gray-700">
          by choosing <span className="font-semibold">{comparison.recommendation === 'new' ? 'New' : 'Old'} Regime</span>
          ({comparison.savingsPercentage}% savings)
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* New Regime Card */}
        <div className={`card border-2 cursor-pointer transition ${
          chosenRegime === 'new' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
        }`}
          onClick={() => setChosenRegime('new')}
        >
          <div className="flex items-center mb-4">
            <input
              type="radio"
              name="regime"
              value="new"
              checked={chosenRegime === 'new'}
              onChange={(e) => setChosenRegime(e.target.value)}
              className="mr-3 w-4 h-4"
            />
            <h3 className="text-xl font-bold text-gray-800">New Regime</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Income:</span>
              <span className="font-semibold">₹{newRegime.totalIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gross Income:</span>
              <span className="font-semibold">₹{newRegime.grossTotalIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Standard Deduction:</span>
              <span className="font-semibold">-₹{newRegime.standardDeduction.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="text-gray-600">Taxable Income:</span>
              <span className="font-semibold">₹{newRegime.taxableIncome.toLocaleString()}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span>₹{newRegime.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Surcharge:</span>
                <span>₹{newRegime.surcharge.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cess (4%):</span>
                <span>₹{newRegime.cess.toLocaleString()}</span>
              </div>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total Tax:</span>
              <span className="text-red-600">₹{newRegime.totalTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600 font-semibold">
              <span>Less: TDS:</span>
              <span>-₹{newRegime.tdsCredited.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Refund/Payable:</span>
              <span className={newRegime.refundDue > 0 ? 'text-green-600' : 'text-red-600'}>
                {newRegime.refundDue > 0 ? '+' : ''}₹{(newRegime.refundDue || newRegime.taxPayable).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Old Regime Card */}
        <div className={`card border-2 cursor-pointer transition ${
          chosenRegime === 'old' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
        }`}
          onClick={() => setChosenRegime('old')}
        >
          <div className="flex items-center mb-4">
            <input
              type="radio"
              name="regime"
              value="old"
              checked={chosenRegime === 'old'}
              onChange={(e) => setChosenRegime(e.target.value)}
              className="mr-3 w-4 h-4"
            />
            <h3 className="text-xl font-bold text-gray-800">Old Regime</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Income:</span>
              <span className="font-semibold">₹{oldRegime.totalIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gross Income:</span>
              <span className="font-semibold">₹{oldRegime.grossTotalIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Deductions:</span>
              <span className="font-semibold">-₹{oldRegime.deductionsTotal.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="text-gray-600">Taxable Income:</span>
              <span className="font-semibold">₹{oldRegime.taxableIncome.toLocaleString()}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span>₹{oldRegime.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Surcharge:</span>
                <span>₹{oldRegime.surcharge.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cess (4%):</span>
                <span>₹{oldRegime.cess.toLocaleString()}</span>
              </div>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total Tax:</span>
              <span className="text-red-600">₹{oldRegime.totalTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600 font-semibold">
              <span>Less: TDS:</span>
              <span>-₹{oldRegime.tdsCredited.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Refund/Payable:</span>
              <span className={oldRegime.refundDue > 0 ? 'text-green-600' : 'text-red-600'}>
                {oldRegime.refundDue > 0 ? '+' : ''}₹{(oldRegime.refundDue || oldRegime.taxPayable).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Proceed Button */}
      <button
        onClick={handleProceed}
        className="btn-primary w-full py-3 text-lg"
      >
        Proceed to Download JSON
      </button>
    </div>
  );
}
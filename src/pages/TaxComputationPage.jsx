import React, { useState } from 'react';
import TaxComparison from '../components/Filing/TaxComparison';
import { useCalculation } from '../hooks/useCalculation';

export default function TaxComputationPage() {
  const [incomeData, setIncomeData] = useState({});
  const [deductionData, setDeductionData] = useState({});
  const { calculateTaxComparison, result, loading } = useCalculation();

  const handleCalculate = async () => {
    await calculateTaxComparison(incomeData, deductionData);
  };

  return (
    <div className="tax-computation-page">
      <h1>Tax Calculation & Comparison</h1>
      <button onClick={handleCalculate} disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate Tax'}
      </button>
      {result && <TaxComparison {...result} />}
    </div>
  );
}

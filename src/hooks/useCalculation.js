import { useState, useCallback } from 'react';
import { calculationAPI } from '../services/api';

/**
 * Hook for tax calculation operations
 */
export function useCalculation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const calculateTaxComparison = useCallback(async (incomeData, deductionData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await calculationAPI.compareTax(incomeData, deductionData);
      setResult(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const selectITRForm = useCallback(async (incomeData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await calculationAPI.selectITRForm(incomeData);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    calculateTaxComparison,
    selectITRForm,
    loading,
    error,
    result
  };
}

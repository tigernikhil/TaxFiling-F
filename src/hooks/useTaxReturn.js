import { useState, useEffect } from 'react';
import { taxReturnService } from '../services/taxReturnService';

export function useTaxReturn(returnId) {
  const [taxReturn, setTaxReturn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (returnId) {
      fetchTaxReturn();
    }
  }, [returnId]);

  const fetchTaxReturn = async () => {
    try {
      setLoading(true);
      const data = await taxReturnService.getById(returnId);
      setTaxReturn(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTaxReturn = async (data) => {
    try {
      const updated = await taxReturnService.update(returnId, data);
      setTaxReturn(updated);
      return updated;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return { taxReturn, loading, error, updateTaxReturn, refetch: fetchTaxReturn };
}

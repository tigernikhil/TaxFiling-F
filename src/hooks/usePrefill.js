import { useState } from 'react';
import { prefillService } from '../services/prefillService';

export function usePrefill(returnId) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const prefillFromHTML = async (file) => {
    try {
      setLoading(true);
      const result = await prefillService.prefillFromHTML(returnId, file);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const confirmPrefill = async (data) => {
    try {
      setLoading(true);
      const result = await prefillService.confirmPrefill(returnId, data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, prefillFromHTML, confirmPrefill };
}

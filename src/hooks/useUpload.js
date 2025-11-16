import { useState, useCallback } from 'react';
import { documentAPI } from '../services/api';

/**
 * Hook for document upload operations
 */
export function useUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const uploadDocument = useCallback(async (file, documentType, financialYear) => {
    setLoading(true);
    setError(null);
    setProgress(0);

    try {
      const response = await documentAPI.upload(file, documentType, financialYear);
      setProgress(100);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadHTML = useCallback(async (htmlFile) => {
    setLoading(true);
    setError(null);
    try {
      const response = await documentAPI.uploadHTML(htmlFile);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    uploadDocument,
    uploadHTML,
    loading,
    error,
    progress
  };
}

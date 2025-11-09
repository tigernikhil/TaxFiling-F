import React, { useState, useEffect } from 'react';
import { returnsAPI } from '../../services/api';
import ManualEntry from './ManualEntry';
import DocumentUploader from './DocumentUploader';
import { useParams, useNavigate } from 'react-router-dom';

function ManualEntryWrapper() {
  const { returnId } = useParams();
  const navigate = useNavigate();
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    async function fetchReturn() {
      const response = await returnsAPI.getOne(returnId);
      setDefaultData(response.data);
    }
    fetchReturn();
  }, [returnId]);

  return (
    <div>
      <ManualEntry
        returnId={returnId}
        defaultValues={defaultData}
        onNext={() => alert('Ready to calculate tax or continue process')}
      />
      <button onClick={() => navigate(`/filing/${returnId}/upload`)}>
        Upload More Documents
      </button>
    </div>
  );
}

export default ManualEntryWrapper;

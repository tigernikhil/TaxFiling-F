import React, { useState, useEffect } from 'react';
import { reportService } from '../services/reportService';
import { useParams } from 'react-router-dom';

export default function ReportsPage() {
  const { returnId } = useParams();
  const [loading, setLoading] = useState(false);

  const handleDownload = async (format) => {
    setLoading(true);
    try {
      let blob;
      if (format === 'pdf') {
        blob = await reportService.generatePDF(returnId);
      } else if (format === 'xml') {
        blob = await reportService.generateXML(returnId);
      } else {
        blob = await reportService.generateJSON(returnId);
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tax-return.${format}`;
      a.click();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reports-page">
      <h1>Reports & Downloads</h1>
      <div className="report-options">
        <div className="report-card">
          <h3>📄 PDF Report</h3>
          <p>Download tax return summary as PDF</p>
          <button onClick={() => handleDownload('pdf')} disabled={loading}>
            Download PDF
          </button>
        </div>
        <div className="report-card">
          <h3>📋 XML Export</h3>
          <p>XML file for e-filing on Income Tax portal</p>
          <button onClick={() => handleDownload('xml')} disabled={loading}>
            Download XML
          </button>
        </div>
        <div className="report-card">
          <h3>💾 JSON Data</h3>
          <p>Complete tax return data in JSON format</p>
          <button onClick={() => handleDownload('json')} disabled={loading}>
            Download JSON
          </button>
        </div>
      </div>
    </div>
  );
}

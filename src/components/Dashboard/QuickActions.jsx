import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { label: 'File New Return', path: '/filing/new', icon: '📝' },
    { label: 'Upload Documents', path: '/documents', icon: '📤' },
    { label: 'View Reports', path: '/reports', icon: '📊' },
    { label: 'Manage Investments', path: '/investments', icon: '💼' }
  ];

  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <div className="actions-grid">
        {actions.map((action, idx) => (
          <button 
            key={idx} 
            className="action-btn"
            onClick={() => navigate(action.path)}
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

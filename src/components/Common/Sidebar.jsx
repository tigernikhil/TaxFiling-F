import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Personal Info', path: '/personal-info' },
    { label: 'Income', path: '/income' },
    { label: 'Deductions', path: '/deductions' },
    { label: 'Tax Calculation', path: '/tax-calculation' },
    { label: 'Documents', path: '/documents' },
    { label: 'Review', path: '/review' },
    { label: 'Submit', path: '/submit' }
  ];

  return (
    <aside className="sidebar">
      <nav>
        {menuItems.map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="sidebar-item"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

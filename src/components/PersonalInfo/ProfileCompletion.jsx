import React from 'react';

export default function ProfileCompletion({ completionData }) {
  const sections = [
    { name: 'Basic Info', completed: completionData?.basicInfo || false },
    { name: 'Address', completed: completionData?.address || false },
    { name: 'Bank Account', completed: completionData?.bankAccount || false },
    { name: 'PAN & Aadhaar', completed: completionData?.documents || false }
  ];

  const percentage = (sections.filter(s => s.completed).length / sections.length) * 100;

  return (
    <div className="profile-completion">
      <h3>Profile Completion</h3>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>
      <p>{percentage.toFixed(0)}% Complete</p>
      <ul className="completion-checklist">
        {sections.map((section, idx) => (
          <li key={idx} className={section.completed ? 'completed' : 'pending'}>
            <span className="check-icon">{section.completed ? '✓' : '○'}</span>
            {section.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

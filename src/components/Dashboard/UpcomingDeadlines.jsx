import React from 'react';

export default function UpcomingDeadlines() {
  const deadlines = [
    { date: '31 July 2024', task: 'ITR Filing Deadline', status: 'upcoming' },
    { date: '15 Sep 2024', task: 'Advance Tax Q2', status: 'upcoming' },
    { date: '15 Dec 2024', task: 'Advance Tax Q3', status: 'upcoming' }
  ];

  return (
    <div className="upcoming-deadlines">
      <h3>Upcoming Deadlines</h3>
      <ul>
        {deadlines.map((d, idx) => (
          <li key={idx} className={`deadline-${d.status}`}>
            <span className="deadline-date">{d.date}</span>
            <span className="deadline-task">{d.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

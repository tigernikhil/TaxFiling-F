import React, { useState } from 'react';

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState({});

  return (
    <div className="schedules-page">
      <h1>Schedules</h1>
      <p>Complete additional schedules as required for your ITR form</p>
      <div className="schedules-list">
        <div className="schedule-card">
          <h3>Schedule S - Salary</h3>
          <p>Details of salary from multiple employers</p>
          <button>Fill Schedule</button>
        </div>
        <div className="schedule-card">
          <h3>Schedule HP - House Property</h3>
          <p>Income from house property</p>
          <button>Fill Schedule</button>
        </div>
        <div className="schedule-card">
          <h3>Schedule CG - Capital Gains</h3>
          <p>Short-term and long-term capital gains</p>
          <button>Fill Schedule</button>
        </div>
      </div>
    </div>
  );
}

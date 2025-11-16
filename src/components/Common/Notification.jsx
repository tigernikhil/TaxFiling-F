import React from 'react';
import { useNotification } from '../hooks/useNotification';

export default function Notification() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="notifications">
      {notifications.map(notif => (
        <div key={notif.id} className={`notification ${notif.type}`}>
          <p>{notif.message}</p>
          <button onClick={() => removeNotification(notif.id)}>×</button>
        </div>
      ))}
    </div>
  );
}

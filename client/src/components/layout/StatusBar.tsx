import React from 'react';

const StatusBar: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="status-bar bg-white flex items-center justify-between px-4">
      <div className="time font-medium">{currentTime}</div>
      <div className="icons flex space-x-1">
        <span className="material-icons text-sm">signal_cellular_alt</span>
        <span className="material-icons text-sm">wifi</span>
        <span className="material-icons text-sm">battery_full</span>
      </div>
    </div>
  );
};

export default StatusBar;

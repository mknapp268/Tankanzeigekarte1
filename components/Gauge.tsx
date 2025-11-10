import React from 'react';

interface GaugeProps {
  percentage: number;
  liters: number;
}

const Gauge = ({ percentage, liters }: GaugeProps) => {
  const radius = 85;
  const circumference = radius * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-full flex justify-center items-center" style={{ height: '180px' }}>
      <svg width="100%" height="100%" viewBox="0 0 200 110">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ade80" /> 
            <stop offset="50%" stopColor="#facc15" /> 
            <stop offset="100%" stopColor="#f87171" /> 
          </linearGradient>
        </defs>
        
        {/* Background Arc */}
        <path
          d="M 15 100 A 85 85 0 0 1 185 100"
          className="gauge-bg"
        />

        {/* Foreground Arc */}
        <path
          d="M 15 100 A 85 85 0 0 1 185 100"
          className="gauge-fg"
          stroke="url(#gaugeGradient)"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ top: '30%' }}>
        <span className="gauge-text-percent">
            {percentage.toFixed(0)}%
        </span>
        <span className="gauge-text-liters">
            {liters.toFixed(0)} Liter
        </span>
      </div>
    </div>
  );
};

export default Gauge;

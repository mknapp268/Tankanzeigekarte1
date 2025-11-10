import React from 'react';

interface InfoPanelProps {
  sensorDistance: number;
  totalVolume: number;
  totalPercentage: number;
  maxVolume: number;
}

const InfoPanel = ({ sensorDistance, totalVolume, totalPercentage, maxVolume }: InfoPanelProps) => {
  const isLowLevel = totalPercentage < 20;
  const isCriticallyLow = totalPercentage < 10;
  
  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="info-display">
          <p className="text-sm text-slate-400">Sensor Reading</p>
          <p className="text-2xl font-semibold text-amber-300">{sensorDistance.toFixed(1)} cm</p>
        </div>
        <div className="info-display">
          <p className="text-sm text-slate-400">Total Volume</p>
          <p className="text-2xl font-semibold">{totalVolume.toFixed(0)} L</p>
        </div>
        <div className="info-display">
          <p className="text-sm text-slate-400">Total Capacity</p>
          <p className="text-2xl font-semibold">{maxVolume.toFixed(0)} L</p>
        </div>
      </div>
      {isLowLevel && (
        <div className={`warning-box ${isCriticallyLow ? 'border-red-700 bg-red-900/50' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="font-medium">
            {isCriticallyLow ? 'Critically Low Oil Level!' : 'Low Oil Level'} - {totalPercentage.toFixed(1)}% remaining.
          </p>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;

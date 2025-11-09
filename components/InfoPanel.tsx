
import React from 'react';

interface InfoPanelProps {
  totalLiters: number;
  percentage: number;
  fillHeight: number;
  isWarning: boolean;
}

const InfoDisplay: React.FC<{ label: string; value: string; unit: string; className?: string }> = ({ label, value, unit, className = '' }) => (
    <div className={`p-4 rounded-lg bg-slate-700/70 ${className}`}>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-2xl md:text-3xl font-bold text-white">
            {value} <span className="text-lg text-slate-300">{unit}</span>
        </p>
    </div>
);

const InfoPanel: React.FC<InfoPanelProps> = ({ totalLiters, percentage, fillHeight, isWarning }) => {
  return (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoDisplay label="Gesamtinhalt" value={totalLiters.toFixed(1)} unit="Liter" />
        <InfoDisplay label="Füllstand" value={percentage.toFixed(1)} unit="%" />
      </div>
       <InfoDisplay label="Füllhöhe" value={fillHeight.toFixed(1)} unit="cm" />

      {isWarning && (
        <div className="p-4 rounded-lg bg-red-900/50 border border-red-700 text-red-300 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          <p className="font-semibold">Warnung: Niedriger Füllstand!</p>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;

import React from 'react';

interface InfoPanelProps {
  sensorDistance: number;
  totalVolume: number;
  maxVolume: number;
  percentage: number;
}

const InfoRow = ({ label, value, unit }: { label: string; value: string; unit: string }) => (
  <div className="flex justify-between items-baseline p-4 bg-slate-700 rounded-lg">
    <p className="text-base text-slate-300">{label}</p>
    <div>
      <span className="text-xl font-semibold text-white">{value}</span>
      <span className="text-sm text-slate-400 ml-1">{unit}</span>
    </div>
  </div>
);

const InfoPanel = ({ sensorDistance, totalVolume, maxVolume, percentage }: InfoPanelProps) => {
  const isLowLevel = percentage < 20;

  return (
    <div className="w-full">
      <div className="info-panel-grid">
        <InfoRow label="Sensorabstand" value={sensorDistance.toFixed(1)} unit="cm" />
        <InfoRow label="Gesamtvolumen" value={totalVolume.toFixed(0)} unit="L" />
        <InfoRow label="Gesamtkapazität" value={maxVolume.toFixed(0)} unit="L" />
      </div>

      {isLowLevel && (
        <div className="mt-4 p-4 rounded-lg warning-box text-red-300 border-red-500 bg-red-900/20 text-center">
          <p className="font-semibold">Warnung: Niedriger Füllstand!</p>
          <p className="text-sm">Der Füllstand ist unter 20% gefallen.</p>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;
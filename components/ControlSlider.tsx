
import React from 'react';

interface ControlSliderProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
}

const ControlSlider: React.FC<ControlSliderProps> = ({ value, onChange, max }) => {
  return (
    <div className="flex flex-col items-center w-full px-2">
      <label htmlFor="sensor-distance" className="text-sm font-medium text-slate-300 mb-2">
        Sensor-Abstand von oben simulieren
      </label>
      <div className="flex items-center gap-4 w-full">
        <span className="text-xs text-slate-400">0 cm</span>
        <input
          id="sensor-distance"
          type="range"
          min="0"
          max={max}
          step="0.5"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-slate-400">{max} cm</span>
      </div>
      <div className="mt-2 text-center">
        <span className="text-lg font-mono p-2 bg-slate-900 rounded-md text-amber-300">
          {value.toFixed(1)} cm
        </span>
      </div>
    </div>
  );
};

export default ControlSlider;

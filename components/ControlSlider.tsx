import React from 'react';
import { SENSOR_MIN_DISTANCE_CM, SENSOR_MAX_DISTANCE_CM } from '../constants';

interface ControlSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const ControlSlider = ({ value, onChange }: ControlSliderProps) => {
  return (
    <div className="w-full max-w-lg pt-6">
      <label htmlFor="sensor-slider" className="block text-sm font-medium text-slate-300 mb-2">
        Simulate Sensor Distance ({value.toFixed(1)} cm)
      </label>
      <input
        id="sensor-slider"
        type="range"
        min={SENSOR_MIN_DISTANCE_CM}
        max={SENSOR_MAX_DISTANCE_CM}
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="slider"
      />
       <div className="flex justify-between text-xs text-slate-400 mt-2">
        <span>Full ({SENSOR_MIN_DISTANCE_CM} cm)</span>
        <span>Empty ({SENSOR_MAX_DISTANCE_CM} cm)</span>
      </div>
    </div>
  );
};

export default ControlSlider;

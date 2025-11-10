import React from 'react';
import { SENSOR_MIN_DISTANCE_CM, SENSOR_MAX_DISTANCE_CM } from '../constants';

interface ControlSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const ControlSlider = ({ value, onChange }: ControlSliderProps) => {
  return (
    <div className="w-full">
      <label htmlFor="sensor-slider" className="block text-sm font-medium text-center text-slate-300 mb-2">
        Sensor-Abstand Simulieren
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
        <span>Voll ({SENSOR_MIN_DISTANCE_CM} cm)</span>
        <span>Leer ({SENSOR_MAX_DISTANCE_CM} cm)</span>
      </div>
    </div>
  );
};

export default ControlSlider;
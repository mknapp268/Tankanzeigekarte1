// FIX: Add imports for React and ReactDOM to use them as modules.
import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';

// All code is consolidated into one file to avoid browser module resolution issues.

// --- CONSTANTS ---
const TANK_LENGTH_CM = 150;
const TANK_WIDTH_CM = 70;
const TANK_HEIGHT_CM = 120;
const SENSOR_MIN_DISTANCE_CM = 10; // Distance when tank is full
const SENSOR_MAX_DISTANCE_CM = 115; // Distance when tank is effectively empty

// --- HOOKS ---
// FIX: The line `const { useMemo, useState } = React;` was removed as these are now imported directly.
const useTankCalculation = (sensorDistanceCm) => {
  const calculation = useMemo(() => {
    const a = TANK_WIDTH_CM / 2;
    const b = TANK_HEIGHT_CM / 2;
    const L = TANK_LENGTH_CM;
    const liquidHeightCm = TANK_HEIGHT_CM - sensorDistanceCm;
    const h = Math.max(0, Math.min(TANK_HEIGHT_CM, liquidHeightCm));
    const maxVolumeCm3 = Math.PI * a * b * L;
    const maxVolumeLiters = maxVolumeCm3 / 1000;
    
    let volumeCm3 = 0;
    if (h > 0) {
      if (h >= TANK_HEIGHT_CM) {
        volumeCm3 = maxVolumeCm3;
      } else {
        const term1 = a * b * Math.acos((b - h) / b);
        const term2 = (b - h) * Math.sqrt(2 * b * h - h * h);
        const areaOfSegment = term1 - term2;
        volumeCm3 = areaOfSegment * L;
      }
    }

    const volumeLiters = Math.max(0, volumeCm3 / 1000);
    const percentage = maxVolumeLiters > 0 ? (volumeLiters / maxVolumeLiters) * 100 : 0;

    return { volumeLiters, percentage, liquidHeightCm: h, maxVolumeLiters };
  }, [sensorDistanceCm]);

  return calculation;
};

// --- COMPONENTS ---

const Tank = ({ percentage, id }) => {
  const svgWidth = 200;
  const svgHeight = 150;
  const rx = svgWidth / 2;
  const ry = svgHeight / 2;
  const yPos = svgHeight - (svgHeight * percentage) / 100;
  const waveHeight = 5;

  const wavePath1 = `M -${svgWidth*2},${yPos + waveHeight} C -${svgWidth*1.5},${yPos-waveHeight} -${svgWidth*0.5},${yPos-waveHeight} 0,${yPos+waveHeight} S ${svgWidth*0.5},${yPos+waveHeight*3} ${svgWidth},${yPos+waveHeight} S ${svgWidth*1.5},${yPos-waveHeight} ${svgWidth*2},${yPos+waveHeight} V ${svgHeight} H -${svgWidth*2} Z`;
  const wavePath2 = `M -${svgWidth*2},${yPos + waveHeight} C -${svgWidth*1.5},${yPos+waveHeight*3} -${svgWidth*0.5},${yPos+waveHeight*3} 0,${yPos+waveHeight} S ${svgWidth*0.5},${yPos-waveHeight} ${svgWidth},${yPos+waveHeight} S ${svgWidth*1.5},${yPos+waveHeight*3} ${svgWidth*2},${yPos+waveHeight} V ${svgHeight} H -${svgWidth*2} Z`;

  return (
    <div className="relative w-80 md:w-96 h-64 md:h-72">
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full">
        <defs>
          <clipPath id={`tank-clip-${id}`}>
            <ellipse cx={rx} cy={ry} rx={rx} ry={ry} />
          </clipPath>
        </defs>
        <g clipPath={`url(#tank-clip-${id})`}>
          <rect x="0" y="0" width={svgWidth} height={svgHeight} className="fill-slate-800/50" />
          <path d={wavePath1} className="fill-amber-300 animate-wave-flow" style={{ animationDuration: '10s' }} />
          <path d={wavePath2} className="fill-amber-500/70 animate-wave-flow" style={{ animationDuration: '15s', animationDelay: '-5s' }} />
        </g>
        <ellipse cx={rx} cy={ry} rx={rx - 2} ry={ry - 2} fill="none" className="stroke-slate-600" strokeWidth="4" />
        <path d={`M ${rx/2} 15 A ${rx*1.2} ${ry*1.2} 0 0 1 ${rx*1.5} 15`} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="8" />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <p className="text-2xl md:text-3xl font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>
          {percentage.toFixed(1)}%
        </p>
      </div>
    </div>
  );
};

const InfoPanel = ({ sensorDistance, totalVolume, totalPercentage, maxVolume }) => {
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

const ControlSlider = ({ value, onChange }) => {
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

const App = () => {
  const initialSensorDistance = SENSOR_MIN_DISTANCE_CM + (SENSOR_MAX_DISTANCE_CM - SENSOR_MIN_DISTANCE_CM) / 2;
  const [sensorDistance, setSensorDistance] = useState(initialSensorDistance);

  const { volumeLiters, percentage, maxVolumeLiters } = useTankCalculation(sensorDistance);

  const totalVolume = volumeLiters * 2;
  const totalMaxVolume = maxVolumeLiters * 2;
  const totalPercentage = percentage;

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="main-card p-6 lg:p-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          <div className="flex flex-col sm:flex-row gap-8">
            <Tank percentage={percentage} id="1" />
            <Tank percentage={percentage} id="2" />
          </div>
          <div className="flex flex-col items-center justify-start w-full lg:w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left w-full">Oil Tank Monitor</h1>
            <p className="text-slate-400 mt-2 mb-4 text-center md:text-left w-full">
              Simulate live readings from your oil tank sensors.
            </p>
            <InfoPanel 
              sensorDistance={sensorDistance}
              totalVolume={totalVolume}
              totalPercentage={totalPercentage}
              maxVolume={totalMaxVolume}
            />
            <ControlSlider 
              value={sensorDistance}
              onChange={setSensorDistance}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

// --- RENDER APP ---
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
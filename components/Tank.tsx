import React, { useMemo } from 'react';
import { TANK_WIDTH_CM, TANK_HEIGHT_CM } from '../constants';

interface TankProps {
  percentage: number;
  liters: number;
  tankNumber: number;
}

// Constants for SVG rendering
const SVG_WIDTH = 200;
const SVG_HEIGHT = (SVG_WIDTH * TANK_HEIGHT_CM) / TANK_WIDTH_CM;
const STROKE_WIDTH = 4;
const RX = (SVG_WIDTH - STROKE_WIDTH) / 2;
const RY = (SVG_HEIGHT - STROKE_WIDTH) / 2;
const CX = SVG_WIDTH / 2;
const CY = SVG_HEIGHT / 2;

const Tank = ({ percentage, liters, tankNumber }: TankProps) => {
  const liquidHeight = useMemo(() => {
    return (percentage / 100) * (SVG_HEIGHT - STROKE_WIDTH);
  }, [percentage]);

  const wavePath = useMemo(() => {
    const y = SVG_HEIGHT - STROKE_WIDTH / 2 - liquidHeight;
    const waveAmplitude = 5;
    const waveLength = 80;
    
    if (percentage < 1) return `M 0,${SVG_HEIGHT} H ${SVG_WIDTH}`;
    if (percentage > 99) return `M 0,0 H ${SVG_WIDTH}`;

    return `M ${STROKE_WIDTH/2},${y} 
            q ${waveLength/4},-${waveAmplitude} ${waveLength/2},0 
            t ${waveLength/2},0 
            q ${waveLength/4},-${waveAmplitude} ${waveLength/2},0 
            t ${waveLength/2},0
            V ${SVG_HEIGHT} H ${STROKE_WIDTH/2} Z`;
  }, [liquidHeight, percentage]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold text-slate-300 mb-2">Tank {tankNumber}</h2>
      <svg width={SVG_WIDTH} height={SVG_HEIGHT} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
        <defs>
          <clipPath id={`tank-clip-${tankNumber}`}>
            <ellipse cx={CX} cy={CY} rx={RX} ry={RY} />
          </clipPath>
          <linearGradient id="liquid-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#38bdf8', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
          </linearGradient>
          <style>
            {`
              @keyframes wave {
                0% { transform: translateX(0); }
                100% { transform: translateX(-80px); }
              }
              .wave-animation {
                animation: wave 2s linear infinite;
              }
            `}
          </style>
        </defs>
        
        {/* Liquid */}
        <g clipPath={`url(#tank-clip-${tankNumber})`}>
          <rect x="0" y="0" width={SVG_WIDTH} height={SVG_HEIGHT} fill="#334155" />
          <path
            className="wave-animation"
            d={wavePath}
            fill="url(#liquid-gradient)"
          />
        </g>
        
        {/* Tank Outline */}
        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="#64748b" strokeWidth={STROKE_WIDTH} />
      </svg>
      <div className="text-center mt-4">
        <p className="text-xl font-bold text-white">{liters.toFixed(0)} L</p>
        <p className="text-sm text-slate-400">{percentage.toFixed(1)}%</p>
      </div>
    </div>
  );
};

export default Tank;
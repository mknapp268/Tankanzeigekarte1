import React from 'react';

interface TankProps {
  percentage: number;
  id: string;
}

const Tank = ({ percentage, id }: TankProps) => {
  // SVG dimensions
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
export default Tank;


import React from 'react';

interface TankProps {
  percentage: number;
  maxLiters: number;
}

const Tank: React.FC<TankProps> = ({ percentage, maxLiters }) => {
  const liquidTopPosition = 100 - percentage;
  const scalePoints = [100, 75, 50, 25, 0];

  return (
    <div className="relative w-80 h-64 md:w-96 md:h-72 bg-slate-700/50 border-4 border-slate-600 rounded-full overflow-hidden shadow-inner shadow-slate-900/50">
      {/* Liquid Body */}
      <div
        className="absolute bottom-0 left-0 w-full bg-amber-500 transition-all duration-700 ease-out"
        style={{ height: `${percentage}%` }}
      />
      
      {/* Animated Wave */}
      <div
        className="absolute left-0 w-full transition-all duration-700 ease-out"
        style={{ top: `${liquidTopPosition}%` }}
      >
        <div className="relative w-full h-4">
          <svg className="absolute w-[200%] h-full" viewBox="0 0 800 100" preserveAspectRatio="none">
            <path
              d="M800 56.5C718.3 56.5 670.3 22.1 602.3 22.1C534.3 22.1 486.3 56.5 400 56.5C313.7 56.5 265.7 22.1 197.7 22.1C129.7 22.1 81.7 56.5 0 56.5V100H800V56.5Z"
              className="fill-amber-500 animate-wave"
              style={{ animationDuration: '6s' }}
            />
            <path
              d="M800 56.5C718.3 56.5 670.3 22.1 602.3 22.1C534.3 22.1 486.3 56.5 400 56.5C313.7 56.5 265.7 22.1 197.7 22.1C129.7 22.1 81.7 56.5 0 56.5V100H800V56.5Z"
              className="fill-amber-600/50 animate-wave"
              style={{ animationDuration: '8s', animationDirection: 'reverse' }}
            />
          </svg>
        </div>
      </div>
      
       {/* Tank Markings in Liters */}
       <div className="absolute top-0 left-4 h-full w-auto text-xs text-slate-400 flex flex-col justify-between py-4">
        {scalePoints.map((p) => (
          <span key={p} className="bg-slate-900/50 px-1 rounded">
            {(p / 100 * maxLiters).toFixed(0)} L
          </span>
        ))}
       </div>
       
       <style>{`
          @keyframes wave {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-wave {
            animation: wave linear infinite;
          }
        `}</style>
    </div>
  );
};

export default Tank;

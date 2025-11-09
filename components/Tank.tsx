import React from 'react';

interface TankProps {
  percentage: number;
  maxLiters: number;
}

const Tank: React.FC<TankProps> = ({ percentage, maxLiters }) => {
  const liquidTopPosition = 100 - percentage;

  // Generate scale points for major (300L) and minor (50L) ticks
  const scalePoints: { literValue: number; isMajor: boolean }[] = [];
  const majorStep = 300;
  const minorStep = 50;

  for (let literValue = 0; literValue <= maxLiters; literValue += minorStep) {
    const isMajor = literValue % majorStep === 0;
    scalePoints.push({ literValue, isMajor });
  }

  return (
    // Container to hold the tank and the scale side-by-side
    <div className="flex items-center gap-4">
      {/* Tank visual */}
      <div className="relative w-80 h-64 md:w-96 md:h-72 bg-slate-700/50 border-4 border-slate-600 rounded-full overflow-hidden shadow-inner shadow-slate-900/50">
        
        {/* The animated wave container now acts as the entire liquid body */}
        <div
          className="absolute left-0 w-full bg-amber-500 transition-all duration-700 ease-out"
          style={{ top: `${liquidTopPosition}%`, bottom: 0 }}
        >
          {/* The SVG is positioned at the top of the liquid and pulled up slightly
              to hide the container's straight top edge, making the wave the visible surface. */}
          <div className="absolute top-0 left-0 w-full h-4" style={{ transform: 'translateY(-50%)' }}>
            <svg className="absolute w-[200%] h-full" viewBox="0 0 800 100" preserveAspectRatio="none">
              <path
                d="M800 56.5C718.3 56.5 670.3 22.1 602.3 22.1C534.3 22.1 486.3 56.5 400 56.5C313.7 56.5 265.7 22.1 197.7 22.1C129.7 22.1 81.7 56.5 0 56.5V100H800V56.5Z"
                className="fill-amber-500 animate-wave"
                style={{ animationDuration: '10s' }}
              />
              <path
                d="M800 56.5C718.3 56.5 670.3 22.1 602.3 22.1C534.3 22.1 486.3 56.5 400 56.5C313.7 56.5 265.7 22.1 197.7 22.1C129.7 22.1 81.7 56.5 0 56.5V100H800V56.5Z"
                className="fill-amber-600/50 animate-wave"
                style={{ animationDuration: '12s', animationDirection: 'reverse' }}
              />
            </svg>
          </div>
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

      {/* Mirrored scale on the right, pointing to the tank */}
      <div className="relative h-64 md:h-72 w-20 text-xs text-slate-400">
        {scalePoints.map(({ literValue, isMajor }) => {
          const bottomPosition = (literValue / maxLiters) * 100;
          if (bottomPosition > 100) return null;

          return (
            <div
              key={literValue}
              className="absolute left-0 w-full"
              style={{
                bottom: `${bottomPosition}%`,
                transform: 'translateY(50%)',
              }}
            >
              <div className="flex items-center justify-start gap-1">
                {/* Tick mark line (now first) */}
                <span
                  className={`h-px ${isMajor ? 'w-3 bg-slate-500' : 'w-1.5 bg-slate-600'}`}
                ></span>
                {/* Label for major ticks (now second) */}
                <div className="w-12 text-left">
                  {isMajor && (
                    <span className="bg-slate-900/50 px-1 rounded whitespace-nowrap">
                      {literValue} L
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tank;
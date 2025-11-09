import React, { useState, useEffect } from 'react';
import Tank from './components/Tank';
import InfoPanel from './components/InfoPanel';
import ControlSlider from './components/ControlSlider';
import { useTankCalculation } from './hooks/useTankCalculation';
import { TANK_HEIGHT, MAX_CONTENT_PER_TANK } from './constants';

function App() {
  const [sensorDistance, setSensorDistance] = useState(80);
  const [isSensorMode, setIsSensorMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const distanceParam = params.get('abstand');
    if (distanceParam !== null && !isNaN(Number(distanceParam))) {
      setSensorDistance(Number(distanceParam));
      setIsSensorMode(true);
    }
  }, []);

  const { fillHeight, totalLiters, percentage, isWarning } = useTankCalculation(sensorDistance);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700">
        <header className="p-6 border-b border-slate-700">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-amber-300 tracking-wider">
            Öltank Füllstandsanzeige
          </h1>
        </header>

        <main className="p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center">
            <div className="w-full lg:w-1/2 flex justify-center items-center">
               <Tank percentage={percentage} maxLiters={MAX_CONTENT_PER_TANK * 2} />
            </div>
            <div className="w-full lg:w-1/2">
              <InfoPanel 
                totalLiters={totalLiters}
                percentage={percentage}
                fillHeight={fillHeight}
                isWarning={isWarning}
              />
            </div>
          </div>

          {!isSensorMode && (
            <div className="mt-8 pt-6 border-t border-slate-700">
               <ControlSlider
                  value={sensorDistance}
                  onChange={setSensorDistance}
                  max={TANK_HEIGHT}
               />
            </div>
          )}
        </main>
      </div>
       {!isSensorMode && (
          <footer className="text-center mt-6 text-slate-500 text-sm">
            <p>Simuliert den Füllstand von 2x Dehoust 1500L Öltanks.</p>
          </footer>
        )}
    </div>
  );
}

export default App;
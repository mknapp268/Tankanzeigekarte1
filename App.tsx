import React, { useState } from 'react';
import Tank from './components/Tank';
import InfoPanel from './components/InfoPanel';
import ControlSlider from './components/ControlSlider';
import { useTankCalculation } from './hooks/useTankCalculation';
import { SENSOR_MIN_DISTANCE_CM, SENSOR_MAX_DISTANCE_CM } from './constants';

const App = () => {
  // Simulate the sensor reading. Start with a half-full tank.
  const initialSensorDistance = SENSOR_MIN_DISTANCE_CM + (SENSOR_MAX_DISTANCE_CM - SENSOR_MIN_DISTANCE_CM) / 2;
  const [sensorDistance, setSensorDistance] = useState(initialSensorDistance);

  const { volumeLiters, percentage, maxVolumeLiters } = useTankCalculation(sensorDistance);

  // Assuming two identical tanks
  const totalVolume = volumeLiters * 2;
  const totalMaxVolume = maxVolumeLiters * 2;

  return (
    <div className="w-full max-w-4xl">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold text-white">Öltank-Anzeige</h1>
        <p className="text-slate-400">Live-Daten & Simulation</p>
      </header>

      <main className="bg-slate-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-center items-center flex-wrap space-x-8">
          <Tank percentage={percentage} liters={volumeLiters} tankNumber={1} />
          <Tank percentage={percentage} liters={volumeLiters} tankNumber={2} />
        </div>

        <div className="mt-8">
          <InfoPanel 
            sensorDistance={sensorDistance}
            totalVolume={totalVolume}
            maxVolume={totalMaxVolume}
            percentage={percentage}
          />
        </div>
        
        <div className="mt-8">
          <ControlSlider 
              value={sensorDistance}
              onChange={setSensorDistance}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import Tank from './components/Tank';
import InfoPanel from './components/InfoPanel';
import ControlSlider from './components/ControlSlider';
import { useTankCalculation } from './hooks/useTankCalculation';
import { SENSOR_MIN_DISTANCE_CM, SENSOR_MAX_DISTANCE_CM } from './constants';

const App = () => {
  const initialSensorDistance = SENSOR_MIN_DISTANCE_CM + (SENSOR_MAX_DISTANCE_CM - SENSOR_MIN_DISTANCE_CM) / 2;
  const [sensorDistance, setSensorDistance] = useState(initialSensorDistance);

  const { volumeLiters, percentage, maxVolumeLiters } = useTankCalculation(sensorDistance);

  // Assuming two identical tanks
  const totalVolume = volumeLiters * 2;
  const totalMaxVolume = maxVolumeLiters * 2;
  const totalPercentage = percentage;

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="main-card p-6 lg:p-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Tanks Display */}
          <div className="flex flex-col sm:flex-row gap-8">
            <Tank percentage={percentage} id="1" />
            <Tank percentage={percentage} id="2" />
          </div>

          {/* Controls and Info */}
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

export default App;

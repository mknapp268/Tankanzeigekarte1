import { useMemo } from 'react';
import { TANK_LENGTH_CM, TANK_WIDTH_CM, TANK_HEIGHT_CM } from '../constants';

/**
 * Calculates the volume of liquid in a horizontal elliptical tank.
 * @param sensorDistanceCm - The distance from the sensor at the top to the liquid surface.
 * @returns An object with volume in liters, fill percentage, liquid height, and max volume.
 */
export const useTankCalculation = (sensorDistanceCm: number) => {
  const calculation = useMemo(() => {
    const a = TANK_WIDTH_CM / 2; // semi-width
    const b = TANK_HEIGHT_CM / 2; // semi-height
    const L = TANK_LENGTH_CM;

    const liquidHeightCm = TANK_HEIGHT_CM - sensorDistanceCm;
    
    // Clamp liquid height to be within tank dimensions
    const h = Math.max(0, Math.min(TANK_HEIGHT_CM, liquidHeightCm));

    const maxVolumeCm3 = Math.PI * a * b * L;
    const maxVolumeLiters = maxVolumeCm3 / 1000;
    
    let volumeCm3 = 0;
    if (h > 0) {
      if (h >= TANK_HEIGHT_CM) {
        volumeCm3 = maxVolumeCm3;
      } else {
        // Formula for the area of a horizontal elliptical segment
        const term1 = a * b * Math.acos((b - h) / b);
        const term2 = (b - h) * Math.sqrt(2 * b * h - h * h);
        const areaOfSegment = term1 - term2;
        volumeCm3 = areaOfSegment * L;
      }
    }

    const volumeLiters = Math.max(0, volumeCm3 / 1000);
    const percentage = maxVolumeLiters > 0 ? (volumeLiters / maxVolumeLiters) * 100 : 0;

    return {
      volumeLiters,
      percentage,
      liquidHeightCm: h,
      maxVolumeLiters,
    };
  }, [sensorDistanceCm]);

  return calculation;
};

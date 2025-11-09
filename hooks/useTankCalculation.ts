
import { useMemo } from 'react';
import { TANK_WIDTH, TANK_DEPTH, TANK_HEIGHT, MAX_CONTENT_PER_TANK, WARN_LIMIT_LITERS } from '../constants';

interface TankCalculationResult {
    fillHeight: number;
    totalLiters: number;
    percentage: number;
    isWarning: boolean;
}

/**
 * Calculates tank content based on sensor distance from the top.
 * The logic is adapted from the user-provided script for 2 elliptical tanks.
 * @param sensorDistance - The distance measured by the sensor from the top of the tank in cm.
 * @returns An object with calculated values: fillHeight, totalLiters, percentage, isWarning.
 */
export const useTankCalculation = (sensorDistance: number): TankCalculationResult => {
    return useMemo(() => {
        // Actual fill height (from the bottom)
        let fillHeight = TANK_HEIGHT - sensorDistance;

        // Clamp to realistic values
        if (fillHeight > TANK_HEIGHT) fillHeight = TANK_HEIGHT;
        if (fillHeight < 0) fillHeight = 0;

        // Ellipse semi-axes
        const a = TANK_WIDTH / 2; // major semi-axis
        const b = TANK_DEPTH / 2;  // minor semi-axis

        // Volume for the given fill height (in cm³) for one tank
        const volumePerTank_cm3 = Math.PI * a * b * fillHeight;

        // Total volume for 2 tanks in liters
        const totalLiters = (volumePerTank_cm3 * 2) / 1000;
        const litersPerTank = totalLiters / 2;

        // Percentage fill
        let percentage = (litersPerTank / MAX_CONTENT_PER_TANK) * 100;
        if (percentage > 100) percentage = 100;
        if (percentage < 0) percentage = 0;


        // Warning if total content is below the limit
        const isWarning = totalLiters < WARN_LIMIT_LITERS;

        return {
            fillHeight: parseFloat(fillHeight.toFixed(1)),
            totalLiters: parseFloat(totalLiters.toFixed(1)),
            percentage: parseFloat(percentage.toFixed(1)),
            isWarning,
        };

    }, [sensorDistance]);
};

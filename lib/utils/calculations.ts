import { WeatherData, OceanConditions, SnorkelConditions } from '../types';

/**
 * Calculate snorkel conditions based on weather and ocean data
 */
export function calculateSnorkelConditions(
  weather: WeatherData,
  ocean: OceanConditions
): SnorkelConditions {
  // Calculate visibility score (0-100)
  const visibilityScore = calculateVisibilityScore(ocean.waveHeight, weather.windSpeed, ocean.waterTemperature);
  
  // Calculate safety score (0-100)
  const safetyScore = calculateSafetyScore(ocean.waveHeight, weather.windSpeed, ocean.currentSpeed);
  
  // Calculate overall score (weighted average)
  const overallScore = Math.round((visibilityScore * 0.6) + (safetyScore * 0.4));
  
  // Determine recommendation
  const recommendation = getRecommendation(overallScore, safetyScore);
  
  // Determine factors
  const factors = {
    waveHeight: getWaveHeightFactor(ocean.waveHeight),
    visibility: getVisibilityFactor(visibilityScore),
    wind: getWindFactor(weather.windSpeed),
    currents: getCurrentFactor(ocean.currentSpeed),
  };
  
  // Generate warnings
  const warnings = generateWarnings(weather, ocean, factors);
  
  return {
    visibility: Math.max(0, Math.min(30, visibilityScore / 3)), // Convert to meters (0-30m)
    safetyScore,
    overallScore,
    recommendation,
    factors,
    warnings: warnings.length > 0 ? warnings : undefined,
    bestTimeWindow: calculateBestTimeWindow(weather, ocean),
  };
}

function calculateVisibilityScore(waveHeight: number, windSpeed: number, waterTemp: number): number {
  // Lower waves and wind = better visibility
  let score = 100;
  
  // Wave height impact (ideal: < 1ft, poor: > 3ft)
  if (waveHeight > 3) score -= 50;
  else if (waveHeight > 2) score -= 30;
  else if (waveHeight > 1) score -= 15;
  
  // Wind speed impact (ideal: < 10mph, poor: > 20mph)
  if (windSpeed > 25) score -= 40;
  else if (windSpeed > 15) score -= 25;
  else if (windSpeed > 10) score -= 10;
  
  // Water temperature bonus (warmer water is generally clearer)
  if (waterTemp > 75) score += 5;
  
  return Math.max(0, Math.min(100, score));
}

function calculateSafetyScore(waveHeight: number, windSpeed: number, currentSpeed: number): number {
  let score = 100;
  
  // Wave height safety (0-100)
  if (waveHeight > 4) score -= 60;
  else if (waveHeight > 3) score -= 40;
  else if (waveHeight > 2) score -= 25;
  else if (waveHeight > 1) score -= 10;
  
  // Wind speed safety
  if (windSpeed > 25) score -= 30;
  else if (windSpeed > 20) score -= 20;
  else if (windSpeed > 15) score -= 10;
  
  // Current speed safety (knots)
  if (currentSpeed > 2) score -= 40;
  else if (currentSpeed > 1.5) score -= 25;
  else if (currentSpeed > 1) score -= 15;
  else if (currentSpeed > 0.5) score -= 5;
  
  return Math.max(0, Math.min(100, score));
}

function getRecommendation(overallScore: number, safetyScore: number): SnorkelConditions['recommendation'] {
  // Safety takes precedence
  if (safetyScore < 40) return 'Unsafe';
  if (safetyScore < 60) return 'Poor';
  
  if (overallScore >= 80) return 'Excellent';
  if (overallScore >= 65) return 'Good';
  if (overallScore >= 50) return 'Fair';
  return 'Poor';
}

function getWaveHeightFactor(waveHeight: number): 'Safe' | 'Caution' | 'Unsafe' {
  if (waveHeight > 3) return 'Unsafe';
  if (waveHeight > 2) return 'Caution';
  return 'Safe';
}

function getVisibilityFactor(score: number): 'Excellent' | 'Good' | 'Fair' | 'Poor' {
  if (score >= 80) return 'Excellent';
  if (score >= 65) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Poor';
}

function getWindFactor(windSpeed: number): 'Calm' | 'Moderate' | 'Strong' {
  if (windSpeed > 20) return 'Strong';
  if (windSpeed > 10) return 'Moderate';
  return 'Calm';
}

function getCurrentFactor(currentSpeed: number): 'None' | 'Light' | 'Moderate' | 'Strong' {
  if (currentSpeed > 2) return 'Strong';
  if (currentSpeed > 1) return 'Moderate';
  if (currentSpeed > 0.3) return 'Light';
  return 'None';
}

function generateWarnings(
  weather: WeatherData,
  ocean: OceanConditions,
  factors: SnorkelConditions['factors']
): string[] {
  const warnings: string[] = [];
  
  if (factors.waveHeight === 'Unsafe') {
    warnings.push('High waves - not recommended for snorkeling');
  }
  
  if (factors.currents === 'Strong' || factors.currents === 'Moderate') {
    warnings.push(`Strong currents detected - use caution`);
  }
  
  if (factors.wind === 'Strong') {
    warnings.push('Strong winds may affect conditions');
  }
  
  if (ocean.waveHeight > 2 && ocean.waveHeight <= 3) {
    warnings.push('Moderate wave conditions - experienced snorkelers only');
  }
  
  if (weather.visibility < 5) {
    warnings.push('Reduced visibility due to weather conditions');
  }
  
  return warnings;
}

function calculateBestTimeWindow(
  weather: WeatherData,
  ocean: OceanConditions
): { start: string; end: string } | undefined {
  // Simplified: morning is generally best (8-11 AM)
  // In a real implementation, this would consider tide charts, wind patterns, etc.
  if (ocean.tideDirection === 'rising' && weather.windSpeed < 15) {
    return {
      start: '08:00',
      end: '11:00',
    };
  }
  return undefined;
}


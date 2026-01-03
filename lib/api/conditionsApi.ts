import { BeachConditions, WeatherData, OceanConditions } from '../types';
import { calculateSnorkelConditions } from '../utils/calculations';
import { BEACHES } from '../data/beaches';

/**
 * Mock API - In production, this would fetch from real APIs
 * For now, we'll generate realistic mock data based on beach location
 */

// Mock data generator - simulates real conditions
function generateMockWeatherData(lat: number, lon: number): WeatherData {
  // Simulate variations based on location and time
  const baseTemp = 75 + (Math.sin(lat) * 5); // Temperature varies by latitude
  const timeOfDay = new Date().getHours();
  const tempVariation = Math.sin((timeOfDay - 6) * Math.PI / 12) * 5; // Cooler at night
  
  return {
    temperature: Math.round(baseTemp + tempVariation),
    condition: ['Sunny', 'Partly Cloudy', 'Clear'][Math.floor(Math.random() * 3)],
    windSpeed: 8 + Math.random() * 12, // 8-20 mph
    windDirection: Math.random() * 360,
    humidity: 60 + Math.random() * 25, // 60-85%
    cloudCover: Math.random() * 30, // 0-30%
    visibility: 8 + Math.random() * 2, // 8-10 miles
  };
}

function generateMockOceanConditions(lat: number, lon: number): OceanConditions {
  // Simulate ocean conditions
  const baseWaveHeight = 1 + Math.random() * 2.5; // 1-3.5 ft
  const swellHeight = baseWaveHeight * 0.8;
  
  return {
    waveHeight: parseFloat(baseWaveHeight.toFixed(1)),
    wavePeriod: 8 + Math.random() * 6, // 8-14 seconds
    waveDirection: Math.random() * 360,
    waterTemperature: 72 + Math.random() * 6, // 72-78°F
    swellHeight: parseFloat(swellHeight.toFixed(1)),
    swellPeriod: 10 + Math.random() * 8, // 10-18 seconds
    swellDirection: Math.random() * 360,
    tideHeight: -1 + Math.random() * 2, // -1 to +1 ft relative to mean
    tideDirection: Math.random() > 0.5 ? 'rising' : 'falling',
    currentSpeed: Math.random() * 1.5, // 0-1.5 knots
    currentDirection: Math.random() * 360,
  };
}

/**
 * Fetch conditions for a specific beach
 */
export async function fetchBeachConditions(beachId: string): Promise<BeachConditions | null> {
  const beach = BEACHES.find(b => b.id === beachId);
  if (!beach) {
    return null;
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const weather = generateMockWeatherData(beach.latitude, beach.longitude);
  const ocean = generateMockOceanConditions(beach.latitude, beach.longitude);
  const snorkel = calculateSnorkelConditions(weather, ocean);
  
  return {
    ...beach,
    weather,
    ocean,
    snorkel,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Fetch conditions for multiple beaches
 */
export async function fetchMultipleBeachConditions(beachIds: string[]): Promise<BeachConditions[]> {
  const results = await Promise.all(
    beachIds.map(id => fetchBeachConditions(id))
  );
  return results.filter((result): result is BeachConditions => result !== null);
}

/**
 * Fetch conditions for all beaches
 */
export async function fetchAllBeachConditions(): Promise<BeachConditions[]> {
  const beachIds = BEACHES.map(beach => beach.id);
  return fetchMultipleBeachConditions(beachIds);
}

// TODO: Implement real API integrations
// export async function fetchWeatherFromAPI(lat: number, lon: number): Promise<WeatherData> {
//   // OpenWeatherMap API integration
// }

// export async function fetchOceanFromAPI(lat: number, lon: number): Promise<OceanConditions> {
//   // NOAA/Stormglass API integration
// }


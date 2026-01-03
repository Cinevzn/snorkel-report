export type Island =
  | "Oahu"
  | "Maui"
  | "Big Island"
  | "Kauai"
  | "Molokai"
  | "Lanai";

export type Difficulty = "Easy" | "Medium" | "Difficult";

export interface Beach {
  id: string;
  name: string;
  island: Island;
  latitude: number;
  longitude: number;
  description: string;
  difficulty: Difficulty;
  bestTime: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  cloudCover: number;
  visibility: number;
}

export interface OceanConditions {
  waveHeight: number;
  wavePeriod: number;
  waveDirection: number;
  waterTemperature: number;
  swellHeight: number;
  swellPeriod: number;
  swellDirection: number;
  tideHeight: number;
  tideDirection: "rising" | "falling";
  currentSpeed: number;
  currentDirection: number;
}

export interface SnorkelConditions {
  visibility: number; // in meters
  safetyScore: number; // 0-100
  overallScore: number; // 0-100
  recommendation: "Excellent" | "Good" | "Fair" | "Poor" | "Unsafe";
  factors: {
    waveHeight: "Safe" | "Caution" | "Unsafe";
    visibility: "Excellent" | "Good" | "Fair" | "Poor";
    wind: "Calm" | "Moderate" | "Strong";
    currents: "None" | "Light" | "Moderate" | "Strong";
  };
  warnings?: string[];
  bestTimeWindow?: {
    start: string;
    end: string;
  };
}

export interface BeachConditions extends Beach {
  weather: WeatherData;
  ocean: OceanConditions;
  snorkel: SnorkelConditions;
  lastUpdated: string;
}

export interface ForecastData {
  date: string;
  time: string;
  weather: WeatherData;
  ocean: OceanConditions;
  snorkel: SnorkelConditions;
}

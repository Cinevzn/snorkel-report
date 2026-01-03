import { format, parseISO } from 'date-fns';

export function formatTemperature(celsius: number, unit: 'C' | 'F' = 'F'): string {
  if (unit === 'F') {
    const fahrenheit = (celsius * 9/5) + 32;
    return `${Math.round(fahrenheit)}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

export function formatDistance(meters: number, unit: 'm' | 'ft' = 'ft'): string {
  if (unit === 'ft') {
    const feet = meters * 3.28084;
    return `${feet.toFixed(1)} ft`;
  }
  return `${meters.toFixed(1)} m`;
}

export function formatSpeed(knots: number, unit: 'knots' | 'mph' = 'mph'): string {
  if (unit === 'mph') {
    const mph = knots * 1.15078;
    return `${mph.toFixed(1)} mph`;
  }
  return `${knots.toFixed(1)} kt`;
}

export function formatWaveHeight(feet: number): string {
  return `${feet.toFixed(1)} ft`;
}

export function formatDate(date: string | Date, formatStr: string = 'MMM dd, yyyy'): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    return date.toString();
  }
}

export function formatTime(time: string | Date, formatStr: string = 'h:mm a'): string {
  try {
    const dateObj = typeof time === 'string' ? parseISO(time) : time;
    return format(dateObj, formatStr);
  } catch (error) {
    return time.toString();
  }
}

export function getRecommendationColor(recommendation: string): 'success' | 'info' | 'warning' | 'error' {
  switch (recommendation) {
    case 'Excellent':
      return 'success';
    case 'Good':
      return 'info';
    case 'Fair':
      return 'warning';
    case 'Poor':
    case 'Unsafe':
      return 'error';
    default:
      return 'warning';
  }
}

export function getDifficultyColor(difficulty: string): 'success' | 'warning' | 'error' {
  switch (difficulty) {
    case 'Easy':
      return 'success';
    case 'Medium':
      return 'warning';
    case 'Difficult':
      return 'error';
    default:
      return 'warning';
  }
}


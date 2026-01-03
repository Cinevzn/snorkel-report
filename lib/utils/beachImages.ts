/**
 * Utility to get stock images for beaches
 * Currently using a single beach image for all beaches
 */

// Single beach image URL for all beaches
const BEACH_IMAGE_URL = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8fDA%3D';

export function getBeachImage(beachId: string, beachName: string, island: string): string {
  return BEACH_IMAGE_URL;
}


import { Beach, Island } from '../types';

export const BEACHES: Beach[] = [
  // Oahu
  {
    id: 'hanauma-bay',
    name: 'Hanauma Bay',
    island: 'Oahu',
    latitude: 21.2694,
    longitude: -157.6939,
    description: 'Protected bay with abundant marine life and crystal-clear waters',
    difficulty: 'Easy',
    bestTime: 'Morning (8-10 AM)'
  },
  {
    id: 'sharks-cove',
    name: 'Sharks Cove',
    island: 'Oahu',
    latitude: 21.6467,
    longitude: -158.0828,
    description: 'Popular spot on North Shore with excellent visibility',
    difficulty: 'Medium',
    bestTime: 'Summer mornings (calm conditions)'
  },
  {
    id: 'electric-beach',
    name: 'Electric Beach (Kahe Point)',
    island: 'Oahu',
    latitude: 21.3500,
    longitude: -158.1278,
    description: 'Warm water from power plant attracts diverse marine life',
    difficulty: 'Medium',
    bestTime: 'Early morning (7-9 AM)'
  },
  {
    id: 'sandbar',
    name: 'Kaneohe Sandbar',
    island: 'Oahu',
    latitude: 21.4467,
    longitude: -157.7850,
    description: 'Shallow sandbar with calm, clear waters',
    difficulty: 'Easy',
    bestTime: 'Low tide, morning'
  },
  // Maui
  {
    id: 'molokini-crater',
    name: 'Molokini Crater',
    island: 'Maui',
    latitude: 20.6306,
    longitude: -156.4950,
    description: 'Volcanic crater with crystal clear water and abundant fish',
    difficulty: 'Easy',
    bestTime: 'Early morning (before 10 AM)'
  },
  {
    id: 'honolua-bay',
    name: 'Honolua Bay',
    island: 'Maui',
    latitude: 21.0167,
    longitude: -156.6400,
    description: 'Protected marine life conservation area with excellent visibility',
    difficulty: 'Medium',
    bestTime: 'Summer (calm conditions)'
  },
  {
    id: 'black-rock',
    name: 'Black Rock (Kaanapali)',
    island: 'Maui',
    latitude: 20.9239,
    longitude: -156.6939,
    description: 'Cliff diving spot with good visibility and sea turtles',
    difficulty: 'Easy',
    bestTime: 'Morning (8-11 AM)'
  },
  {
    id: 'napili-bay',
    name: 'Napili Bay',
    island: 'Maui',
    latitude: 20.9703,
    longitude: -156.6758,
    description: 'Calm waters perfect for beginners',
    difficulty: 'Easy',
    bestTime: 'Morning (8-10 AM)'
  },
  {
    id: 'turtle-town',
    name: 'Turtle Town (Makena)',
    island: 'Maui',
    latitude: 20.6044,
    longitude: -156.4475,
    description: 'Known for frequent sea turtle sightings',
    difficulty: 'Medium',
    bestTime: 'Morning (8-10 AM)'
  },
  // Big Island
  {
    id: 'kealakekua-bay',
    name: 'Kealakekua Bay',
    island: 'Big Island',
    latitude: 19.4761,
    longitude: -155.9233,
    description: 'Historical site with excellent visibility and dolphins',
    difficulty: 'Medium',
    bestTime: 'Morning (7-10 AM)'
  },
  {
    id: 'two-step',
    name: 'Two Step (Honaunau Bay)',
    island: 'Big Island',
    latitude: 19.4278,
    longitude: -155.8994,
    description: 'Easy entry point with great marine life and visibility',
    difficulty: 'Easy',
    bestTime: 'Morning (8-10 AM)'
  },
  {
    id: 'kahaluu-beach',
    name: 'Kahaluu Beach Park',
    island: 'Big Island',
    latitude: 19.5831,
    longitude: -155.9678,
    description: 'Protected bay ideal for beginners with abundant fish',
    difficulty: 'Easy',
    bestTime: 'Morning (8-11 AM)'
  },
  {
    id: 'kapoho-tide-pools',
    name: 'Kapoho Tide Pools',
    island: 'Big Island',
    latitude: 19.4928,
    longitude: -154.8186,
    description: 'Shallow tide pools with colorful fish and coral',
    difficulty: 'Easy',
    bestTime: 'Low tide, morning'
  },
  // Kauai
  {
    id: 'tunnels-beach',
    name: 'Tunnels Beach (Makua Beach)',
    island: 'Kauai',
    latitude: 22.2231,
    longitude: -159.5436,
    description: 'Reef system with tunnels and caves, excellent visibility',
    difficulty: 'Medium',
    bestTime: 'Summer mornings (calm conditions)'
  },
  {
    id: 'kee-beach',
    name: "Ke'e Beach",
    island: 'Kauai',
    latitude: 22.2189,
    longitude: -159.5867,
    description: 'Northernmost beach on Napali Coast with clear waters',
    difficulty: 'Easy',
    bestTime: 'Summer (calm conditions)'
  },
  {
    id: 'anini-beach',
    name: 'Anini Beach',
    island: 'Kauai',
    latitude: 22.2292,
    longitude: -159.4475,
    description: 'Long reef with calm waters, perfect for beginners',
    difficulty: 'Easy',
    bestTime: 'Summer (calm conditions)'
  },
  {
    id: 'poipu-beach',
    name: 'Poipu Beach',
    island: 'Kauai',
    latitude: 21.8750,
    longitude: -159.4475,
    description: 'Protected beach with good snorkeling conditions',
    difficulty: 'Easy',
    bestTime: 'Morning (8-11 AM)'
  },
  // Lanai
  {
    id: 'cathedrals',
    name: 'Cathedrals (Lanai)',
    island: 'Lanai',
    latitude: 20.9028,
    longitude: -156.9000,
    description: 'Underwater lava formations creating cathedral-like structures',
    difficulty: 'Difficult',
    bestTime: 'Morning (requires boat access)'
  },
  {
    id: 'hulopoe-beach',
    name: 'Hulopoe Beach',
    island: 'Lanai',
    latitude: 20.7514,
    longitude: -156.8981,
    description: 'Marine preserve with excellent snorkeling',
    difficulty: 'Medium',
    bestTime: 'Morning (8-10 AM)'
  },
  // Molokai
  {
    id: 'moku-hooniki',
    name: 'Moku Hooniki',
    island: 'Molokai',
    latitude: 21.0917,
    longitude: -157.0017,
    description: 'Remote snorkel spot with pristine conditions',
    difficulty: 'Difficult',
    bestTime: 'Calm weather conditions'
  }
];

export const getBeachById = (id: string): Beach | undefined => {
  return BEACHES.find(beach => beach.id === id);
};

export const getBeachesByIsland = (island: Beach['island']): Beach[] => {
  return BEACHES.filter(beach => beach.island === island);
};

export const getAllIslands = (): Island[] => {
  return Array.from(new Set(BEACHES.map(beach => beach.island)));
};


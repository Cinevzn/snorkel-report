# Hawaii Snorkel Conditions Forecast Dashboard

A comprehensive dashboard for forecasting snorkeling conditions at Hawaii's best snorkel beaches, built with Next.js 16 and Material UI v7.

## Features

- 🏖️ **17+ Snorkel Beaches** across Hawaii's main islands (Oahu, Maui, Big Island, Kauai, Lanai, Molokai)
- 📊 **Real-time Conditions** with detailed metrics:
  - Visibility scores
  - Wave height and period
  - Water temperature
  - Wind conditions
  - Current speeds
  - Safety assessments
- 🎯 **Smart Recommendations** based on multiple factors (Excellent/Good/Fair/Poor/Unsafe)
- 🔍 **Search & Filter** by island or beach name
- 📱 **Fully Responsive** design that works on all devices
- ⚡ **Fast Performance** with Next.js App Router and optimized rendering

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **UI Library**: Material UI (MUI) v7.3.6
- **Language**: TypeScript
- **Styling**: Emotion (MUI's default)
- **State Management**: React Hooks
- **Data Fetching**: Custom API layer (currently using mock data)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd test-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Set up environment variables:

```bash
cp .env.local.example .env.local
# Edit .env.local with your API keys
```

Currently, the app uses mock data for demonstration purposes. To integrate real APIs, you'll need:

- **OpenWeatherMap API Key** - for weather data
- **Stormglass API Key** (optional) - for marine weather
- **NOAA API** - public, no key needed

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
test-dashboard/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main dashboard page
├── components/            # React components
│   ├── beaches/          # Beach-related components
│   ├── conditions/       # Condition display components
│   ├── layout/           # Layout components (Header, Sidebar, etc.)
│   ├── providers/        # Context providers
│   └── ui/               # Reusable UI components
├── lib/                   # Utilities and configurations
│   ├── api/              # API integration layer
│   ├── data/             # Static data (beach locations)
│   ├── theme.ts          # MUI theme configuration
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
└── public/               # Static assets
```

## Beach Data

The dashboard includes 17 snorkel beaches across Hawaii:

- **Oahu**: Hanauma Bay, Sharks Cove, Electric Beach, Kaneohe Sandbar
- **Maui**: Molokini Crater, Honolua Bay, Black Rock, Napili Bay, Turtle Town
- **Big Island**: Kealakekua Bay, Two Step, Kahaluu Beach, Kapoho Tide Pools
- **Kauai**: Tunnels Beach, Ke'e Beach, Anini Beach, Poipu Beach
- **Lanai**: Cathedrals, Hulopoe Beach
- **Molokai**: Moku Hooniki

Each beach includes:

- GPS coordinates (latitude/longitude)
- Difficulty level (Easy/Medium/Difficult)
- Best time to visit
- Description

## Conditions Scoring

The app calculates snorkel conditions based on multiple factors:

- **Visibility Score** (0-100): Based on wave height, wind speed, and water clarity
- **Safety Score** (0-100): Based on wave height, wind speed, and current strength
- **Overall Score** (0-100): Weighted combination of visibility and safety
- **Recommendation**: Excellent / Good / Fair / Poor / Unsafe

## Future Enhancements

- [ ] Real API integration (OpenWeatherMap, NOAA, Stormglass)
- [ ] Interactive map with beach locations
- [ ] 7-day forecast charts
- [ ] Historical data trends
- [ ] User favorites/bookmarks
- [ ] Email/SMS alerts for good conditions
- [ ] User-submitted condition reports
- [ ] Photo galleries for each beach
- [ ] Tide charts integration
- [ ] Mobile app (React Native)

## API Integration Notes

To integrate real APIs, update the files in `lib/api/`:

1. `conditionsApi.ts` - Replace mock data functions with real API calls
2. Add your API keys to `.env.local`
3. Implement proper error handling and rate limiting
4. Add caching for API responses

Recommended APIs:

- **Weather**: OpenWeatherMap, WeatherAPI
- **Ocean Conditions**: NOAA Tides & Currents, Stormglass, Surfline
- **Tides**: NOAA Tides API (free, public)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Material UI](https://mui.com/)
- Beach data compiled from various sources

'use client';

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import {
  Visibility,
  Waves,
  WaterDrop,
  Air,
  Thermostat,
  Speed,
} from '@mui/icons-material';
import { BeachConditions } from '@/lib/types';
import {
  formatTemperature,
  formatDistance,
  formatWaveHeight,
  formatSpeed,
  getRecommendationColor,
} from '@/lib/utils/formatData';

interface ConditionsCardProps {
  beach: BeachConditions;
}

export default function ConditionsCard({ beach }: ConditionsCardProps) {
  const recommendationColor = getRecommendationColor(beach.snorkel.recommendation);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            Current Conditions
          </Typography>
          <Chip
            label={beach.snorkel.recommendation}
            color={recommendationColor}
            size="medium"
            sx={{ fontWeight: 600, fontSize: '0.95rem' }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Snorkel Conditions */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
              Snorkeling Conditions
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Visibility
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Visibility fontSize="small" color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    {formatDistance(beach.snorkel.visibility)}m
                  </Typography>
                </Box>
                <Chip
                  label={beach.snorkel.factors.visibility}
                  size="small"
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Safety Score
                </Typography>
                <Typography variant="h6" fontWeight={600} sx={{ mt: 0.5 }}>
                  {beach.snorkel.safetyScore}/100
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Overall Score
                </Typography>
                <Typography variant="h6" fontWeight={600} sx={{ mt: 0.5 }}>
                  {beach.snorkel.overallScore}/100
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* Ocean Conditions */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
              Ocean Conditions
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Wave Height
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Waves fontSize="small" color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    {formatWaveHeight(beach.ocean.waveHeight)}
                  </Typography>
                </Box>
                <Chip
                  label={beach.snorkel.factors.waveHeight}
                  size="small"
                  color={beach.snorkel.factors.waveHeight === 'Safe' ? 'success' : 'warning'}
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Water Temperature
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Thermostat fontSize="small" color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    {formatTemperature(beach.ocean.waterTemperature)}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Current Speed
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Speed fontSize="small" color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    {formatSpeed(beach.ocean.currentSpeed)}
                  </Typography>
                </Box>
                <Chip
                  label={beach.snorkel.factors.currents}
                  size="small"
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Wave Period
                </Typography>
                <Typography variant="h6" fontWeight={600} sx={{ mt: 0.5 }}>
                  {beach.ocean.wavePeriod.toFixed(0)}s
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* Weather Conditions */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
              Weather Conditions
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Temperature
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Thermostat fontSize="small" color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    {formatTemperature(beach.weather.temperature)}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Wind Speed
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Air fontSize="small" color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    {formatSpeed(beach.weather.windSpeed * 0.868976)} mph
                  </Typography>
                </Box>
                <Chip
                  label={beach.snorkel.factors.wind}
                  size="small"
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Condition
                </Typography>
                <Typography variant="h6" fontWeight={600} sx={{ mt: 0.5 }}>
                  {beach.weather.condition}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Humidity
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <WaterDrop fontSize="small" color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    {Math.round(beach.weather.humidity)}%
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Warnings */}
          {beach.snorkel.warnings && beach.snorkel.warnings.length > 0 && (
            <>
              <Divider />
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'warning.light',
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Warnings & Advisories
                </Typography>
                {beach.snorkel.warnings.map((warning, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    • {warning}
                  </Typography>
                ))}
              </Box>
            </>
          )}

          {/* Best Time Window */}
          {beach.snorkel.bestTimeWindow && (
            <>
              <Divider />
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'success.light',
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Best Time to Visit
                </Typography>
                <Typography variant="body2">
                  {beach.snorkel.bestTimeWindow.start} - {beach.snorkel.bestTimeWindow.end}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

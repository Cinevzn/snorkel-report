'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { getRecommendationColor } from '@/lib/utils/formatData';

interface ConditionsIndicatorProps {
  score: number;
  recommendation: string;
  size?: number;
  thickness?: number;
}

export default function ConditionsIndicator({
  score,
  recommendation,
  size = 120,
  thickness = 8,
}: ConditionsIndicatorProps) {
  const color = getRecommendationColor(recommendation);
  const normalizedScore = score / 100;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <CircularProgress
        variant="determinate"
        value={normalizedScore * 100}
        size={size}
        thickness={thickness}
        color={color}
        sx={{
          transform: 'rotate(-90deg)',
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" component="div" fontWeight={600}>
          {score}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          / 100
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }} color={`${color}.main`}>
        {recommendation}
      </Typography>
    </Box>
  );
}


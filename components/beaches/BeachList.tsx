'use client';

import { Box, Typography } from '@mui/material';
import { BeachConditions } from '@/lib/types';
import BeachCard from './BeachCard';

interface BeachListProps {
  beaches: BeachConditions[];
  onBeachClick?: (beach: BeachConditions) => void;
  loading?: boolean;
}

export default function BeachList({ beaches, onBeachClick, loading }: BeachListProps) {
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Loading beach conditions...
        </Typography>
      </Box>
    );
  }

  if (beaches.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          No beaches found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 3,
      }}
    >
      {beaches.map((beach) => (
        <BeachCard
          key={beach.id}
          beach={beach}
          onClick={onBeachClick ? () => onBeachClick(beach) : undefined}
        />
      ))}
    </Box>
  );
}

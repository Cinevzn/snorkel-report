'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Rating,
} from '@mui/material';
import {
  LocationOn,
  Waves,
  Visibility,
  Warning,
} from '@mui/icons-material';
import Image from 'next/image';
import { BeachConditions } from '@/lib/types';
import { formatTemperature, getRecommendationColor, getDifficultyColor, formatDistance } from '@/lib/utils/formatData';
import { getBeachImage } from '@/lib/utils/beachImages';

interface BeachCardProps {
  beach: BeachConditions;
  onClick?: () => void;
}

export default function BeachCard({ beach, onClick }: BeachCardProps) {
  const router = useRouter();
  const recommendationColor = getRecommendationColor(beach.snorkel.recommendation);
  const imageUrl = getBeachImage(beach.id, beach.name, beach.island);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/beach/${beach.id}`);
    }
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
      onClick={handleClick}
    >
      {/* Beach Image */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 200,
          overflow: 'hidden',
        }}
      >
        <Image
          src={imageUrl}
          alt={beach.name}
          fill
          style={{ objectFit: 'cover' }}
          unoptimized // Unsplash Source API doesn't work well with Next.js Image optimization
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <Chip
            label={beach.snorkel.recommendation}
            color={recommendationColor}
            size="small"
            sx={{ fontWeight: 600, backdropFilter: 'blur(4px)', bgcolor: 'rgba(255, 255, 255, 0.9)' }}
          />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 0.5 }}>
            {beach.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {beach.island}
            </Typography>
          </Box>
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2, 
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {beach.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Visibility fontSize="small" color="primary" />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Visibility
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatDistance(beach.snorkel.visibility)}m
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Waves fontSize="small" color="primary" />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Waves
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {beach.ocean.waveHeight.toFixed(1)} ft
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
          <Chip
            label={beach.difficulty}
            size="small"
            color={getDifficultyColor(beach.difficulty)}
            variant="outlined"
          />
          <Chip
            label={formatTemperature(beach.ocean.waterTemperature)}
            size="small"
            variant="outlined"
          />
        </Box>

        {beach.snorkel.warnings && beach.snorkel.warnings.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
              mt: 1,
              p: 1,
              bgcolor: 'warning.light',
              borderRadius: 1,
            }}
          >
            <Warning fontSize="small" color="warning" />
            <Typography variant="caption" color="text.secondary">
              {beach.snorkel.warnings[0]}
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Overall Score
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating
                value={beach.snorkel.overallScore / 20}
                readOnly
                size="small"
                precision={0.1}
              />
              <Typography variant="body2" fontWeight={600}>
                {beach.snorkel.overallScore}/100
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Typography, Button, Container } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Image from 'next/image';
import ConditionsCard from '@/components/conditions/ConditionsCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { fetchBeachConditions } from '@/lib/api/conditionsApi';
import { BeachConditions } from '@/lib/types';
import { getBeachImage } from '@/lib/utils/beachImages';

export default function BeachDetailPage() {
  const params = useParams();
  const router = useRouter();
  const beachId = params.id as string;
  
  const [beach, setBeach] = useState<BeachConditions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBeach = async () => {
      if (!beachId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchBeachConditions(beachId);
        if (data) {
          setBeach(data);
        } else {
          setError('Beach not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load beach conditions');
        console.error('Error loading beach:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBeach();
  }, [beachId]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LoadingSpinner message="Loading beach conditions..." />
      </Container>
    );
  }

  if (error || !beach) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push('/')}
          sx={{ mb: 3 }}
        >
          Back to Beaches
        </Button>
        <ErrorMessage
          title="Failed to load beach"
          message={error || 'Beach not found'}
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  const imageUrl = getBeachImage(beach.id, beach.name, beach.island);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => router.push('/')}
        sx={{ mb: 3 }}
      >
        Back to Beaches
      </Button>

      {/* Beach Header with Image */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 300, md: 400 },
            borderRadius: 2,
            overflow: 'hidden',
            mb: 3,
            boxShadow: 3,
          }}
        >
          <Image
            src={imageUrl}
            alt={beach.name}
            fill
            style={{ objectFit: 'cover' }}
            priority
            unoptimized // Unsplash Source API doesn't work well with Next.js Image optimization
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              p: 3,
            }}
          >
            <Typography variant="h3" component="h1" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
              {beach.name}
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', opacity: 0.9 }}>
              {beach.island}
            </Typography>
          </Box>
        </Box>

        {/* Beach Info */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', fontSize: '1.1rem' }}>
            {beach.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Difficulty:</strong> {beach.difficulty}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Best Time:</strong> {beach.bestTime}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Conditions Card */}
      <ConditionsCard beach={beach} />
    </Container>
  );
}


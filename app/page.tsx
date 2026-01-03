'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Container } from '@mui/material';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BeachList from '@/components/beaches/BeachList';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { fetchAllBeachConditions } from '@/lib/api/conditionsApi';
import { BeachConditions, Island } from '@/lib/types';

export default function Home() {
  const [beaches, setBeaches] = useState<BeachConditions[]>([]);
  const [islandFilter, setIslandFilter] = useState<Island | 'All'>('All');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBeaches = useCallback(async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      const data = await fetchAllBeachConditions();
      setBeaches(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load beach conditions');
      console.error('Error loading beaches:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadBeaches();
  }, [loadBeaches]);

  const handleRefresh = () => {
    loadBeaches(true);
  };

  const handleIslandFilter = (island: Island | 'All') => {
    setIslandFilter(island);
  };

  const filteredBeaches = islandFilter === 'All'
    ? beaches
    : beaches.filter(beach => beach.island === islandFilter);

  if (error && beaches.length === 0) {
    return (
      <DashboardLayout
        onRefresh={handleRefresh}
        refreshing={refreshing}
        filterByIsland={handleIslandFilter}
        currentIslandFilter={islandFilter}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <ErrorMessage
            title="Failed to load conditions"
            message={error}
            onRetry={() => loadBeaches()}
          />
        </Container>
      </DashboardLayout>
    );
  }

  if (loading && beaches.length === 0) {
    return (
      <DashboardLayout
        onRefresh={handleRefresh}
        refreshing={refreshing}
        filterByIsland={handleIslandFilter}
        currentIslandFilter={islandFilter}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <LoadingSpinner message="Loading beach conditions..." />
        </Container>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      onRefresh={handleRefresh}
      refreshing={refreshing}
      filterByIsland={handleIslandFilter}
      currentIslandFilter={islandFilter}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            Hawaii Snorkel Beaches
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Click on any beach to view current snorkeling conditions
          </Typography>
        </Box>

        {error && (
          <Box sx={{ mb: 3 }}>
            <ErrorMessage
              title="Warning"
              message={error}
              onRetry={() => loadBeaches()}
            />
          </Box>
        )}

        <BeachList
          beaches={filteredBeaches}
          loading={refreshing}
        />
      </Container>
    </DashboardLayout>
  );
}

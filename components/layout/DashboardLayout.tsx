'use client';

import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import { Beach, Island } from '@/lib/types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  selectedBeachId?: string;
  onBeachSelect?: (beach: Beach) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  filterByIsland?: (island: Island | 'All') => void;
  currentIslandFilter?: Island | 'All';
}

export default function DashboardLayout({
  children,
  selectedBeachId,
  onBeachSelect,
  onRefresh,
  refreshing,
  filterByIsland,
  currentIslandFilter,
}: DashboardLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onRefresh={onRefresh} refreshing={refreshing} />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          selectedBeachId={selectedBeachId}
          onBeachSelect={onBeachSelect}
          filterByIsland={filterByIsland}
          currentIslandFilter={currentIslandFilter}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            bgcolor: 'background.default',
            p: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}


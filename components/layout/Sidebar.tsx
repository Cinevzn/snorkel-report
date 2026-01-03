'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  BeachAccess,
  Search,
  FilterList,
} from '@mui/icons-material';
import { BEACHES, getAllIslands } from '@/lib/data/beaches';
import { Beach, Island } from '@/lib/types';

const DRAWER_WIDTH = 280;

interface SidebarProps {
  selectedBeachId?: string;
  onBeachSelect?: (beach: Beach) => void;
  filterByIsland?: (island: Island | 'All') => void;
  currentIslandFilter?: Island | 'All';
}

export default function Sidebar({
  selectedBeachId,
  onBeachSelect,
  filterByIsland,
  currentIslandFilter = 'All',
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const islands = getAllIslands();

  const filteredBeaches = BEACHES.filter(beach => {
    const matchesSearch = beach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beach.island.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIsland = currentIslandFilter === 'All' || beach.island === currentIslandFilter;
    return matchesSearch && matchesIsland;
  });

  const handleBeachClick = (beach: Beach) => {
    if (onBeachSelect) {
      onBeachSelect(beach);
    } else {
      router.push(`/beach/${beach.id}`);
    }
  };

  // Determine selected beach from pathname if not provided
  const currentBeachId = selectedBeachId || (pathname?.startsWith('/beach/') ? pathname.split('/')[2] : undefined);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Beaches
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Search beaches..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        {filterByIsland && (
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            <Chip
              label="All"
              size="small"
              onClick={() => filterByIsland('All')}
              color={currentIslandFilter === 'All' ? 'primary' : 'default'}
              variant={currentIslandFilter === 'All' ? 'filled' : 'outlined'}
            />
            {islands.map(island => (
              <Chip
                key={island}
                label={island}
                size="small"
                onClick={() => filterByIsland(island)}
                color={currentIslandFilter === island ? 'primary' : 'default'}
                variant={currentIslandFilter === island ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        )}
      </Box>
      <Divider />
      <List sx={{ overflow: 'auto', flex: 1 }}>
        {filteredBeaches.map((beach) => (
          <ListItem key={beach.id} disablePadding>
            <ListItemButton
              selected={currentBeachId === beach.id}
              onClick={() => handleBeachClick(beach)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.main',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon>
                <BeachAccess />
              </ListItemIcon>
              <ListItemText
                primary={beach.name}
                secondary={beach.island}
              />
            </ListItemButton>
          </ListItem>
        ))}
        {filteredBeaches.length === 0 && (
          <ListItem>
            <ListItemText
              primary="No beaches found"
              secondary="Try a different search"
            />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}


'use client';

import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { WbSunny, Refresh } from '@mui/icons-material';
import { format } from 'date-fns';

interface HeaderProps {
  onRefresh?: () => void;
  refreshing?: boolean;
}

export default function Header({ onRefresh, refreshing = false }: HeaderProps) {
  const currentTime = format(new Date(), 'EEEE, MMMM dd, yyyy • h:mm a');

  return (
    <AppBar position="static" elevation={1} sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <WbSunny sx={{ mr: 2, fontSize: 32 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Hawaii Snorkel Conditions
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            {currentTime}
          </Typography>
        </Box>
        {onRefresh && (
          <IconButton
            color="inherit"
            onClick={onRefresh}
            disabled={refreshing}
            aria-label="refresh conditions"
          >
            <Refresh sx={{ animation: refreshing ? 'spin 2s linear infinite' : 'none' }} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}


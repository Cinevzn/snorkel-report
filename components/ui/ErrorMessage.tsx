import { Alert, AlertTitle, Box, Button } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ title = 'Error', message, onRetry }: ErrorMessageProps) {
  return (
    <Box sx={{ p: 3 }}>
      <Alert severity="error" icon={<ErrorOutline />}>
        <AlertTitle>{title}</AlertTitle>
        {message}
        {onRetry && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Refresh />}
              onClick={onRetry}
              size="small"
            >
              Retry
            </Button>
          </Box>
        )}
      </Alert>
    </Box>
  );
}


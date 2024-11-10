import React from 'react';
import { Box, LinearProgress } from '@mui/material';

function ProgressBar({ progress }) {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <LinearProgress variant="determinate" value={Math.min(progress, 100)} color="success"/>
    </Box>
  );
}

export default ProgressBar;
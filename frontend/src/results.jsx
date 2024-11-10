import React from 'react';
import { Box, Typography } from '@mui/material';

function Results({ accuracy, timeTaken, children }) {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4">Results:</Typography>
      <Typography variant="h4">Accuracy: {accuracy}%</Typography>
      <Typography variant="h4">Time Taken: {timeTaken} seconds</Typography>
      {children}
    </Box>
  );
}

export default Results;

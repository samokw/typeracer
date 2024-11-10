import React from 'react';
import { Typography, Button, Box } from '@mui/material';

function Results({ wpm }) {
  const handleRestart = () => {
    window.location.reload(); // Simple way to restart the game
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Race Finished!
      </Typography>
      <Typography variant="h6">Your WPM: {wpm}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRestart}
        sx={{ mt: 2 }}
      >
        Restart
      </Button>
    </Box>
  );
}

export default Results;
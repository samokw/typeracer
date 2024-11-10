import React from 'react';
import { Button, Box, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';

function Home({ darkMode, toggleDarkMode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <IconButton onClick={toggleDarkMode} color="inherit" sx={{ position: 'absolute', top: 16, right: 16 }}>
        {darkMode ? <Brightness7 sx={{ fontSize: 60 }} /> : <Brightness4 sx={{ fontSize: 60 }} />}
      </IconButton>

      <Typography variant="h1" gutterBottom sx={{marginTop: 4}}>
        Welcome to Alphanetic
      </Typography>
      <Typography variant="h5" gutterBottom sx={{marginTop: 4}}>
        Learn Your Phonetic Alphabet
      </Typography>
      <Button variant="contained" color="inherit" component={Link} to="/alphabet" sx={{ marginTop: 4 }}>
        Phonetic Alphabet Table
      </Button>
      <Button variant="contained" color="inherit" component={Link} to="/flashcards" sx={{ marginTop: 4 }}>
        Flashcards for Vocal Practice of your Phonetic Alphabet
      </Button>
      <Button variant="contained" color="inherit" component={Link} to="/typeracer" sx={{ marginTop: 4 }}>
        Start Typing Race to Practice your Memorization
      </Button>
    </Box>
  );
}

export default Home;
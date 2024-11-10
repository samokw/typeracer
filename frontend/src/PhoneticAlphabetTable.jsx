import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
} from '@mui/material';
import { Home, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const phoneticAlphabet = [
  { letter: 'A', word: 'Alpha' },
  { letter: 'B', word: 'Bravo' },
  { letter: 'C', word: 'Charlie' },
  { letter: 'D', word: 'Delta' },
  { letter: 'E', word: 'Echo' },
  { letter: 'F', word: 'Foxtrot' },
  { letter: 'G', word: 'Golf' },
  { letter: 'H', word: 'Hotel' },
  { letter: 'I', word: 'India' },
  { letter: 'J', word: 'Juliett' },
  { letter: 'K', word: 'Kilo' },
  { letter: 'L', word: 'Lima' },
  { letter: 'M', word: 'Mike' },
  { letter: 'N', word: 'November' },
  { letter: 'O', word: 'Oscar' },
  { letter: 'P', word: 'Papa' },
  { letter: 'Q', word: 'Quebec' },
  { letter: 'R', word: 'Romeo' },
  { letter: 'S', word: 'Sierra' },
  { letter: 'T', word: 'Tango' },
  { letter: 'U', word: 'Uniform' },
  { letter: 'V', word: 'Victor' },
  { letter: 'W', word: 'Whiskey' },
  { letter: 'X', word: 'X-ray' },
  { letter: 'Y', word: 'Yankee' },
  { letter: 'Z', word: 'Zulu' },
];

function PhoneticAlphabetTable({ darkMode, toggleDarkMode }) {
  // Split the alphabet into two halves
  const midIndex = Math.ceil(phoneticAlphabet.length / 2);
  const firstHalf = phoneticAlphabet.slice(0, midIndex);
  const secondHalf = phoneticAlphabet.slice(midIndex);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        color: darkMode ? '#FFFFFF' : '#000000',
        padding: 3,
      }}
    >
      {/* Home Icon */}
      <IconButton
        component={Link}
        to="/"
        color="inherit"
        sx={{ position: 'absolute', top: 16, left: 16 }}
      >
        <Home sx={{ fontSize: 60 }} />
      </IconButton>

      {/* Dark Mode Toggle */}
      <IconButton
        onClick={toggleDarkMode}
        color="inherit"
        sx={{ position: 'absolute', top: 16, right: 16 }}
      >
        {darkMode ? (
          <Brightness7 sx={{ fontSize: 60 }} />
        ) : (
          <Brightness4 sx={{ fontSize: 60 }} />
        )}
      </IconButton>

      {/* Page Title */}
      <Typography
        variant="h1"
        align="center"
        gutterBottom
        sx={{ fontSize: '3.2em', lineHeight: '2' }}
      >
        Phonetic Alphabet Table
      </Typography>

      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={12} md={6}>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: 500,
              margin: '0 auto',
              backgroundColor: darkMode ? '#1E1E1E' : '#FFFFFF',
            }}
          >
            <Table>
              <TableBody>
                {firstHalf.map((entry) => (
                  <TableRow key={entry.letter}>
                    <TableCell align="center">
                      <Typography variant="h6">{entry.letter}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">{entry.word}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: 500,
              margin: '0 auto',
              backgroundColor: darkMode ? '#1E1E1E' : '#FFFFFF',
            }}
          >
            <Table>
              <TableBody>
                {secondHalf.map((entry) => (
                  <TableRow key={entry.letter}>
                    <TableCell align="center">
                      <Typography variant="h6">{entry.letter}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">{entry.word}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PhoneticAlphabetTable;
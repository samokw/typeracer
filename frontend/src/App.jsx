import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './Home';
import TypeRacer from './typeRacer';
import FlashcardsPage from './flashcardPage';
import PhoneticAlphabetTable from './PhoneticAlphabetTable';

function App() {
  // Set initial dark mode based on localStorage or default to light mode
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  // Toggle dark mode and save preference to localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      localStorage.setItem('darkMode', !prevMode);
      return !prevMode;
    });
  };

  // Define the theme based on darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      ...(darkMode
        ? {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
            },
          }
        : {
            background: {
              default: '#ffffff',
              paper: '#f5f5f5',
            },
            text: {
              primary: '#000000',
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/typeracer" element={<TypeRacer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/flashcards" element={<FlashcardsPage darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>} />
          <Route path="/alphabet" element={<PhoneticAlphabetTable darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
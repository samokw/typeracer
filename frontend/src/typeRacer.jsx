import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, Button, IconButton, TextField } from '@mui/material';
import { Brightness4, Brightness7, Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import TextDisplay from './textDisplay';
import ProgressBar from './progressbar';
import Results from './results';
import { phoneticAlphabet } from './AlphaPhonetic';

function TypeRacer({ darkMode, toggleDarkMode }) {
    const [text, setText] = useState('Hi Hi'); // Use uppercase for consistency
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
  
    const typingAreaRef = useRef(null);
  
    useEffect(() => {
      if (typingAreaRef.current) {
        typingAreaRef.current.focus();
      }
    }, [currentLetterIndex]);
  
    const handleInputChange = (e) => {
      const input = e.target.value;
      setUserInput(input);
  
      const currentChar = text[currentLetterIndex];
  
      // If the user types a space and the current character is a space
      if (input === ' ' && currentChar === ' ') {
        setErrorMessage('');
        if (currentLetterIndex === 0 && !startTime) {
          setStartTime(new Date());
        }
        // Move to next character
        setCurrentLetterIndex(currentLetterIndex + 1);
        setUserInput('');
  
        if (currentLetterIndex + 1 === text.length) {
          // Finished all characters
          setIsFinished(true);
          calculateWPM();
        }
      }
    };
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        checkInput();
      }
    };
  
    const checkInput = () => {
      const currentChar = text[currentLetterIndex];
  
      // If the current character is a space, we already handle it in handleInputChange
      if (currentChar === ' ') {
        return;
      }
  
      const currentLetter = currentChar.toUpperCase();
  
      // Find the phonetic word from the phoneticAlphabet array
      const phoneticEntry = phoneticAlphabet.find(
        (entry) => entry.letter === currentLetter
      );
  
      const expectedWord = phoneticEntry ? phoneticEntry.word : '';
  
      if (userInput.trim().toLowerCase() === expectedWord.toLowerCase()) {
        // Correct input
        setErrorMessage('');
        if (currentLetterIndex === 0 && !startTime) {
          setStartTime(new Date());
        }
        // Move to next character
        setCurrentLetterIndex(currentLetterIndex + 1);
        setUserInput('');
  
        if (currentLetterIndex + 1 === text.length) {
          // Finished all characters
          setIsFinished(true);
          calculateWPM();
        }
      } else {
        // Incorrect input
        setErrorMessage('Incorrect. Try again.');
        setUserInput('');
      }
    };
  
    const calculateWPM = () => {
      const endTime = new Date();
      const timeDiff = (endTime - startTime) / 1000 / 60; // Time in minutes
      const wordsTyped = text.replace(/\s/g, '').length; // Exclude spaces
      setWpm(Math.round(wordsTyped / timeDiff));
    };
  
    const progress = (currentLetterIndex / text.length) * 100;
  
    const onRestart = () => {
      setUserInput('');
      setStartTime(null);
      setIsFinished(false);
      setWpm(0);
      setCurrentLetterIndex(0);
      setErrorMessage('');
      if (typingAreaRef.current) {
        typingAreaRef.current.focus();
      }
    };
  
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          width: '100%',
          padding: 2,
        }}
      >
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
  
        <IconButton
          component={Link}
          to="/"
          color="inherit"
          sx={{ position: 'absolute', top: 16, left: 16 }}
        >
          <Home sx={{ fontSize: 60 }} />
        </IconButton>
  
        <Typography variant="h1" sx={{ fontSize: '3.2em', lineHeight: '2' }} gutterBottom>
          Alphanetic Typeracer
        </Typography>
  
        <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
          <TextDisplay text={text} currentLetterIndex={currentLetterIndex} />
          <TextField
            inputRef={typingAreaRef}
            fullWidth
            variant="outlined"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isFinished}
            placeholder="Type the phonetic word and press Enter..."
            sx={{
              mt: 2,
              '& .MuiInputBase-input': {
                fontSize: '1.5rem',
              },
            }}
          />
          {errorMessage && (
            <Typography color="error" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}
          <ProgressBar progress={progress} />
        </Box>
  
        {isFinished && (
          <Results wpm={wpm}>
            <Button
              onClick={onRestart}
              sx={{ marginTop: 2, padding: '0.6em 1.2em', borderRadius: '8px', fontSize: '1em' }}
            >
              Restart
            </Button>
          </Results>
        )}
      </Box>
    );
  }
  
  export default TypeRacer;

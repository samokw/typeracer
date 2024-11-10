import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, Button, IconButton, TextField } from '@mui/material';
import { Brightness4, Brightness7, Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import TextDisplay from './textDisplay';
import ProgressBar from './progressbar';
import Results from './results';
import { phoneticAlphabet } from './AlphaPhonetic';

function TypeRacer({ darkMode, toggleDarkMode }) {
  const [inputStatus, setInputStatus] = useState([]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [hasStarted, setHasStarted] = useState(false); // New state variable
  const [isFinished, setIsFinished] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/quote');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const calculateResults = () => {
    const endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000; // Time in seconds
    const totalLetters = quote.replace(/\s/g, '').length; // Total non-space letters
    const correctLetters = inputStatus.filter((status) => status === 'correct').length;
    const accuracy = ((correctLetters / totalLetters) * 100).toFixed(2); // Percentage
    console.log(inputStatus);
    setAccuracy(accuracy);
    setTimeTaken(timeDiff.toFixed(2)); // in seconds
    console.log('Correct Letters:', correctLetters);
    console.log('Total Letters:', totalLetters);
  };

  const typingAreaRef = useRef(null);

  useEffect(() => {
    if (typingAreaRef.current && hasStarted && !isFinished) {
      typingAreaRef.current.focus();
    }
  }, [currentLetterIndex, hasStarted, isFinished]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      checkInput();
    }
    if (e.key === 'Backspace' && userInput === '') {
      checkPrev();
    }
  };

  const checkPrev = () => {
    if (currentLetterIndex === 0) {
      return;
    }

    let index = currentLetterIndex - 1;

    // Skip over spaces
    while (index > 0 && quote[index] === ' ') {
      index--;
    }

    // Clone the current input status
    let newStatus = [...inputStatus];

    // Reset the status of the character we're moving back to
    newStatus[index] = undefined;

    setInputStatus(newStatus);
    setCurrentLetterIndex(index);
    setUserInput('');
    setErrorMessage('');
  };

  const checkInput = () => {
    if (!quote) return; // Ensure quote is loaded

    let index = currentLetterIndex;

    // Skip spaces at the current position
    while (index < quote.length && quote[index] === ' ') {
      index++;
    }

    // Process the character at index
    if (index < quote.length) {
      let currentChar = quote[index];
      const currentLetter = currentChar.toUpperCase();

      // Find the phonetic word from the phoneticAlphabet array
      const phoneticEntry = phoneticAlphabet.find(
        (entry) => entry.letter === currentLetter
      );

      const expectedWord = phoneticEntry ? phoneticEntry.word : '';
      let newStatus = [...inputStatus];

      if (userInput.trim().toLowerCase() === expectedWord.toLowerCase()) {
        // Correct input
        newStatus[index] = 'correct';
        setErrorMessage('');
      } else {
        // Incorrect input
        newStatus[index] = 'incorrect';
      }

      setInputStatus(newStatus);

      // Move to next character
      index++;

      // Skip spaces at the next position
      while (index < quote.length && quote[index] === ' ') {
        index++;
      }

      setUserInput('');

      // Check if we have reached the end after moving to the next character
      if (index > quote.length) {
        // Finished all characters
        calculateResults();
        setIsFinished(true);
      } else {
        setCurrentLetterIndex(index);
      }
    } else {
      // If index is already beyond the quote length, finish the game
      calculateResults();
      setIsFinished(true);
    }
  };

  const progress = (currentLetterIndex / quote.length) * 100;

  const onRestart = () => {
    setUserInput('');
    setStartTime(null);
    setHasStarted(false);
    setIsFinished(false);
    setAccuracy(0);
    setTimeTaken(0);
    setCurrentLetterIndex(0);
    setErrorMessage('');
    setInputStatus([]);
    fetchQuote(); // Fetch a new quote if desired
    if (typingAreaRef.current) {
      typingAreaRef.current.focus();
    }
  };

  const handleStart = () => {
    setHasStarted(true);
    setStartTime(new Date());
    if (typingAreaRef.current) {
      typingAreaRef.current.focus();
    }
  };

  if (!quote) {
    return <Typography>Loading...</Typography>;
  }

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

      <Typography
        variant="h1"
        sx={{ fontSize: '3.2em', lineHeight: '2' }}
        gutterBottom
      >
        Alphanetic Typeracer
      </Typography>

      {!hasStarted ? (
        <Button
          onClick={handleStart}
          variant="contained"
          color="inherit"
          sx={{
            marginTop: 2,
            padding: '0.8em 2em',
            borderRadius: '8px',
            fontSize: '1.2em',
          }}
        >
          Start
        </Button>
      ) : (
        <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
          <TextDisplay
            text={quote}
            currentLetterIndex={currentLetterIndex}
            inputStatus={inputStatus}
          />
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
      )}

      {isFinished && (
        <Results accuracy={accuracy} timeTaken={timeTaken}>
          <Button
            onClick={onRestart}
            variant="contained"
            color="inherit"
            sx={{
              marginTop: 2,
              padding: '0.6em 1.2em',
              borderRadius: '8px',
              fontSize: '1em',
            }}
          >
            Restart
          </Button>
        </Results>
      )}
    </Box>
  );
}

export default TypeRacer;

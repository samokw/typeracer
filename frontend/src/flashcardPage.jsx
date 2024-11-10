// FlashcardsPage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward, Home, Brightness4, Brightness7, Mic } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function FlashcardsPage({ darkMode, toggleDarkMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [phoneticAlphabet, setPhoneticAlphabet] = useState([]);
  const [originalAlphabet, setOriginalAlphabet] = useState([]); // New state
  const [recordedText, setRecordedText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');
  const [flashcardColor, setFlashcardColor] = useState(''); // New state

  // Shuffle function
  function shuffleArray(array) {
    const shuffledArray = [...array]; // Make a copy to avoid mutating the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
  }

  useEffect(() => {
    const originalAlphabetData = [
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

    // Store the original alphabet for comparison
    setOriginalAlphabet(originalAlphabetData);

    // Shuffle and set the phonetic alphabet
    const shuffledAlphabet = shuffleArray(originalAlphabetData);
    setPhoneticAlphabet(shuffledAlphabet);
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    setRecordedText('');  // Clear previous recording text
    setFlashcardColor(''); // Reset flashcard color
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/record?duration=3');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const recognizedText = data.text.trim().toLowerCase();
      setRecordedText(data.text);

      // Get the current letter from the shuffled phoneticAlphabet
      const currentLetter = phoneticAlphabet[currentIndex].letter;

      // Find the expected word in the originalAlphabet using the currentLetter
      const expectedEntry = originalAlphabet.find(
        (entry) => entry.letter === currentLetter
      );

      const expectedWord = expectedEntry ? expectedEntry.word.trim().toLowerCase() : '';

      // Compare the recognized text with the expected word
      console.log('Recognized Text:', recognizedText);
      console.log('Expected Word:', expectedWord);
      if (recognizedText === expectedWord) {
        // Correct answer
        setFlashcardColor('green');
      } else {
        // Incorrect answer
        setFlashcardColor('red');
      }
    } catch (error) {
      console.error('Error recording:', error);
      setError('Failed to record audio');
    } finally {
      setIsRecording(false);
    }
  };

  // Navigation handlers
  const handleFlip = () => setIsFlipped(!isFlipped);

  const handlePrev = () => {
    if (phoneticAlphabet.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? phoneticAlphabet.length - 1 : prevIndex - 1
      );
      setIsFlipped(false);
      setFlashcardColor(''); // Reset flashcard color
    }
  };

  const handleNext = () => {
    if (phoneticAlphabet.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === phoneticAlphabet.length - 1 ? 0 : prevIndex + 1
      );
      setIsFlipped(false);
      setFlashcardColor(''); // Reset flashcard color
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
        p: 3,
        color: darkMode ? '#FFFFFF' : '#000000',
      }}
    >
      {/* Home Icon */}
      <IconButton component={Link} to="/" color="inherit" sx={{ position: 'absolute', top: 16, left: 16 }}>
        <Home sx={{ fontSize: 60 }} />
      </IconButton>

      {/* Dark Mode Toggle */}
      <IconButton onClick={toggleDarkMode} color="inherit" sx={{ position: 'absolute', top: 16, right: 16 }}>
        {darkMode ? <Brightness7 sx={{ fontSize: 60 }} /> : <Brightness4 sx={{ fontSize: 60 }} />}
      </IconButton>

      {/* Flashcard Header */}
      <Typography variant="h5" gutterBottom>
        Try to pronounce the word on the flashcard
      </Typography>

      {/* Flashcard Navigation and Flip */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
        <IconButton onClick={handlePrev} sx={{ color: darkMode ? '#FFFFFF' : '#000000' }}>
          <ArrowBack sx={{fontSize: 45}}/>
        </IconButton>

        {/* Flashcard Container */}
        <Box
          onClick={handleFlip}
          sx={{
            perspective: '1000px',
            width: '350px',
            height: '250px',
            mx: 2,
            cursor: 'pointer',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              textAlign: 'center',
              transition: 'transform 0.6s',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'none',
            }}
          >
            {/* Front of the Card */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                backgroundColor: flashcardColor || (darkMode ? '#333333' : '#DDDDDD'), // Use flashcardColor
                color: darkMode ? '#FFFFFF' : '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              {phoneticAlphabet.length > 0 && phoneticAlphabet[currentIndex].letter}
            </Box>

            {/* Back of the Card */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                backgroundColor: flashcardColor || (darkMode ? '#1E1E1E' : '#EEEEEE'), // Use flashcardColor
                color: darkMode ? '#FFD700' : '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                borderRadius: '8px',
                transform: 'rotateY(180deg)',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              {phoneticAlphabet.length > 0 && phoneticAlphabet[currentIndex].word}
            </Box>
          </Box>
        </Box>

        <IconButton onClick={handleNext} sx={{ color: darkMode ? '#FFFFFF' : '#000000' }}>
          <ArrowForward sx={{fontSize: 45}}/>
        </IconButton>
      </Box>

      {/* Microphone Button */}
      <IconButton sx={{ margin: 3 }} onClick={startRecording} disabled={isRecording}>
        <Mic sx={{ fontSize: 45, color: isRecording ? 'gray' : darkMode ? '#FFFFFF' : '#000000' }} />
      </IconButton>

      {/* Display any errors */}
      {error && (
        <Typography color="error" variant="body1" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default FlashcardsPage;

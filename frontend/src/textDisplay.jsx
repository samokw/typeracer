// TextDisplay.js
import React from 'react';
import { Box, Typography } from '@mui/material';

function TextDisplay({ text, currentLetterIndex }) {
  const renderText = () => {
    const textArray = text.split('');
    return textArray.map((char, index) => {
      const isCurrentLetter = index === currentLetterIndex;
      const isSpace = char === ' ';

      return (
        <Typography
          component="span"
          key={index}
          sx={{
            color: isCurrentLetter ? 'info.main' : 'text.primary',
            fontSize: '2rem',
            marginRight: '0.1em',
            textDecoration: isCurrentLetter && !isSpace ? 'underline' : 'none',
            borderBottom: isCurrentLetter && isSpace ? '2px solid currentColor' : 'none',
          }}
        >
          {isSpace ? '\u00A0' : char}
        </Typography>
      );
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        width: '800px',
        fontSize: '1.5rem',
        marginBottom: 2,
        borderRadius: 1,
        textAlign: 'center',
        backgroundColor: 'background.paper',
        whiteSpace: 'normal',
        flexWrap: 'wrap',
      }}
    >
      {renderText()}
    </Box>
  );
}

export default TextDisplay;

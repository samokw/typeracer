import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

function TextDisplay({ text, currentLetterIndex, inputStatus }) {
  const theme = useTheme();

  const renderText = () => {
    const textArray = text.split('');
    return textArray.map((char, index) => {
      const isCurrentLetter = index === currentLetterIndex;
      const isSpace = char === ' ';
      let color;
      if (index < inputStatus.length) {
        color =
          inputStatus[index] === 'correct'
            ? theme.palette.success.main 
            : theme.palette.error.main;
      } else {
        color = theme.palette.text.primary;
      }

      return (
        <Typography
          component="span"
          key={index}
          sx={{
            color: color,
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
        whiteSpace: 'nowrap',
        flexWrap: 'wrap',
      }}
    >
      {renderText()}
    </Box>
  );
}

export default TextDisplay;

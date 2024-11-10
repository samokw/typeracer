import React, { useState } from 'react';
import { Typography, Card, CardContent } from '@mui/material';

function Flashcard({ letter, word }) {
  const [showWord, setShowWord] = useState(false);

  const handleCardClick = () => {
    setShowWord((prevShowWord) => !prevShowWord);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        width: 300,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <CardContent>
        <Typography variant="h2" align="center">
          {showWord ? word : letter}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Flashcard;
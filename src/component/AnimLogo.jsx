import React from 'react';
import { Typography, Box } from '@mui/material';

const AnimLogo = () => {
  return (
    <Box
      sx={{
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        opacity: 0,
        animation: 'fadeScaleUp 1.2s ease forwards',
        '@keyframes fadeScaleUp': {
          '0%': { opacity: 0, transform: 'translateY(30px) scale(0.8)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
      }}
    >
      <Box
        component="img"
        src="/images/loca-logo.png"
        alt="LOCA Logo"
        sx={{
          width: { xs: '200px', sm: '280px', md: '350px' },
          mb: 1,
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
          borderRadius: '8px',
        }}
      />

      <Typography
        variant="h6"
        align="center"
        color="primary"
        fontWeight="bold"
        sx={{
          opacity: 0,
          animation: 'fadeInText 1s ease 1.3s forwards',
          '@keyframes fadeInText': {
            '0%': { opacity: 0, transform: 'translateY(10px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        Drive your dreams with LOCA — effortless car rental, wherever life takes you.
      </Typography>
    </Box>
  );
};

export default AnimLogo;

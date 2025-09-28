import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import LoginForm from '../component/LoginForm';
import SignupForm from '../component/SignupForm';
import AnimLogo from '../component/AnimLogo';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 

  const handleAuthSuccess = (userData) => {
    console.log('User logged in or signed up:', userData);
    navigate('/profile'); 
  };

  const handleSwitch = () => setIsLogin(!isLogin);

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: '#f0f2f5',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 4,
        alignItems: 'center',
      }}
    >
      {/* Left Section: Logo */}
      <Box display="flex" justifyContent="center">
        <AnimLogo />
      </Box>

      {/* Right Section: Auth Panel */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 3,
          p: 4,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom align="center">
          {isLogin ? 'Login to Continue' : 'Create an Account'}
        </Typography>

        {isLogin ? (
          <LoginForm onSuccess={handleAuthSuccess} onSwitchToSignup={handleSwitch} />
        ) : (
          <SignupForm onSuccess={handleAuthSuccess} onSwitchToLogin={() => setIsLogin(true)} />
        )}

        <Box textAlign="center" mt={2}>
          <Button onClick={handleSwitch} variant="outlined" size="small">
            {isLogin ? 'Go to Signup' : 'Go to Login'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;

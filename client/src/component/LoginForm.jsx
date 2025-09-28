import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { loginUserAxios } from '../Axios/userAxios';

const LoginForm = ({ onSuccess, onSwitchToSignup }) => {
  // Form state
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  // Form validation
  const validate = () => {
    const newErrors = {};

    if (!formValues.email.trim()) {
      newErrors.email = 'Please input your email!';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Invalid email format!';
    }

    if (!formValues.password.trim()) {
      newErrors.password = 'Please input your password!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      const user = await loginUserAxios(formValues.email, formValues.password);
      // Store credentials in localStorage
      localStorage.setItem(
        'credentials',
        JSON.stringify({
          userId: user.userId,
          userToken: user.userToken,
          userType: user.userType,
        })
      );
      
      // Call the onSuccess callback with user data
      if (onSuccess) {
        onSuccess({
          userId: user.userId,
          userType: user.userType,
          firstname: user.firstname,
          lastname: user.lastname,
          // Include other relevant user data
        });
      }
      
    } catch (error) {
      console.error('Error logging in user:', error);
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        width: '100%',
      }}
      noValidate
    >

      <TextField
        label="Email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
        type="email"
        disabled={isLoading}
      />

      <TextField
        label="Password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
        type="password"
        disabled={isLoading}
      />

      {/* Display error message */}
      {errorMessage && (
        <Typography color="error" sx={{ mt: 2, fontSize: '0.9rem' }}>
          {errorMessage}
        </Typography>
      )}

      {/* Submit Button */}
      <Box textAlign="center" mt={3}>
        <Button 
          type="submit" 
          variant="contained" 
          size="medium" 
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>

      {/* Switch to signup */}
      <Typography mt={2} textAlign="center" variant="body2">
        Don't have an account?
      </Typography>
      <Box textAlign="center">
        <Button
          variant="text"
          size="small"
          onClick={onSwitchToSignup}
          disabled={isLoading}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
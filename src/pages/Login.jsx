import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AnimLogo from '../component/AnimLogo';

const Login = () => {
  const navigate = useNavigate();

  // Form state
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    remember: false,
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (
      storedUser &&
      storedUser.email === formValues.email &&
      storedUser.password === formValues.password
    ) {
      alert('User authorized successfully');
      setErrorMessage(null);
      navigate(`/Profile`);
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

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
      {/* Left Section: Logo or Animation */}
      <Box display="flex" justifyContent="center">
        <AnimLogo />
      </Box>

      {/* Right Section: Login Form */}
      <Box>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            maxWidth: 480,
            width: '100%',
            bgcolor: '#f9f9f9',
            p: 4,
            borderRadius: 2,
            border: '1px solid #ccc',
          }}
          noValidate
        >
          <Typography variant="h5" mb={3} textAlign="center">
            Login
          </Typography>

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
          />

          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={formValues.remember}
                onChange={handleChange}
              />
            }
            label="Remember me"
            sx={{ mt: 2 }}
          />

          {/* Display error message */}
          {errorMessage && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}

          {/* Submit Button */}
          <Box textAlign="center" mt={3}>
            <Button type="submit" variant="contained" size="large" fullWidth>
              Submit
            </Button>
          </Box>
        </Box>

        {/* Redirect to Sign Up */}
        <Typography mt={3} textAlign="center">
          Don’t have an account?
        </Typography>
        <Box textAlign="center">
          <Button
            variant="text"
            onClick={() => navigate('/signup')}
            sx={{ mt: 1 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

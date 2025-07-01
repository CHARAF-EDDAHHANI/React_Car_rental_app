import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [userType, setUserType] = useState(null);
  const [plan, setPlan] = useState('basic');
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Basic required fields
    const requiredFields = userType === 'seller'
      ? [
          'firstname',
          'lastname',
          'phone',
          'email',
          'password',
          'adress',
          'companyName',
          'companyAddress',
          'companyPhone',
          'companyEmail',
        ]
      : ['firstname', 'lastname', 'phone', 'email', 'password'];

    requiredFields.forEach((field) => {
      if (!formValues[field] || formValues[field].toString().trim() === '') {
        newErrors[field] = 'This field is required';
      }
    });

    // Simple email validation
    if (formValues.email && !/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (userType === 'seller' && formValues.companyEmail && !/\S+@\S+\.\S+/.test(formValues.companyEmail)) {
      newErrors.companyEmail = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!userType) {
      alert(
        'Please select a user type (Seller or Buyer) and fill out the form, to profit from our services. or contact us for more information.'
      );
      return;
    }

    if (!validate()) {
      return;
    }

    const userData = {
      ...formValues,
      userType,
      plan: userType === 'seller' ? plan : null,
    };

    localStorage.setItem('user', JSON.stringify(userData));
    console.log('User registered successfully:', userData);
    alert('User registered successfully in the local storage');
    navigate('/Profile');
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f0f2f5', minHeight: '100vh' }}>
      {/* User type selector */}
      <Box textAlign="center" mb={4}>
        <Button
          variant={userType === 'seller' ? 'contained' : 'outlined'}
          onClick={() => setUserType('seller')}
          sx={{ mr: 2 }}
        >
          Seller
        </Button>
        <Button
          variant={userType === 'buyer' ? 'contained' : 'outlined'}
          onClick={() => setUserType('buyer')}
        >
          Buyer
        </Button>
      </Box>

      {(userType === 'seller' || userType === 'buyer') && (
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            maxWidth: 600,
            mx: 'auto',
            p: 4,
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: 1,
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h5" mb={3}>
            {userType === 'seller' ? 'Seller Registration' : 'Buyer Registration'}
          </Typography>

          {/* Plan selector only for seller */}
          {userType === 'seller' && (
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Plan</FormLabel>
              <RadioGroup
                row
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                name="plan"
              >
                <FormControlLabel value="basic" control={<Radio />} label="Basic" />
                <FormControlLabel value="premium" control={<Radio />} label="Premium" />
              </RadioGroup>
            </FormControl>
          )}

          {/* Input fields */}
          {[
            { name: 'firstname', label: 'First Name' },
            { name: 'lastname', label: 'Last Name' },
            { name: 'phone', label: 'Phone' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'password', label: 'Password', type: 'password' },
            ...(userType === 'seller'
              ? [
                  { name: 'adress', label: 'Address' },
                  { name: 'companyName', label: 'Company Name' },
                  { name: 'companyAddress', label: 'Company Address' },
                  { name: 'companyPhone', label: 'Company Phone' },
                  { name: 'companyEmail', label: 'Company Email', type: 'email' },
                ]
              : []),
          ].map(({ name, label, type }) => (
            <TextField
              key={name}
              label={label}
              name={name}
              type={type || 'text'}
              value={formValues[name] || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors[name])}
              helperText={errors[name]}
            />
          ))}

          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={!!formValues.remember}
                onChange={handleInputChange}
              />
            }
            label="Remember me"
            sx={{ mt: 2 }}
          />

          <Box textAlign="center" mt={4}>
            <Button type="submit" variant="contained" size="large">
              Register as {userType === 'seller' ? 'Seller' : 'Buyer'}
            </Button>
          </Box>
        </Box>
      )}

      <Box textAlign="center" mt={4}>
        <Typography>Already have an account?</Typography>
        <Button variant="text" onClick={() => navigate('/Login')} sx={{ mt: 1 }}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;

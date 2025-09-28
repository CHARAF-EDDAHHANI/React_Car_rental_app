import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
} from '@mui/material';
import { RegisterUser } from '../Axios/userAxios';
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({ onSuccess, onSwitchToLogin }) => {
  const [userType, setUserType] = useState('');
  const [plan, setPlan] = useState('');
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    adress: '',
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
  });

  const handleUserTypeChange = (event, newType) => {
    if (newType !== null) setUserType(newType);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { firstname, lastname, phone, email, password } = userData;
    if (!firstname || !lastname || !phone || !email || !password) {
      alert('Please fill all required fields');
      return false;
    }
    if (userType === 'seller') {
      const { companyName, companyAddress, companyPhone } = userData;
      if (!companyName || !companyAddress || !companyPhone || !plan) {
        alert('Please fill all seller details and select a plan');
        return false;
      }
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!userType) {
      alert('Please select a user type (Seller or Buyer)');
      return;
    }
    if (!validate()) return;

    try {
      const newUser = await RegisterUser(userType, userData);
      console.log('Registered user response:', newUser);

      // Check that the response contains the necessary data
      if (!newUser) {
        alert('Registration failed: no user data returned.');
        return;
      }

      // Store credentials in localStorage safely
      localStorage.setItem(
        'credentials',
        JSON.stringify({
          userId: userType === 'seller' ? newUser.sellerId : newUser.buyerId,
          userToken: userType === 'seller' ? newUser.sellerToken : newUser.buyerToken,
          userType,
        })
      );

      // Call onSuccess with safe destructuring
      onSuccess?.({
        firstname: newUser.firstname || '',
        lastname: newUser.lastname || '',
        phone: newUser.phone || '',
        email: newUser.email || '',
        adress: newUser.adress || '',
        ...(userType === 'seller' && {
          companyName: newUser.companyName || '',
          companyAddress: newUser.companyAddress || '',
          companyPhone: newUser.companyPhone || '',
          companyEmail: newUser.companyEmail || '',
          plan: newUser.plan || plan,
        }),
      });

    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ p: 4, bgcolor: '#f0f2f5', mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" mb={2} align="center">
          Sign Up
        </Typography>

        <ToggleButtonGroup
          color="primary"
          value={userType}
          exclusive
          onChange={handleUserTypeChange}
          fullWidth
          sx={{ mb: 3 }}
        >
          <ToggleButton value="buyer">Buyer</ToggleButton>
          <ToggleButton value="seller">Seller</ToggleButton>
        </ToggleButtonGroup>

        <form onSubmit={onSubmit}>
          <TextField
            label="First Name"
            name="firstname"
            fullWidth
            required
            margin="normal"
            value={userData.firstname}
            onChange={handleInputChange}
          />
          <TextField
            label="Last Name"
            name="lastname"
            fullWidth
            required
            margin="normal"
            value={userData.lastname}
            onChange={handleInputChange}
          />
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            required
            margin="normal"
            value={userData.phone}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            required
            margin="normal"
            value={userData.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={userData.password}
            onChange={handleInputChange}
          />
          <TextField
            label="Address"
            name="adress"
            fullWidth
            margin="normal"
            value={userData.adress}
            onChange={handleInputChange}
          />

          {userType === 'seller' && (
            <>
              <TextField
                label="Company Name"
                name="companyName"
                fullWidth
                margin="normal"
                value={userData.companyName}
                onChange={handleInputChange}
              />
              <TextField
                label="Company Address"
                name="companyAddress"
                fullWidth
                margin="normal"
                value={userData.companyAddress}
                onChange={handleInputChange}
              />
              <TextField
                label="Company Phone"
                name="companyPhone"
                fullWidth
                margin="normal"
                value={userData.companyPhone}
                onChange={handleInputChange}
              />
              <TextField
                label="Company Email"
                name="companyEmail"
                fullWidth
                margin="normal"
                value={userData.companyEmail}
                onChange={handleInputChange}
              />
              <TextField
                select
                label="Select Plan"
                fullWidth
                required
                margin="normal"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              >
                <MenuItem value="Basic">Basic</MenuItem>
                <MenuItem value="Standard">Standard</MenuItem>
                <MenuItem value="Premium">Premium</MenuItem>
              </TextField>
            </>
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Register
          </Button>

          <Button onClick={onSwitchToLogin} fullWidth sx={{ mt: 1 }}>
            Already have an account? Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpForm;

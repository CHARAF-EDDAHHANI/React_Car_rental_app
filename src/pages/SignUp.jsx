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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [plan, setPlan] = useState('');
  const [formValues, setFormValues] = useState({
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

  const handleInputChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserTypeChange = (event, newType) => {
    if (newType !== null) {
      setUserType(newType);
    }
  };

  const validate = () => {
    const { firstname, lastname, phone, email, password } = formValues;
    if (!firstname || !lastname || !phone || !email || !password) {
      alert('Please fill all required fields');
      return false;
    }
    if (userType === 'seller') {
      const { companyName, companyAddress, companyPhone } = formValues;
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
      alert('Please select a user type (Seller or Buyer) to proceed.');
      return;
    }

    if (!validate()) return;

    const userData = {
      ...formValues,
      userType,
      plan: userType === 'seller' ? plan : null,
    };

    try {
      const url =
        userType === 'seller'
          ? 'http://localhost:5000/api/register-seller'
          : 'http://localhost:5000/api/register-buyer';

      const response = await axios.post(url, userData);

      const newUser =
        userType === 'seller' ? response.data.newSeller : response.data.newBuyer;

      localStorage.setItem(
        'credentials',
        JSON.stringify({
          userId:
            userType === 'seller' ? newUser.sellerId : newUser.buyerId,
          userToken:
            userType === 'seller' ? newUser.sellerToken : newUser.buyerToken,
        })
      );

      navigate('/Profile', {
        state: {
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          phone: newUser.phone,
          email: newUser.email,
          adress: newUser.adress,
          ...(userType === 'seller' && {
            companyName: newUser.companyName,
            companyAddress: newUser.companyAddress,
            companyPhone: newUser.companyPhone,
            companyEmail: newUser.companyEmail,
            plan: newUser.plan,
          }),
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong during registration.');
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
            value={formValues.firstname}
            onChange={handleInputChange}
          />
          <TextField
            label="Last Name"
            name="lastname"
            fullWidth
            required
            margin="normal"
            value={formValues.lastname}
            onChange={handleInputChange}
          />
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            required
            margin="normal"
            value={formValues.phone}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            required
            margin="normal"
            value={formValues.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <TextField
            label="Address"
            name="adress"
            fullWidth
            margin="normal"
            value={formValues.adress}
            onChange={handleInputChange}
          />

          {userType === 'seller' && (
            <>
              <TextField
                label="Company Name"
                name="companyName"
                fullWidth
                margin="normal"
                value={formValues.companyName}
                onChange={handleInputChange}
              />
              <TextField
                label="Company Address"
                name="companyAddress"
                fullWidth
                margin="normal"
                value={formValues.companyAddress}
                onChange={handleInputChange}
              />
              <TextField
                label="Company Phone"
                name="companyPhone"
                fullWidth
                margin="normal"
                value={formValues.companyPhone}
                onChange={handleInputChange}
              />
              <TextField
                label="Company Email"
                name="companyEmail"
                fullWidth
                margin="normal"
                value={formValues.companyEmail}
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;

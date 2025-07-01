import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Input,
  MenuItem,
  Grid
} from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '90%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 10,
  p: 1,
};

const generateVehicleId = () => `VH-${Math.floor(100000 + Math.random() * 900000)}`;
const generateRating = () => (Math.random() * (5 - 3) + 3).toFixed(1);
const generateReviews = () => Math.floor(Math.random() * 490 + 10);

const categories = ['Economy', 'Van', 'SUV', 'Luxury', 'Modern'];
const availabilityOptions = ['Available', 'Not Available'];
const transmissionTypes = ['Automatic', 'Manual'];

const UploadCar = ({ open, handleClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    photo: null,
    model: '',
    year: '',
    category: '',
    availability: '',
    transmission_type: '',
    seats: '',
    daily_price: '',
    weekly_price: '',
    monthly_price: '',
    location: '',
    image: '',
    description: '',
    vehicle_id: '',
    rating: '',
    numberOfReviews: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = () => {
    const updatedData = {
      ...formData,
      vehicle_id: generateVehicleId(),
      rating: generateRating(),
      numberOfReviews: generateReviews(),
    };

    if (onSubmit) {
      const dataToSend = new FormData();
      for (const key in updatedData) {
        dataToSend.append(key, updatedData[key]);
      }
      onSubmit(dataToSend);
    }

    setFormData({
      photo: null,
      model: '',
      year: '',
      category: '',
      availability: '',
      transmission_type: '',
      seats: '',
      daily_price: '',
      weekly_price: '',
      monthly_price: '',
      location: '',
      image: '',
      description: '',
      vehicle_id: '',
      rating: '',
      numberOfReviews: '',
    });

    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" textAlign="center" mb={1}>
          Upload Car Details
        </Typography>
        <Grid item xs={10} sm={6} md={3} mx="auto" mb={1}>
            <Input 
            type="file"
             name="photo" 
             onChange={handleChange} 
             fullWidth
              sx={{
            width: {
            xs: '100%', 
            md: '100%'},
          paddingY:'1rem'}}
             />
          </Grid>
        <Grid container spacing={1}
          sx={{
            display: 'grid',
           gridTemplateColumns: {
            xs: 'repeat(3, 1fr)', 
            md: 'repeat(5, 1fr)' },
            gap: 2,
          }}>
          
          <Grid item xs={12} sm={6} md={2.4}>
            <TextField select label="Category" name="category" value={formData.category} onChange={handleChange} fullWidth>
              {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <TextField select label="Availability" name="availability" value={formData.availability} onChange={handleChange} fullWidth>
              {availabilityOptions.map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <TextField select label="Transmission" name="transmission_type" value={formData.transmission_type} onChange={handleChange} fullWidth>
              {transmissionTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <TextField label="Model" name="model" value={formData.model} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <TextField label="Year" name="year" value={formData.year} onChange={handleChange} fullWidth />
          </Grid>
             <Grid item xs={12} sm={6} md={2.4}>
            <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
          </Grid>

          <Grid item xs={12} sm={4} md={2.4}>
            <TextField label="Seats" name="seats" value={formData.seats} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={4} md={2.4}>
            <TextField label="Daily Price" name="daily_price" value={formData.daily_price} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={4} md={2.4}>
            <TextField label="Weekly Price" name="weekly_price" value={formData.weekly_price} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <TextField label="Monthly Price" name="monthly_price" value={formData.monthly_price} onChange={handleChange} fullWidth />
          </Grid>
       
        </Grid>
        <Grid item xs={12} spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Description"
              name="description"
              multiline
              rows={2}
              value={formData.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: 'rgba(85, 255, 0, 0.88)',
                color: '#000',
                padding: '0.5rem 1rem',
                fontSize: '12px',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease',
                margin: '1rem ',
              }}
            >
              Submit
            </Button>
          </Grid>
      </Box>
    </Modal>
  );
};

export default UploadCar;

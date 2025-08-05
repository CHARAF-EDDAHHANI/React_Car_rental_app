import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Input,
  MenuItem,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '90%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 10,
};
const categories = ['Economy', 'Van', 'SUV', 'Luxury', 'Modern'];
const availabilityOptions = ['Available', 'Not Available'];
const transmissionTypes = ['Automatic', 'Manual'];
const credentials = localStorage.getItem("credentials");
const userId = credentials ? JSON.parse(credentials).userId : null;


const UploadCar = ({ open, handleClose, onSubmit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
      model: '',
      year: '',
      category: '',
      availability: '',
      transmission_type: '',
      seats: '',
      daily_price: '',
      weekly_price: '',
      monthly_price: '',
      driver_daily_price: '',
      driver_weekly_price: '',
      driver_monthly_price: '',
      location: '',
      description: '',
      image: null,
      sellerId: userId,
    });
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    };
  
    const handleSubmit = async () => {
      const carData = new FormData();
  
      for (const key in formData) {
        if (formData[key]) {
          carData.append(key, formData[key]);
        }
      }
  
      try {
        await axios.post('http://localhost:5000/api/uploadCar', carData);

        if (onSubmit) onSubmit(carData);
        handleClose();
      } catch (err) {
        console.error('Upload error:', err);
      }


      setFormData({
        model: '',
        year: '',
        category: '',
        availability: '',
        transmission_type: '',
        seats: '',
        daily_price: '',
        weekly_price: '',
        monthly_price: '',
        driver_daily_price: '',
        driver_weekly_price: '',
        driver_monthly_price: '',
        location: '',
        description: '',
        image: null,
        sellerId: userId,
      });
      handleClose();
    };
  

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          ...modalStyle,
          maxHeight: isMobile ? '90vh' : 'auto',
          overflowY: isMobile ? 'auto' : 'visible',
          WebkitOverflowScrolling: 'touch',
          scrollbarGutter: 'stable',
          p: 2,
        }}
      >
        {isMobile && (
          <Box textAlign="right">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        <Typography variant="h6" textAlign="center" mb={2}>
          Upload Car Details
        </Typography>

        <Grid item xs={12} sm={6} md={3} mx="auto" mb={2}>
          <Input
            type="file"
            name="image"
            onChange={handleChange}
            fullWidth
            sx={{ width: '100%', paddingY: '1rem' }}
          />
        </Grid>

        <Grid
          container
          spacing={1}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(5, 1fr)',
            },
            gap: 2,
          }}
        >
          <Grid item>s
            <TextField
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              select
              label="Availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              fullWidth
            >
              {availabilityOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              select
              label="Transmission"
              name="transmission_type"
              value={formData.transmission_type}
              onChange={handleChange}
              fullWidth
            >
              {transmissionTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Seats"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Daily Price"
              name="daily_price"
              value={formData.daily_price}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Weekly Price"
              name="weekly_price"
              value={formData.weekly_price}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Monthly Price"
              name="monthly_price"
              value={formData.monthly_price}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Driver Daily Price"
              name="driver_daily_price"
              value={formData.driver_daily_price}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Driver Weekly Price"
              name="driver_weekly_price"
              value={formData.driver_weekly_price}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Driver Monthly Price"
              name="driver_monthly_price"
              value={formData.driver_monthly_price}
              onChange={handleChange}
              fullWidth
            />
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
              marginTop: '1.5rem',
            }}
          >
            Submit
          </Button>
        </Grid>

        {isMobile && (
          <Grid item xs={12} textAlign="center" mt={2}>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
          </Grid>
        )}
        </Grid>
      </Box>
    </Modal>
  );
};

export default UploadCar;

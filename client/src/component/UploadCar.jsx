import React, { useState } from 'react';
import { uploadCar } from '../Axios/carAxios';
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
import {useTranslation} from 'react-i18next';


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
const sellerId = credentials ? JSON.parse(credentials).userId : null;

if (!sellerId) {
  alert('User ID not Found please Contact Support for solve the issue.');
}

const UploadCar = ({ open, handleClose, onSubmit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {t} = useTranslation();
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
      sellerId: sellerId,
    });
  

// handle input change
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    };
  

//submit car data function
    const handleSubmit = async () => {
      const carData = new FormData();
      console.log('this is carData to submit', carData);
  
      for (const key in formData) {
        if (formData[key]) {
          carData.append(key, formData[key]);
        }
      }
      try {
        await uploadCar(carData);

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
        sellerId: sellerId,
      });
      handleClose();
    };
  
  // field configuration and mapping
  const CarDataFields = [
    { component: "input", name: "model", label: t("uploadcar.model")},
    { component: "input",  name: "year", label: t("uploadcar.year")},
    { component: "input", name: "seats", label: t("uploadcar.seats")},
    { component: "input", name: "daily_price", label: t("uploadcar.daily_price")},
    { component: "input", name: "weekly_price", label: t("uploadcar.weekly_price")},
    { component: "input", name: "monthly_price", label: t("uploadcar.monthly_price")},
    { component: "input", name: "driver_daily_price", label: t("uploadcar.driver_daily_price")},
    { component: "input", name: "driver_weekly_price", label: t("uploadcar.driver_weekly_price")},
    { component: "input", name: "driver_monthly_price", label: t("uploadcar.driver_monthly_price")},
    { component: "input", name: "location", label: t("uploadcar.location")},
  { component: "select", name: "category", label : t("uploadcar.category"), options: categories},
  { component: "select", name: "availability", label: t("uploadcar.availability"), options: availabilityOptions},
  { component: "select", name: "transmission_type", label: t("uploadcar.transmission"), options: transmissionTypes,},
  { component: "input", name: "image", label: t("uploadcar.image"), type: "file" },
]

// unique JSX return 
const renderField = (field) => {
  if(field.component === "select") {
    return (
      <TextField
        select
        label ={field.label}
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
        fullWidth
        >
        {field.options.map((option) => (
          <MenuItem key={option} value={option}>
            {option} 
          </MenuItem>
        ))}
      </TextField>
    );
  }
   if (field.type === "file") {
    return (
      <Input
        type="file"
        name={field.name}
        onChange={handleChange}
        fullWidth
      />
    );
}
  return (
    <TextField
    label={field.label}
    name={field.name}
    value={formData[field.name]}
    onChange={handleChange}
    fullWidth
  />
  );
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


        {/* cardatafields */}
        <Grid
         container
         spacing={1}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              md: "repeat(6, 1fr)",
            },
            gap: 1,
          }}
          >
        
        {CarDataFields.map((field) => (
          <Grid item key={field.name}>
            {renderField(field)}
          </Grid>
        ))}

        </Grid>

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
            {t("uploadcar.submit")}
          </Button>
        {isMobile && (
          <Grid item xs={12} textAlign="center" mt={2}>
            <Button onClick={handleClose} color="secondary">
              {t("uploadcar.close")}
            </Button>
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

export default UploadCar;


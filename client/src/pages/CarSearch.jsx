import React, { useState, useEffect } from 'react';
import CarList from '../component/CarList';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {Typography, Box } from "@mui/material";
import { fetchCarsByLocation } from '../Axios/carAxios';

const CarSearch = () => {
  const { location } = useParams();
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noCarsFound, setNoCarsFound] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const cars = await fetchCarsByLocation(location);
        if (!cars || cars.length === 0) {
          setNoCarsFound(true); 
        } else {
          setFilteredCars(cars);
          setNoCarsFound(false); // reset if cars found
        }
      } catch (err) {
        setNoCarsFound(true);
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [location]);

//handle loading state
if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
        }}
      >
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }


  //handle no cars found
  if (noCarsFound) {
    return (
      <Typography variant="h6" sx={{ mt: 3, textAlign: 'center', color: 'gray' }}>
         No cars found in "{location}" Please enter another location.
      </Typography>
    );
  }

  return (
    <div>
      <Typography
        variant="h6"
        style={{
          padding: '0.3rem',
          backgroundColor: '#e5e5e593',
          width: 'fit-content',
          borderRadius: '10px',
        }}
      >
        Available Cars In "{location}"
      </Typography>
      <CarList cars={filteredCars} />
    </div>
  );
};

export default CarSearch;

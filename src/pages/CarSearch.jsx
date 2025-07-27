import React, { useState, useEffect } from 'react';
import CarList from '../component/CarList';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {Typography, Box } from "@mui/material";

const CarSearch = () => {
  const { location } = useParams();
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('/data/cars.json');
        const allCars = await res.json();

        const matchedCars = allCars.filter(car =>
          car.location.toLowerCase().includes(location.toLowerCase())
        );

        setFilteredCars(matchedCars);
      } catch (err) {
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [location]);


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

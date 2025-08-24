import React, { useEffect, useState } from 'react';
import CarList from '../component/CarList';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";
import { fetchAllCars } from '../Axios/carAxios';

const Home = () => {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const cars = await fetchAllCars();
        setAllCars(cars);
      } catch (error) {
        console.error('Error fetching all cars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);


  //handle loading icon display
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
      <CarList cars={allCars} />
    </div>
  );
};

export default Home;

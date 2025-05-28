import React, { useState, useEffect } from 'react';
import CarList from '../component/CarList';
import { useParams } from 'react-router-dom';

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

  if (loading) return <p>Loading cars...</p>;

  return (
    <div>
      <h2>Cars in "{location}"</h2>
      <CarList cars={filteredCars} />
    </div>
  );
};

export default CarSearch;

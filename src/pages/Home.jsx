import React, { useEffect, useState } from 'react';
import CarList from '../component/CarList';

const Home = () => {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('/data/cars.json');
        const data = await res.json();
        setAllCars(data);
      } catch (err) {
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p>Loading cars...</p>;

  return (
    <div>
      <CarList cars={allCars} />
    </div>
  );
};

export default Home;

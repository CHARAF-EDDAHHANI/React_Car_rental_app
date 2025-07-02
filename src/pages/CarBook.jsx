import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import ControlledAccordions from "../component/Accordion";
import QuiltedImageList from "../component/ImageLists";
import BookingModal from "../component/BookingModal";

export default function CarBook() {
  // State for BottomNavigation active tab
  const [value, setValue] = useState(0);

  // List of cars (loaded from JSON)
  const [cars, setCars] = useState([]);

  // Currently selected car details
  const [car, setCar] = useState({});

  // Modal open state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract vehicle_id from the URL path
  // Assumes URL ends with vehicle_id as integer
  const vehicle_id = parseInt(window.location.pathname.split("/").pop(), 10);

  useEffect(() => {
    // Fetch car data from JSON file
    fetch("/data/cars.json")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        // Find car matching vehicle_id from URL
        const foundCar = data.find((c) => c.vehicle_id === vehicle_id);
        if (foundCar) {
          setCar(foundCar);
        } else {
          console.error("Car not found");
        }
      })
      .catch((err) => console.error("Failed to load car data:", err));
  }, [vehicle_id]);

  return (
    <Container maxWidth="lg" sx={{ width: "auto" }}>
      {/* Car Title */}
      <Typography variant="h3" component="h1" mt={3}>
        {car.model} - {car.year} in {car.location}
      </Typography>

      {/* Car Images */}
      <Box mt={3} display="flex" gap={2} flexWrap="wrap">
        <img
          src={car.image}
          alt={car.model}
          height={325}
          style={{ borderRadius: 8 }}
        />
      {/*<QuiltedImageList />   for further use of many photos of the cars */}
      </Box>

      {/* About this Car Section */}
      <Typography variant="h6" component="h4" mt={3}>
        About this Car
      </Typography>
      <Box>
        <Typography component="p" my={3}>
          {car.description}
        </Typography>
      </Box>

      {/* Rules and Policies Section with Booking Modal */}
      <Typography variant="h6" component="h4" mb={3}>
        Rules and Policies
      </Typography>
      <ControlledAccordions />
      <BookingModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />

      {/* Fixed Bottom Navigation for booking */}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction
            label="Book Now"
            icon={<RestoreIcon />}
            onClick={() => setIsModalOpen(true)}
          />
        </BottomNavigation>
      </Paper>
    </Container>
  );
}

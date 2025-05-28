import { autocompleteClasses, Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ControlledAccordions from "../component/Accordion";
import QuiltedImageList from "../component/ImageLists";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import BookingModal from "../component/BookingModal";
import { useEffect } from "react";


export default function CarBook() {
  const [value, setValue] = React.useState(0);
  const [cars, setCars] = React.useState([]);
  const [car, setCar] = React.useState({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  // Extract vehicle_id from the URL
  const vehicle_id = parseInt(window.location.pathname.split("/").pop()); 
  // Fetch car data from JSON file
    useEffect(() => {
      fetch("/data/cars.json")
        .then((res) => res.json())
        .then((data) => {
          setCars(data);
          const foundCar = data.find((car) => car.vehicle_id === vehicle_id);
          if (foundCar) {
            setCar(foundCar);
          } else {
            console.error("Car not found");
          }
        })
        .catch((err) => console.error(err));
    }, []);

  return (

    <Container sx={{ width: autocompleteClasses.auto }} maxWidth="lg">
      <Typography variant="h3" component="h1" marginTop={3}>
       {car.model}-{car.year}  in {car.location}
      </Typography>
      <Box marginTop={3} sx={{ display: "flex" }}>
        <img
          src={car.image}
          alt={car.name}
          height={325}
        />
        <QuiltedImageList />
      </Box>
      <Typography variant="h6" component="h4" marginTop={3}>
        About this Car
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Typography variant="paragraph" component="p" marginY={3}>
            {car.description}
        </Typography>
      </Box>
      <Typography variant="h6" component="h4" marginBottom={3}>
        <BookingModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
        Rules and Policies
      </Typography>
      <ControlledAccordions />
      
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
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


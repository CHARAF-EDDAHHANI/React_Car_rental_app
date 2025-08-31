import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import RestoreIcon from "@mui/icons-material/Restore";
import ControlledAccordions from "../component/Accordion";
//import QuiltedImageList from "../component/ImageLists";
import BookingModal from "../component/BookingModal";
import { fetchCarById } from "../Axios/carAxios";
import { createOrder } from "../Axios/orderAxios";
import OrderTicker from "../component/OrderTicker";
import {getImageUrl} from '../Axios/carAxios';

export default function CarBook() {
 
  const [value, setValue] = useState(0);  // State for BottomNavigation active tab
  const [car, setCar] = useState({});  // Currently selected car details
  const [confirmationData, setConfirmationData] = useState(null); // State to store created order
  const [loading, setLoading] = useState(true); // Loading state for car data

  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract carId from the URL path  ends with carId as string
 const carId = window.location.pathname.split("/").pop();
 
  useEffect(() => {
    const fetchCarDataById = async () => {
      try {
        const car = await fetchCarById(carId);
        console.log('this is carData fetched from the backend', car);
        setCar(car);
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCarDataById();
  }, [carId]);

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

// Function to handle booking confirmation and post the order
// This will be called from BookingModal when the user confirms the booking
const handleBookingConfirmed = async ({ bookingInfo }) => {
let response = null;
  try {
    const credentials = localStorage.getItem("credentials");
    const userId = credentials ? JSON.parse(credentials).userId : null;
    const userType = credentials ? JSON.parse(credentials).userType : null;

    if (!userId) {
      console.warn("User is not logged in. Cannot book a car.");
      alert("You must be logged in to book a car Click Below to Login.");
      // Implement logic to call login and redirect to booking page using the same Url after login
      return;
    }

    const orderData = {
      ...bookingInfo,
      userId,
      carId,
      userType
    };
    console.log("Full Order Data:", orderData);
    const response = await createOrder(orderData);
    console.log("Order created:", response);
    if (response && response.order) {
      setConfirmationData(response.order);
      alert("Booking confirmed! Check your order details below.");
    } else {
      alert("Failed to create order. Please try again.");
    }
  } catch (error) {
    console.error("Order creation failed:", error);
    alert("Failed to create order.");
  } finally {
    setIsModalOpen(false);
  }
};

  return (
    <Container maxWidth="lg" sx={{ width: "auto" }}>
      {/* Car Title */}
      <Typography variant="h3" component="h1" mt={3} bgcolor={"#ccf8dbff"} p={2} borderRadius={1} textAlign="center" sx={{ color: "#2f5939ff" }}>
        {car.model} - {car.year} in {car.location}
      </Typography>
      <Divider sx={{ mt: 1, mb: 0, borderColor: '#0eff06ff' }} />
      {/* Car & Booking Details Sections For responsiveness */}
      <Box 
      sx={{
            mt: 2,
            display: "grid",
            gap: 1,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)", // <600px
              sm: "repeat(1, 1fr)", // 600px+
              md: "repeat(2, 1fr)", // 900px+
              lg: "repeat(2, 1fr)", // 1200px+
            },
          }}
      >
      {/* Car Images */}
      <Box >
        <img
          src={getImageUrl(car.image)} // protected image path
          alt={car.model}
          style={{ width: '100%', height: 'auto', borderRadius: 4, boxShadow: '0 4px 4px rgba(0,0,0,0.1)' }}
        />
      {/*<QuiltedImageList />   for further use of many photos of the cars */}
      </Box>

      {confirmationData && <OrderTicker orderticketData={confirmationData} />}
       </Box>
      <Divider sx={{ mt: 4, mb: 2, borderColor: '#1cf723ff' }} />
       
      {/* About this Car Section */}
      <Typography variant="h6"  bgcolor={"#daf3d8ff"} p={1}  width={'50%'} textAlign="left" sx={{ color: "#2f5939ff"  }}>
        About this Car
      </Typography>
       {/* conditionally display description  */}
      {car.description && (
        <Box>
          <Typography component="p" variant="body1" mt={2} mb={3} sx={{ color: "#333" }}>
            {car.description}
          </Typography>
        </Box>
      )}
      {/* Rules and Policies Section with Booking Modal */}
      <Typography variant="h6"  bgcolor={"#daf3d8ff"} p={1} mb={3} width={'50%'} textAlign="left" sx={{ color: "#2f5939ff"  }}>
        Rules and Policies
      </Typography>
      <ControlledAccordions />
      <BookingModal
        open={isModalOpen}
        onOk={handleBookingConfirmed} // Pass the booking confirmation handler
        onCancel={() => setIsModalOpen(false)}
      />
      {/* Fixed Bottom Navigation for booking */}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0  }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          sx={{ backgroundColor: "#ffffffff", borderTop: "1px solid #ccc" }}
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

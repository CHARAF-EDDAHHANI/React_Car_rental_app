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
import { fetchCarById, getImageUrl } from "../Axios/carAxios";
import { createOrder } from "../Axios/orderAxios";
import OrderTicker from "../component/OrderTicker";
import AuthModal from "../component/AuthModal";
import BookingModal from "../component/BookingModal";
import { useTranslation } from 'react-i18next';

export default function CarBook() {
  const [value, setValue] = useState(0);
  const [car, setCar] = useState({});
  const [confirmationData, setConfirmationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
   const {t, i18n } = useTranslation();
   const isArabic = i18n.language ===  "ar";

const carId = window.location.pathname.split("/").pop();
  useEffect(() => {
    const fetchCarDataById = async () => {
      try {
        const car = await fetchCarById(carId);
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  //authentication check function
  const getAuthUser = () => {
    try {
      const credentials = localStorage.getItem("credentials");
      if (!credentials) {
        setIsAuthModalOpen(true);
        return null;
      }
      const parsedCredentials = JSON.parse(credentials);
      const { userId, userType } = parsedCredentials;
      
      // Check if userId exists
      if (!userId) {
        setIsAuthModalOpen(true);
        return null;
      }
      
      return { userId, userType };
    } catch (error) {
      console.error("Error parsing credentials:", error);
      setIsAuthModalOpen(true);
      return null;
    }
  };

  // Handle booking confirmation
  const handleBookingConfirmed = async ({bookingInfo}) => {
    const userData = getAuthUser();
   
    if (!userData) return; // Auth modal is already shown by getAuthUser
    
    const orderData = {
      ...bookingInfo,
      userId: userData.userId,
      userType: userData.userType,
      carId,
    };

    try {
      const response = await createOrder(orderData);
      if (response && response.order) {
        setConfirmationData(response.order);
        alert("Booking confirmed! Check your order details below.");
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Failed to create order.");
    } finally {
      setIsModalOpen(false);
    }
  };

  // Handle Book Now button click
  const handleBookNowClick = () => {
    if (getAuthUser()) {
      setIsModalOpen(true);
    }
    // If not authenticated, getAuthUser() will open the auth modal
  };

  return (
    <Container maxWidth="lg" sx={{ width: "auto", pb: 10 }}>
      <Divider sx={{ mt: 1, mb: 0, borderColor: '#0eff06ff' }} />
      {/* Car & Booking Details Sections */}
      <Box sx={{
            mt: 2,
            display: "grid",
            gap: 1,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
            },
          }}
      >
        {/* Car Images */}
        <Box >
          <img
            src={getImageUrl(car.image)}
            alt={car.model}
            style={{ width: '100%', height: 'auto', borderRadius: 4, boxShadow: '0 4px 4px rgba(0,0,0,0.1)' }}
          />
        </Box>

        {confirmationData && <OrderTicker orderticketData={confirmationData} />}
      </Box>
      
      <Divider sx={{ mt: 4, mb: 2, borderColor: '#1cf723ff' }} />
       
      
      {/* Rules and Policies Section */}
      <Typography variant="h6" bgcolor={"#daf3d8ff"} p={1} mb={3} width={'100%'} 
       sx={{ 
        color: "#2f5939ff",
        direction: isArabic ? "rtl" : "ltr",
        textAlign: isArabic ? "right" : "left",}}>
        {t("carBook.rules_Rules and_policies")}
      </Typography>
      <ControlledAccordions />
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onSuccess={(userData) => {
          console.log('User authenticated:', userData);
          setIsAuthModalOpen(false);
          setIsModalOpen(true);
        }}
        onClose={() => setIsAuthModalOpen(false)}
      />
      
      {/* Booking Modal */}
      <BookingModal
        open={isModalOpen}
        onOk={handleBookingConfirmed}
        onCancel={() => setIsModalOpen(false)}
      />
      
      {/* Fixed Bottom Navigation for booking */}
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          sx={{ backgroundColor: "#ffffffff", borderTop: "1px solid #ccc" }}
        >
          <BottomNavigationAction
            label={t("carBook.Book_Now")}
            icon={<RestoreIcon />}
            aria-label="Book this car"
            onClick={handleBookNowClick}
          />
        </BottomNavigation>
      </Paper>
    </Container>
  );
}
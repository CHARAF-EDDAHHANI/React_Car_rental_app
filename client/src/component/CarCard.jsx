// CarCard.jsx

import { Grid, Paper, Typography, Box, Rating } from "@mui/material";
import {
  AccessTime,
  Category as CategoryIcon,
  Settings as TransmissionIcon,
  EventSeat as SeatsIcon,
  MonetizationOn as PriceIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  console.log("Image URL:", `${import.meta.env.VITE_API_BASE_URL}/images/${car.image}`);


  // Navigate to booking page using car.carId
  const handleBooking = (carId) => {
    if (carId) {
      navigate(`/carbooking/${carId}`);
    }
  };

  // Reusable icon style for consistency
  const iconStyle = { fontSize: 16, mr: 0.5, color: "#333" };

  // Key car specs
  const carDetails = [
    { icon: <CategoryIcon sx={iconStyle} />, label: car.category || "N/A" },
    { icon: <TransmissionIcon sx={iconStyle} />, label: car.transmission_type || "N/A" },
    { icon: <SeatsIcon sx={iconStyle} />, label: car.seats || "N/A" },
  ];

  // Price options
  const carPrices = [
    { icon: <PriceIcon sx={iconStyle} />, label: `${car.daily_price}/Day` },
    { icon: <PriceIcon sx={iconStyle} />, label: `${car.weekly_price}/Week` },
    { icon: <PriceIcon sx={iconStyle} />, label: `${car.monthly_price}/Month` },
  ];

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper
        onClick={() => handleBooking(car.carId)}
        elevation={3}
        sx={{
          p: 2,
          fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.8rem" },
          borderRadius: 2,
          cursor: "pointer",
          transition: "0.3s",
          "&:hover": { boxShadow: 8 },
        }}
      >
        {/* Car Image */}
        <Box
          component="img"
          src={`${import.meta.env.VITE_API_BASE_URL}/images/${car.image}`}  // protected image path
          alt={car.model}
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 1,
          }}
        />

        {/* Car Info */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {car.model} ({car.year})
          </Typography>

          {/* Car Specifications */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {carDetails.map((item, index) => (
              <Box
                key={`spec-${index}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  py: 0.3,
                  backgroundColor: "rgba(41, 217, 126, 0.64)",
                  borderRadius: 2.5,
                }}
              >
                {item.icon}
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Booking Availability */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <AccessTime sx={iconStyle} />
            <Typography variant="body2">Ready for booking</Typography>
          </Box>

          {/* Rating */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Rating
              name="car-rating"
              size="small"
              defaultValue={car.rating || 0}
              precision={0.25}
              readOnly
            />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              {car.rating || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              ({car.numberOfReviews || 0} reviews)
            </Typography>
          </Box>

          {/* Price Options */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
            {carPrices.map((price, index) => (
              <Box
                key={`price-${index}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                  py: 0.3,
                  backgroundColor: "#FFD700",
                  borderRadius: 2.5,
                }}
              >
                {price.icon}
                <Typography variant="body2" color="text.secondary">
                  {price.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default CarCard;

import { Grid, Paper, Typography, Box, Rating } from "@mui/material";
import {
  AccessTime,
  Category as CategoryIcon,
  Settings as TransmissionIcon,
  EventSeat as SeatsIcon,
  MonetizationOn as PriceIcon,
  CalendarToday as WeeklyIcon,
  DateRange as MonthlyIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  // Navigate to booking page
  const handleBooking = (vehicle_id) => {
    if (vehicle_id) {
      navigate(`/carbooking/${vehicle_id}`);
    }
  };

  // Reusable icon style
  const iconStyle = { fontSize: 16, mr: 0.5, color: "#333" };

  // Car info badges
  const carDetails = [
    { icon: <CategoryIcon sx={iconStyle} />, label: car.category || "N/A" },
    { icon: <TransmissionIcon sx={iconStyle} />, label: car.transmission_type || "N/A" },
    { icon: <SeatsIcon sx={iconStyle} />, label: car.seats || "N/A" }
  ];

  // Price badges
  const carPrices = [
    { icon: <PriceIcon sx={iconStyle} />, label: `${car.daily_price}/Day` },
    { icon: <PriceIcon sx={iconStyle} />, label: `${car.weekly_price}/Week` },
    { icon: <PriceIcon sx={iconStyle} />, label: `${car.monthly_price}/Month` }
  ];

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper
        onClick={() => handleBooking(car.vehicle_id)}
        elevation={3}
        sx={{
          padding: { xs: 2, sm: 2, md: 2 },
          fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.8rem" },
          borderRadius: 2,
          cursor: "pointer",
          transition: "0.3s",
          "&:hover": { boxShadow: 8 }
        }}
      >
        <Box
          component="img"
          src={car.image}
          alt={car.model}
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 1
          }}
        />
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {car.model} ({car.year})
          </Typography>

          {/* Car spec badges */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {carDetails.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  py: 0.3,
                  backgroundColor: "rgba(41, 217, 126, 0.64)",
                  borderRadius: 2.5
                }}
              >
                {item.icon}
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Booking info */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <AccessTime sx={iconStyle} />
            <Typography variant="body2">Ready for booking</Typography>
          </Box>

          {/* Ratings */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Rating
              name="car-rating"
              size="small"
              defaultValue={car.rating || 0}
              precision={0.25}
              readOnly
            />
            <Typography variant="body3" sx={{ ml: 0.5 }}>
              {car.rating?.toFixed(1) || "N/A"}
            </Typography>
            <Typography variant="body3" sx={{ ml: 0.3 }}>
              ({car.numberOfReviews || 0} reviews)
            </Typography>
          </Box>

          {/* Pricing badges */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
            {carPrices.map((price, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                  py: 0.3,
                  backgroundColor: "#FFD700", // golden background
                  borderRadius: 2.5
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

import { Grid, Paper, Typography, Box, Rating } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";



const CarCard = ({ car }) => {
  const navigate = useNavigate();
  // Function to handle booking
  const handleBooking = (vehicle_id) => {
    if (vehicle_id) {
      navigate(`/carbooking/${vehicle_id}`);
    }
  };
  
  return (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Paper
    onClick={() => handleBooking(car.vehicle_id)}
    elevation={3}
    sx={{ 
      padding: { xs: 2, sm: 2, md: 2 },
      fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.8rem' }, 
      borderRadius: 2, cursor: "pointer", transition: "0.3s", "&:hover": { boxShadow: 8 } }}>
      <Box
        component="img"
        src={car.image}
        alt={car.model}
        sx={{
          width: "100%",
          height: 200,
          objectFit: "cover",
          borderRadius: 1,
        }}
      />
      <Box sx={{ mt: 2 }}>
        <Typography  variant="subtitle1" fontWeight="bold" gutterBottom>
          {car.model} ({car.year})
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {car.category || "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Transmission: {car.transmission_type || "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Availability: {car.availability ? "Available" : "Not Available"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2">Ready for booking</Typography>
        </Box>

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

        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">Daily: ${car.daily_price}</Typography>
          <Typography variant="subtitle2">Weekly: ${car.weekly_price}</Typography>
          <Typography variant="subtitle2">Monthly: ${car.monthly_price}</Typography>
        </Box>
      </Box>
    </Paper>
  </Grid>
);
};

export default CarCard;
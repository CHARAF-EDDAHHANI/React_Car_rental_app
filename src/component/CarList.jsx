import React, { useEffect, useState } from "react";
import {
  AccessTime,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  createTheme,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Rating,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import CarCard from "./CarCard";



// Custom theme to adjust typography sizes
const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        { props: { variant: "body2" }, style: { fontSize: 11 } },
        { props: { variant: "body3" }, style: { fontSize: 9 } },
      ],
    },
  },
});

//carlist component
const CarList = ({ cars=[] }) => {
  return (
    <Box sx={{ padding: 1, marginTop: 0 }}>
    
    <Grid
    container
    spacing={2.5}
    sx={{
    display: 'grid',
    gap: 1,
    gridTemplateColumns: {
      xs: 'repeat(1, 1fr)',   // <600px
      sm: 'repeat(2, 1fr)',   // 600px+
      md: 'repeat(4, 1fr)',   // 900px+
      lg: 'repeat(4, 1fr)'    // 1200px+
    },
    }}
    >
        {cars.map((car) => (
          <CarCard key={car.vehicle_id} car={car} />
        ))}
      </Grid>
    </Box>
  );
};

export default CarList;

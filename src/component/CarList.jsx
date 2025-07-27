// CarList.jsx
import React from "react";
import { Box, Grid, createTheme, ThemeProvider } from "@mui/material";
import CarCard from "./CarCard";

// Custom theme to adjust typography sizes
const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        { props: { variant: "body2" }, style: { fontSize: 11 } },
        // Note: 'body3' is not a standard MUI variant; consider removing or replacing if unused
        { props: { variant: "body3" }, style: { fontSize: 9 } },
      ],
    },
  },
});

/**
 * CarList component to display a grid of CarCards
 * @param {Array} cars- Array of car objects to display
 */
const CarList = ({ cars = [] }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 1, marginTop: 0 }}>
        <Grid
          container
          spacing={2.5}
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)", // <600px
              sm: "repeat(2, 1fr)", // 600px+
              md: "repeat(4, 1fr)", // 900px+
              lg: "repeat(4, 1fr)", // 1200px+
            },
          }}
        >
          {cars.map((car) => (
            <CarCard key={car.carId} car={car} />
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default CarList;

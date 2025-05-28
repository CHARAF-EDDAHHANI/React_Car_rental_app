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

const CarCard = ({ car }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <ThemeProvider theme={theme}>
      <Paper elevation={3} className="paper">
        <img
          src={car.image}
          alt={car.model}
          style={{ width: "5cm", height: "5cm", objectFit: "cover" }}
          className="img"
        />
        <Box sx={{ paddingX: 1, paddingY: 2 }}>
          <Typography variant="subtitle1" component="h2" gutterBottom>
            {car.model} ({car.year})
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Category: {car.category}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Transmission: {car.transmission_type}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Availability: {car.availability ? "Available" : "Not Available"}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
            <AccessTime style={{ width: 14 }} />
            <Typography variant="body2" component="p" marginLeft={0.5}>
              Ready for booking
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }} marginTop={1}>
            <Rating
              name="size-small"
              size="small"
              defaultValue={car.rating || 0}
              precision={0.25}
              readOnly
            />
            <Typography variant="body2" component="p" marginLeft={0.5}>
              {car.rating || "N/A"}
            </Typography>
            <Typography variant="body3" component="p" marginLeft={1.5}>
              ({car.numberOfReviews || 0} reviews)
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" component="h2">
              Daily: ${car.daily_price}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              Weekly: ${car.weekly_price}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              Monthly: ${car.monthly_price}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  </Grid>
);

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    fetch("/data/cars.json")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setFilteredCars(data); // initially show all cars
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = () => {
    const results = cars.filter((car) =>
      car.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredCars(results);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginBottom: 3,
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Search by city"
          variant="outlined"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      <Grid container spacing={2.5}>
        {filteredCars.map((car) => (
          <CarCard key={car.vehicle_id} car={car} />
        ))}
      </Grid>
    </Box>
  );
};

export default CarList;
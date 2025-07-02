// BookNowModal.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Typography,
} from "@mui/material";
import BookingDate from "./BookingDate";

const BookNowModal = ({ open, onOk, onCancel }) => {
  // Local state for booking inputs
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [driver, setDriver] = useState("withDriver");

  // Update dates in YYYY-MM-DD format from BookingDate component
  const handleDateChange = (date, role) => {
    if (!date) return;

    const formattedDate = date.format("YYYY-MM-DD");
    if (role === "start") setStartDate(formattedDate);
    else if (role === "end") setEndDate(formattedDate);
  };

  // Validate inputs and call onOk callback with booking info
  const handleConfirm = () => {
    if (!startDate || !endDate || !pickupLocation || !dropoffLocation) {
      alert("Please select a date range and both pickup & dropoff locations.");
      return;
    }

    // Store booking info in localStorage (optional)
    localStorage.setItem("pickupLocation", pickupLocation);
    localStorage.setItem("dropoffLocation", dropoffLocation);
    localStorage.setItem("selectedDates", JSON.stringify([startDate, endDate]));
    localStorage.setItem("driver", driver);

    console.log("Booking Info:", {
      pickupLocation,
      dropoffLocation,
      startDate,
      endDate,
      driver,
    });

    onOk({ startDate, endDate, pickupLocation, dropoffLocation, driver });
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>Choose Your Dates and Location for Advance Booking</DialogTitle>

      <DialogContent dividers>
        {/* Date pickers for start and end */}
        <BookingDate onDateChange={handleDateChange} role="start" />
        <BookingDate onDateChange={handleDateChange} role="end" />

        {/* Pickup and Dropoff Location Inputs */}
        <Box mt={3} display="flex" flexDirection="column" gap={2}>
          <FormLabel sx={{ fontWeight: "bold" }}>Selected Location</FormLabel>
          <Typography variant="body2" color="text.secondary">
            Please ensure the location is accurate for a smooth booking experience.
          </Typography>

          <TextField
            label="Pickup Location"
            variant="outlined"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            fullWidth
            size="small"
          />

          <TextField
            label="Dropoff Location"
            variant="outlined"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            fullWidth
            size="small"
          />

          {/* Driver Selection */}
          <FormLabel sx={{ mt: 2, fontWeight: "bold" }}>
            Select choice for Driver
          </FormLabel>
          <RadioGroup
            row
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            aria-label="driver-choice"
            name="driver-choice"
          >
            <FormControlLabel
              value="withDriver"
              control={<Radio />}
              label="With Driver"
            />
            <FormControlLabel
              value="NoDriver"
              control={<Radio />}
              label="No Driver"
            />
          </RadioGroup>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookNowModal;

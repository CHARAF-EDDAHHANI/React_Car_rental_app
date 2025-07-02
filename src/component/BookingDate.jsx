// BookingDate.jsx
import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; 
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const BookingDate = ({ onDateChange, role }) => {
  const [date, setDate] = useState(null);

  const handleChange = (newValue) => {
    setDate(newValue);
    onDateChange && onDateChange(newValue, role);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          {role === "start" ? "Start Date:" : "End Date:"}
        </Typography>
        <DatePicker
          value={date}
          onChange={handleChange}
          renderInput={(params) => <TextField fullWidth {...params} />}
          disablePast // optional: prevent selecting past dates
        />
      </Box>
    </LocalizationProvider>
  );
};

export default BookingDate;

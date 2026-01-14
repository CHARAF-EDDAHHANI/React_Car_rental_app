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
import { useTranslation } from "react-i18next";

const BookingModal = ({ open, onOk, onCancel }) => {
  // Local state for booking inputs
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [driver, setDriver] = useState("withDriver");
  const { t } = useTranslation();

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
      console.error("Please select a date range and both pickup & dropoff locations.");
      return;
    }
    const bookingInfo = { pickupLocation, dropoffLocation, startDate, endDate, driver };
    onOk({ bookingInfo });
  };
 {/*} //common rgt lft styles for language adaptation
  const rtlsx = {
    direction: isArabic ? "rtl" : "ltr",
    textAlgn : isArabic ? "right" : "left",
  };

  //location field 
  const LocationFields = [
    {
      label: t("bookingModal.pickup_location"),
      value: pickupLocation,
      onChange: (e) => setPickupLocation(e.target.value),
    },
    {
      label: t("bookingModal.dropoff_location"),
      value: dropoffLocation,
      onChange: (e) => setDropoffLocation(e.target.value),
    }
  ]*/}

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle
      >{t("bookingModal.choose_dates_and_location")}</DialogTitle>

      <DialogContent dividers>
        {/* Date pickers for start and end */}
        <BookingDate onDateChange={handleDateChange} role="start"/>
        <BookingDate onDateChange={handleDateChange} role="end"/>

        {/* Pickup and Dropoff Location Inputs */}
        <Box mt={3} display="flex" flexDirection="column" gap={2}>
          <FormLabel sx={{ fontWeight: "bold" ,
          }}>{t("bookingModal.selected_location")}</FormLabel>
          <Typography variant="body2" color="text.secondary">
            {t("bookingModal.location_accuracy_note")}
            {t("bookingModal.airports_maritime_train_stations_available")}
          </Typography>

          <TextField
            label={t("bookingModal.pickup_location")}
            variant="outlined"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            fullWidth
            size="small"
          />

          <TextField
            label={t("bookingModal.dropoff_location")}
            variant="outlined"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            fullWidth
            size="small"
          />

          {/* Driver Selection */}
          <FormLabel sx={{ mt: 2, fontWeight: "bold",}}>
            {t("bookingModal.select_choice_for_driver")}
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
            label={t("bookingModal.with_driver")}
            />

            <FormControlLabel
            value="NoDriver"
            control={<Radio />}
            label={t("bookingModal.no_driver")}
           
            />

          </RadioGroup>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>{t("bookingModal.cancel")}</Button>
        <Button variant="contained" onClick={handleConfirm}>
          {t("bookingModal.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;

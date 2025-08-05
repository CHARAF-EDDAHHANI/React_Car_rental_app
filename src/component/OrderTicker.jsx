import React from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  Divider,
  Grid,
  Paper
} from '@mui/material';
import generateBookingPDF from '../utils/generateBookingPDF';

const OrderTicker = ({ orderticketData }) => {
  if (!orderticketData) {
    return (
      <Box p={2}>
        <Typography variant="h6">No orders created yet.</Typography>
      </Box>
    );
  }

  const handleDownload = () => {
    generateBookingPDF(orderticketData, ticketList); 
  };

  const {
    orderId,
    orderDate,
    carName,
    carYear,
    carCategory,
    totalPrice,
    startDate,
    endDate,
    driverCost,
    carCost,
    numberOfDays,
    pickupLocation,
    dropoffLocation,
    carAgencyPhone,
    carAgencyEmail
  } = orderticketData;

  const ticketList = [
    { key: 1, label: ' Desired Car : ', value: `${carName || ''} (${carYear || ''}) - ${carCategory || ''}` },
    { key: 2, label: 'Number of Days : ', value: numberOfDays },
    { key: 3, label: 'Car Cost : ', value: `$${carCost}` },
    { key: 4, label: 'Driver Cost : ', value: `$${driverCost || '' }` },
    { key: 5, label: 'Total Price : ', value: `$${totalPrice}` },
    { key: 6, label: 'Pickup Location : ', value: pickupLocation },
    { key: 7, label: 'Dropoff Location : ', value: dropoffLocation },
    { key: 8, label: 'Start Date : ', value: new Date(startDate).toLocaleDateString() },
    { key: 9, label: 'End Date : ', value: new Date(endDate).toLocaleDateString() },
    { key: 10, label: 'Car Agency Phone : ', value: carAgencyPhone },
    { key: 11, label: 'Car Agency Email : ', value: carAgencyEmail },
    { key: 12, label: 'Ticket Date : ', value: orderDate },
    { key: 13, label: 'Ticket ID : ', value: orderId },

  ];

  return (
    <Box  pl={2} width="100%" >
      <Card sx={{ p: 2, width: '100%', boxShadow: 1, borderRadius: 1, backgroundColor: '#f8f9fa', border: '1px solid #bec7bf' }}>
        <Typography
          variant="h5"
          component="h3"
          bgcolor="#ccf8db"
          p={1}
          mb={1}
          borderRadius={1}
          textAlign="center"
          sx={{ color: '#2f5939' }}
        >
          Booking Confirmation Ticket
        </Typography>
   {/* ticket details */}
        <Grid container sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1em',
          }} >
          {ticketList.map((item) => (
            <Grid item xs={2} sm={2} key={item.key}>
              <Paper
                elevation={1}
                sx={{
                  p: 0.7,
                  borderRadius: 1,
                  backgroundColor: '#ffffff',
                  borderLeft: '3px solid #98ea93ff',
                  height: '100%',
                }}
              >
                <Typography variant="subtitle3" fontWeight="bold" color="textSecondary">
                  {item.label}
                </Typography>
                <Typography variant="subtitle3"  color="textSecondary">
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mt: 4, mb: 2, borderColor: '#1cf723' }} />

        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            onClick={handleDownload}
            sx={{
              backgroundColor: '#1f79e0',
              '&:hover': {
                backgroundColor: '#4f83f4',
              },
            }}
          >
            Download Ticket (PDF)
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default OrderTicker;
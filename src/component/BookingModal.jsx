// BookNowModal.jsx
import React, { useState } from 'react';
import { Modal } from 'antd';
import BookingDate from './BookingDate';

const BookNowModal = ({ open, onOk, onCancel }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');

  const handleDateChange = (date, role) => {
    if (!date) return;

    const formattedDate = date.format("YYYY-MM-DD");

    if (role === 'start') {
      setStartDate(formattedDate);
    } else if (role === 'end') {
      setEndDate(formattedDate);
    }
  };

  const handleOk = () => {
    if (!startDate || !endDate || !pickupLocation || !dropoffLocation) {
      alert("Please select a date range and both pickup & dropoff locations.");
      return;
    }

    localStorage.setItem('pickupLocation', pickupLocation);
    localStorage.setItem('dropoffLocation', dropoffLocation);
    localStorage.setItem('selectedDates', JSON.stringify([startDate, endDate]));

    console.log("Booking Info:", {
      pickupLocation,
      dropoffLocation,
      startDate,
      endDate,
    });

    onOk({ startDate, endDate, pickupLocation, dropoffLocation });
  };

  return (
    <Modal
      open={open}
      title="Choose Your Dates and Location for advance booking:"
      onOk={handleOk}
      onCancel={onCancel}
      style={{ top: 20 }}
    >
      <BookingDate onDateChange={handleDateChange} role="start" />
      <BookingDate onDateChange={handleDateChange} role="end" />

      <div style={{ display: 'grid', gap: '1em', marginTop: '1em' }}>
        <h4>Selected Location:</h4>
        <p style={{ color: '#888' }}>
          Please ensure the location is accurate for a smooth booking experience.
        </p>

        <input
          type="text"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          placeholder="Enter the Pickup Location"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #d9d9d9',
          }}
        />

        <input
          type="text"
          value={dropoffLocation}
          onChange={(e) => setDropoffLocation(e.target.value)}
          placeholder="Enter the Dropoff Location"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #d9d9d9',
          }}
        />
      </div>
    </Modal>
  );
};

export default BookNowModal;

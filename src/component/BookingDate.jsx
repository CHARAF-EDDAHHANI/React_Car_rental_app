// BookingDate.jsx
import React from 'react';
import { DatePicker, Space } from 'antd';

const BookingDate = ({ onDateChange, role }) => {
  const [date, setDate] = React.useState(null);

  const handleChange = (value) => {
    setDate(value);
    onDateChange && onDateChange(value, role);
  };

  return (
    <Space direction="vertical">
      <label>{role === 'start' ? 'Start Date:' : 'End Date:'}</label>
      <DatePicker onChange={handleChange} />
    </Space>
  );
};

export default BookingDate;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Modal,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import {
  AttachMoney as AttachMoneyIcon,
  Category as CategoryIcon,
  Settings as SettingsIcon,
  AirlineSeatReclineNormal as SeatsIcon,
  RestartAlt as ResetIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

const MenuModal = ({ open, onClose }) => {
  const [lowPrice, setLowPrice] = React.useState(false);
  const [transmissionBVA, setTransmissionBVA] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const [numberOfSeats, setNumberOfSeats] = React.useState('');
  const [showCategoryModal, setShowCategoryModal] = React.useState(false);
  const [showSeatsModal, setShowSeatsModal] = React.useState(false);

  const navigate = useNavigate();

  const handleButtonClick = (type) => {
    switch (type) {
      case 'LowPrice':
        setLowPrice(!lowPrice);
        break;
      case 'Transmission':
        setTransmissionBVA(!transmissionBVA);
        break;
      case 'Category':
        setShowCategoryModal(true);
        break;
      case 'NumberOfSeats':
        setShowSeatsModal(true);
        break;
      case 'Reset':
        setLowPrice(false);
        setTransmissionBVA(false);
        setCategory('');
        setNumberOfSeats('');
        break;
      case 'Validate': {
        const FilterData = { lowPrice, transmissionBVA, category, numberOfSeats };
        localStorage.setItem('FilterData', JSON.stringify(FilterData));
        console.log('FilterData:', FilterData);
        navigate('/filtered-cars', { state: { FilterData } });
        onClose();
        break;
      }
      default:
        break;
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setShowCategoryModal(false);
  };

  const handleSeatsChange = (e) => {
    setNumberOfSeats(e.target.value);
    setShowSeatsModal(false);
  };

  const buttonConfig = [
    { name: 'Low Price', type: 'LowPrice', btncolor: '#34D399', icon: <AttachMoneyIcon /> },
    { name: 'Category', type: 'Category', btncolor: '#84CC16', icon: <CategoryIcon /> },
    { name: 'BVA', type: 'Transmission', btncolor: '#FFB300', icon: <SettingsIcon /> },
    { name: 'Seats', type: 'NumberOfSeats', btncolor: '#0F766E', icon: <SeatsIcon /> },
    { name: 'Reset', type: 'Reset', btncolor: '#FCD34D', icon: <ResetIcon /> },
    { name: 'Validate', type: 'Validate', btncolor: '#0a87a1', icon: <CheckIcon /> }
  ];

  const isSelected = (type) => {
    if (type === 'LowPrice') return lowPrice;
    if (type === 'Transmission') return transmissionBVA;
    return false;
  };

  return (
    <>
      {/* Main Filter Modal */}
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1em',
            position: 'absolute',
            top: '50%',
            left: '50%',
            py: 3,
            transform: 'translate(-50%, -50%)',
            width: 350,
            bgcolor: '#fff',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          {buttonConfig.map(({ name, type, btncolor, icon }) => (
            <Button
              key={type}
              variant="contained"
              startIcon={icon}
              onClick={() => handleButtonClick(type)}
              sx={{
                display: 'grid',
                gridTemplateRows: 'repeat(2, 1fr)',
                backgroundColor: btncolor,
                color: '#fff',
                borderRadius: 8,
                border: isSelected(type) ? '3px solid #fff' : 'none',
                boxShadow: isSelected(type) ? '0 0 10px #000' : 'none',
                '&:hover': {
                  backgroundColor: btncolor,
                  opacity: 0.9
                }
              }}
            >
              {name}
            </Button>
          ))}
        </Box>
      </Modal>

      {/* Category Modal */}
      <Modal open={showCategoryModal} onClose={() => setShowCategoryModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2
          }}
        >
          <FormControl>
            <FormLabel>Choose a category</FormLabel>
            <RadioGroup value={category} onChange={handleCategoryChange}>
              {['SUV', 'Compact', 'Luxury', 'Van', 'Economic'].map((opt) => (
                <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Modal>

      {/* Seats Modal */}
      <Modal open={showSeatsModal} onClose={() => setShowSeatsModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2
          }}
        >
          <FormControl>
            <FormLabel>Choose number of seats</FormLabel>
            <RadioGroup value={numberOfSeats} onChange={handleSeatsChange}>
              {['2', '4', '5', '7', '>7'].map((opt) => (
                <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};

export default MenuModal;

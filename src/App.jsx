import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './component/Header';
import CarBook from './pages/CarBook';
import CarSearch from './pages/CarSearch';
import Home from './pages/home';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <Router>
      <Header setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <Box sx={{ mt: 8 }}> {/* Add margin to account for AppBar */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/carbooking/:vehicle_id" element={<CarBook />}/>
          <Route path="/CarSearch/:location" element={<CarSearch />} />
          <Route path="/Profile/" element={<UserProfile />} />
          <Route path="/Login/" element={<Login />} />
          <Route path="/SignUp/" element={<SignUp />} />



        </Routes>
      </Box>
    </Router>
  );
};

export default App;
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
import LandingPage from './pages/LandingPage';
import Testpage from './pages/Testpage';
import ErrorBoundary from './component/ErrorBoundary'; // Import your ErrorBoundary

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <Router>
      <Header setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <Box sx={{ mt: 8 }}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/loca" element={<Home />} />
            <Route path="/carbooking/:vehicle_id" element={<CarBook />} />
            <Route path="/CarSearch/:location" element={<CarSearch />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/Login/" element={<Login />} />
            <Route path="/SignUp/" element={<SignUp />} />
            <Route path="/Testpage" element={<Testpage />} />
            {/* Add more routes as needed */}
          </Routes>
        </ErrorBoundary>
      </Box>
    </Router>
  );
};

export default App;

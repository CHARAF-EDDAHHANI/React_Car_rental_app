// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './component/Header';
import ErrorBoundary from './component/ErrorBoundary';
import AboutPage from './pages/AboutPage';
import Home from './pages/Home';
import CarBook from './pages/CarBook';
import CarSearch from './pages/CarSearch';
import UserProfile from './pages/UserProfile';
import AuthPage from './pages/AuthPage';
const App = () => {
  // State for managing the search input (shared with Header)
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <Router>
      {/* Header is always visible and receives search state props */}
      <Header setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      {/* Main content area with top margin to avoid overlap with fixed header */}
      <Box sx={{ mt: 8 }}>
        {/* Error boundary wraps all routes to catch rendering errors */}
        <ErrorBoundary>
          <Routes>
             <Route path="/" element={<Home />}/>
            <Route path="/About-loca" element={<AboutPage />}/>
            <Route path="/Authentication" element={<AuthPage />} />
            <Route path="/carbooking/:vehicle_id" element={<CarBook />} />
            <Route path="/CarSearch/:location" element={<CarSearch />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </ErrorBoundary>
      </Box>
    </Router>
  );
};

export default App;

// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// Import shared components
import Header from './component/Header';
import ErrorBoundary from './component/ErrorBoundary';

// Import page components
import LandingPage from './pages/LandingPage';
import Home from './pages/home';
import CarBook from './pages/CarBook';
import CarSearch from './pages/CarSearch';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Testpage from './pages/Testpage';

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
             <Route path="/" element={<Home />} />
            <Route path="/loca" element={<LandingPage />}/>
            <Route path="/carbooking/:vehicle_id" element={<CarBook />} />
            <Route path="/CarSearch/:location" element={<CarSearch />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/Login/" element={<Login />} />
            <Route path="/SignUp/" element={<SignUp />} /> 
            <Route path="/testpage" element={<Testpage />} />
          </Routes>
        </ErrorBoundary>
      </Box>
    </Router>
  );
};

export default App;

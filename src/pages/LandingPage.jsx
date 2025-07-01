import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Chip,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: { main: 'rgb(12, 174, 96)' },
    secondary: { main: '#FACC15' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const carCategories = ['Economy', 'Van', 'SUV', 'Luxury'];

// Framer Motion Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};
    

const LandingPage = () => {

     const navigate = useNavigate();
const handleStartBtn = () => {
    const user = localStorage.getItem('user');
    if (!user) {
        navigate('/Login');
    } else {
        navigate('/loca');
    }
};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Hero Section */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <Box sx={{ backgroundColor: 'rgb(158, 252, 199)', py: 8, textAlign: 'center' }}>
          <Container>
            <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
              Your Journey Starts with Fairness and Freedom
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Choose your car, agree on a fair price, and drive with confidence.
            </Typography>
            <Button 
             variant="contained"
             color="secondary" 
             size="large"
             onClick={handleStartBtn}>
              Get Started
            </Button>
          </Container>
        </Box>
      </motion.div>

      {/* Services Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {[
            { title: 'Self-Drive', desc: 'Enjoy with modern rental cars' },
            { title: 'Airport Pickup & Dropoff', desc: 'Timely transport to/from any airport in Morocco' },
            { title: 'Rent Car With Driver', desc: 'Comfortable rides with professional local drivers (Trip Guideness offered)' },

          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={service.title}>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Box sx={{ backgroundColor: 'rgba(255, 237, 44, 0.72)', py: 6 }}>
        <Container>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Typography variant="h4" textAlign="center" color="primary" fontWeight="bold" gutterBottom>
              Browse Our Car Categories
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" mt={4} flexWrap="wrap">
              {carCategories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  color="primary"
                  sx={{ fontSize: '1rem', m: 1 }}
                />
              ))}
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
            Trusted by Thousands
          </Typography>
          <Grid container spacing={4} justifyContent="center" mt={2}>
            {[
              { number: '10,000+', label: 'Cars Rented' },
              { number: '5', label: 'Cities in Morocco' },
              { number: '50K+', label: 'App Downloads' },
            ].map((stat) => (
              <Grid item xs={12} sm={4} key={stat.label}>
                <Typography variant="h4" color="secondary">{stat.number}</Typography>
                <Typography variant="subtitle2">{stat.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#064E3B', color: 'white', py: 6, px: 2 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Services</Typography>
              <ul>
                <li>City Rentals</li>
                <li>Intercity Rides</li>
                <li>Delivery</li>
                <li>With Driver</li>
                <li>Airport Pickup</li>
              </ul>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Company</Typography>
              <ul>
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Support</Typography>
              <ul>
                <li>Contact</li>
                <li>FAQs</li>
                <li>Safety</li>
              </ul>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Follow Us</Typography>
              <Box mt={1} display="flex" gap={2}>
                <span>📘</span>
                <span>📸</span>
                <span>🐦</span>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="caption" display="block" textAlign="center" mt={4}>
            © 2025 Your Car Rental App. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;

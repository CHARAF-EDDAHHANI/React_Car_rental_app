// Header.jsx

import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  styled,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MenuModal from './Menumodal';

// Styled Components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // Padding left for search icon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  const navigate = useNavigate();

  // Local state
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  // Menu state
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Handle navigation to profile or login
  const handleProfileMenuOpen = () => {
    try {
      const userSession = JSON.parse(localStorage.getItem('user'));
      userSession?.email ? navigate(`/Profile`) : navigate(`/Login`);
    } catch (error) {
      alert('Error opening profile, please contact support');
      console.error('Error opening profile:', error);
    }
  };

  // Search input logic
  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      const location = searchTerm.trim().toLowerCase();
      if (!location) return alert('Please enter a search term');
      navigate(`/CarSearch/${encodeURIComponent(location)}`);
    }
  };

  // Menu open/close handlers
  const handleMobileMenuOpen = (e) => setMobileMoreAnchorEl(e.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // Desktop Menu
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  // Mobile Menu
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: 'url(/images/header-img.jpg) no-repeat center center / cover',
          color: '#fff',
          boxShadow: 'none',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar
          sx={{
            flexDirection: 'column',
            alignItems: 'stretch',
            p: 1,
            color: '#D1FAE5',
          }}
        >
          {/* === Row 1: Top Bar === */}
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            {/* === Left Side: Menu + Logo === */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                <MenuIcon onClick={() => setIsModalOpen(true)} />
              </IconButton>
              <MenuModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
              <img
                src="/images/loca-logo.png"
                alt="logo"
                style={{
                  width: '50px',
                  height: '50px',
                  position: 'absolute',
                  left: '47%',
                  borderRadius: '30%',
                  padding: '5px',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/')}
              />
            </Box>

            {/* === Right Side Icons === */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Mobile icon */}
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton size="large" onClick={handleMobileMenuOpen} color="inherit">
                  <MoreIcon />
                </IconButton>
              </Box>

              {/* Desktop icons */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                <IconButton size="large" color="inherit">
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton size="large" color="inherit">
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* === Row 2: Search Bar === */}
          <Box
            sx={{
              mt: { xs: 2, md: 1 },
              width: { xs: '100%', md: '60%' },
              alignSelf: 'center',
            }}
          >
            <Search
              sx={{
                width: '100%',
                borderRadius: '30px',
                color: '#fff',
                border: '1px solid #84CC16',
              }}
            >
              <SearchIconWrapper>
                <SearchIcon style={{ cursor: 'pointer' }} onClick={handleSearch} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search by city"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleSearch}
              />
            </Search>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile and Desktop Menus */}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;

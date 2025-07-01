import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import MenuModal from './Menumodal';

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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = () => {
    const userSession = JSON.parse(localStorage.getItem('user'));
    try {
      if (userSession?.email) {
        navigate(`/Profile`);
      } else {
        navigate(`/Login`);
      }
    } catch (error) {
      alert('Error opening profile, please contact support');
      console.error('Error opening profile:', error);
    }
  };

  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      const location = searchTerm.trim().toLowerCase();
      if (!location) return alert('Please enter a search term');
      navigate(`/CarSearch/${encodeURIComponent(location)}`);
    }
  };

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
          color:'#fff',
          boxShadow: 'none',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ flexDirection: 'column', alignItems: 'stretch', p:1 , color: '#D1FAE5'}}>
          {/* Row 1: Top Bar for mobile, normal bar for desktop */}
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: { xs: 'space-between', md: 'space-between' },
              flexDirection: { xs: 'row', md: 'row' },
            }}
          >
            {/* Left: Menu + Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                <MenuIcon onClick={() => setIsModalOpen(true)} />
                <MenuModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
              </IconButton>
              <img
                src="/images/loca-logo.png"
                alt="logo"
                style={{
                  width: '50px',
                  height: '50px',
                  position: 'absolute',
                  left : '47%',
                  borderRadius: '30%',
                  padding: '5px',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/')}
              />
            </Box>

            {/* Right side icons (desktop visible, mobile inline here) */}
            <Box sx={{ display: { xs: 'flex', md: 'flex' }, alignItems: 'center' }}>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton size="large" onClick={handleMobileMenuOpen} color="inherit">
                  <MoreIcon />
                </IconButton>
              </Box>
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

          {/* Row 2: Search bar (mobile below top bar, desktop centered) */}
          <Box
            sx={{
              mt: { xs: 2, md: 1 },
              width: { xs: '100%', md: '60%' },
              alignSelf: { xs: 'center', md: 'center' },
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
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;

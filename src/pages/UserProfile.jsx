import React, { useEffect, useState } from 'react';
import {
  Upload as UploadIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  EventNote as CalendarIcon,
  DirectionsCarFilled as CarIcon,
  Cancel as CancelIcon,
  CancelPresentation as DisvalidateIcon,
  ReportProblem as WarningIcon,
  Chat as ChatIcon,
  SupportAgent as SupportIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

import {
  Box,
  Drawer,
  SwipeableDrawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UploadCar from '../component/UploadCar';

const drawerWidth = 240;
const collapsedWidth = 60;

const UserProfile = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileType, setProfileType] = useState('');
  const [userSession, setUserSession] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem('user'));
      if (!session) throw new Error('No session');
      setUserSession(session);
      if (session.userType === 'seller') setProfileType('seller');
      else if (session.userType === 'buyer') setProfileType('buyer');
      else throw new Error('Invalid userType');
    } catch (error) {
      console.error('Session error:', error.message);
      localStorage.removeItem('user');
      navigate('/Login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleDrawer = () => setCollapsed(!collapsed);
  const toggleMobileDrawer = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { key: '1', icon: <UploadIcon color="primary" />, label: 'Upload New Car' },
    { key: '2', icon: <LogoutIcon />, label: 'Logout', onClick: handleLogout },
    { key: '3', icon: <CalendarIcon color="warning" />, label: 'All Reservations' },
    { key: '4', icon: <CheckCircleIcon color="success" />, label: 'Validated Reservation' },
    { key: '5', icon: <DisvalidateIcon color="error" />, label: 'Disvalidated Reservation' },
    { key: '6', icon: <ChatIcon color="primary" />, label: 'Messages' },
    { key: '7', icon: <SupportIcon sx={{ color: '#9254de' }} />, label: 'Support' },
    { key: '8', icon: <WarningIcon color="warning" />, label: 'Reclamation' },
    { key: '9', icon: <CarIcon color="info" />, label: 'My Cars' },
    { key: '10', icon: <CancelIcon color="error" />, label: 'Unavailable Cars' },
    { key: '11', icon: <CheckCircleIcon color="success" />, label: 'Available Cars' },
  ];

  const getFilteredMenuItems = () =>
    profileType === 'buyer' ? menuItems.slice(1, 8) : menuItems;

  const renderMenu = () => (
    <Box sx={{ width: collapsed ? collapsedWidth : drawerWidth }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={isMobile ? toggleMobileDrawer : toggleDrawer}>
          {collapsed ? <MenuIcon /> : <CloseIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {getFilteredMenuItems().map(({ key, icon, label, onClick }) => (
          <ListItem
            button
            key={key}
            onClick={() => {
              if (label === 'Upload New Car') setUploadOpen(true);
              else if (label === 'Logout') handleLogout();
              else onClick?.();
              if (isMobile) setMobileOpen(false);
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            {!collapsed && <ListItemText primary={label} />}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const DetailItem = ({ label, value }) => (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: '#ffffff',
        boxShadow: 1,
        border: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="body1" fontWeight="bold" color="primary">
        {label}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {value || 'N/A'}
      </Typography>
    </Box>
  );

  const renderUserDetails = () => {
    if (!userSession) return null;

    const commonFields = (
      <>
        <DetailItem label="Firstname" value={userSession.firstname} />
        <DetailItem label="Lastname" value={userSession.lastname} />
        <DetailItem label="Email" value={userSession.email} />
        <DetailItem label="Phone" value={userSession.phone} />
      </>
    );

    if (profileType === 'buyer') return commonFields;

    if (profileType === 'seller') {
      return (
        <>
          {commonFields}
          <DetailItem label="Address" value={userSession.address} />
          <DetailItem label="Plan" value={userSession.plan} />
          <DetailItem label="Company Name" value={userSession.companyName} />
          <DetailItem label="Company Address" value={userSession.companyAddress} />
          <DetailItem label="Company Phone" value={userSession.companyPhone} />
          <DetailItem label="Company Email" value={userSession.companyEmail} />
        </>
      );
    }

    return null;
  };

  return profileType ? (
    <Box sx={{ flexGrow: 1,  }}>
      {/* Mobile Swipe Drawer */}
      {isMobile ? (
        <SwipeableDrawer
          anchor="left"
          open={mobileOpen}
          onOpen={toggleMobileDrawer}
          onClose={toggleMobileDrawer}
        >
          {renderMenu()}
        </SwipeableDrawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: collapsed ? collapsedWidth : drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: collapsed ? collapsedWidth : drawerWidth,
              transition: 'width 0.3s ease',
              overflowX: 'hidden',
              boxSizing: 'border-box',
              bgcolor: '#f8f9fa',
              cursor: 'pointer',
            },
          }}
          open
        >
          {renderMenu()}
        </Drawer>
      )}
 
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          ml: isMobile ? 0 : collapsed ? `${collapsedWidth}px` : `${drawerWidth}px`,
          p: 3,
        }}
      >
        
 {/* Toggle button on top for mobile */}
        {isMobile && (
          <IconButton onClick={toggleMobileDrawer} sx={{ mb: 2 }}>
            <MenuIcon
            sx={{
              position: 'absolute',
              top: -125,
              left: -16,
              fontSize: 23,
              fontWeight: 'bold',
              bgcolor: 'rgba(23, 24, 24, 0.43)',
              borderRadius: '50%',
             color: 'rgb(255, 255, 255)',
            }}/>
          </IconButton>
        )}
        
        <Typography variant="h6" gutterBottom>
          {profileType === 'seller' && `You are subscribed as a ${userSession?.userType}`}
        </Typography>

        <Box
          sx={{
            mt: 2,
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr',
            },
          }}
        >
          {renderUserDetails()}
        </Box>
      </Box>

      <UploadCar open={uploadOpen} handleClose={() => setUploadOpen(false)} />
    </Box>
  ) : null;
};

export default UserProfile;

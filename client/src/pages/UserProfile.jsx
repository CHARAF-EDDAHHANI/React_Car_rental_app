import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  SwipeableDrawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../component/SidebarMenu";
import UserDetails from "../component/UserDetails";
import UploadCar from "../component/UploadCar";
import { getUserById } from "../Axios/userAxios";
const drawerWidth = 240;
const collapsedWidth = 60;

export default function UserProfile() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileType, setProfileType] = useState("");
  const [userSession, setUserSession] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch User Data
  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));

    if (!credentials) {
      navigate("/Authentication");
      return;
    }

    const loadUser = async () => {
      try {
        const data = await getUserById(credentials.userId, credentials.userType);
        setUserSession(data);
        setProfileType(data.userType);
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };

    loadUser();
  }, [navigate]);

  // Still loading user type
  if (!profileType) return null;

  const handleLogout = () => {
    localStorage.removeItem("credentials");
    navigate("/");
  };

  // Drawer Component (Mobile + Desktop)
  const DrawerContent = (
    <SidebarMenu
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      isMobile={isMobile}
      setMobileOpen={setMobileOpen}
      profileType={profileType}
      setUploadOpen={setUploadOpen}
      handleLogout={handleLogout}
    />
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Mobile Drawer */}
      {isMobile ? (
        <SwipeableDrawer
          anchor="left"
          open={mobileOpen}
          onOpen={() => setMobileOpen(true)}
          onClose={() => setMobileOpen(false)}
        >
          {DrawerContent}
        </SwipeableDrawer>
      ) : (
        // Desktop Drawer
        <Drawer
          variant="permanent"
          open
          sx={{
            width: collapsed ? collapsedWidth : drawerWidth,
            "& .MuiDrawer-paper": {
              width: collapsed ? collapsedWidth : drawerWidth,
              transition: "width 0.3s ease",
              overflowX: "hidden",
              bgcolor: "#ffffffff",
              position: "absolute",
              height: "80vh",
              top: "83px",
            },
          }}
        >
          {DrawerContent}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          ml: isMobile ? 0 : collapsed ? `${collapsedWidth}px` : `${drawerWidth}px`,
          p: 2,
        }}
      >
        {isMobile && (
          <IconButton onClick={() => setMobileOpen(true)} sx={{ mb: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        <UserDetails user={userSession} profileType={profileType} />
      </Box>

      <UploadCar open={uploadOpen} handleClose={() => setUploadOpen(false)} />
    </Box>
  );
}

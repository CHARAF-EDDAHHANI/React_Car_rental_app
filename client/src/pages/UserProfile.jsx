import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  SwipeableDrawer,
  IconButton,
  Typography,
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

  // Fetch user data on mount
  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    if (!credentials) {
      console.log("No credentials found, redirecting to home.");
      navigate("/Authentication");
      return;
    }

    const fetchUserData = async () => {
      try {
        const data = await getUserById(credentials.userId, credentials.userType);
        console.log("Fetched user data:", data);
        setUserSession(data);
        setProfileType(data.userType);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!profileType) return null;

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("credentials");
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Sidebar */}
      {isMobile ? (
        <SwipeableDrawer
          anchor="left"
          open={mobileOpen}
          onOpen={() => setMobileOpen(true)}
          onClose={() => setMobileOpen(false)}
        >
          <SidebarMenu
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            isMobile={isMobile}
            setMobileOpen={setMobileOpen}
            profileType={profileType}
            setUploadOpen={setUploadOpen}
            handleLogout={handleLogout}
          />
        </SwipeableDrawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: collapsed ? collapsedWidth : drawerWidth,
            "& .MuiDrawer-paper": {
              width: collapsed ? collapsedWidth : drawerWidth,
              transition: "width 0.3s ease",
              overflowX: "hidden",
              boxSizing: "border-box",
              bgcolor: "#f8f9fa",
              cursor: "pointer",
            },
          }}
          open
        >
          <SidebarMenu
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            isMobile={isMobile}
            setMobileOpen={setMobileOpen}
            profileType={profileType}
            setUploadOpen={setUploadOpen}
            handleLogout={handleLogout}
          />
        </Drawer>
      )}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          ml: isMobile ? 0 : collapsed ? `${collapsedWidth}px` : `${drawerWidth}px`,
          p: 3,
        }}
      >
        {isMobile && (
          <IconButton onClick={() => setMobileOpen(true)} sx={{ mb: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" gutterBottom>
          {profileType === "seller" &&
            `You are subscribed as a ${userSession?.userType}`}
        </Typography>

        <UserDetails user={userSession} profileType={profileType} />
      </Box>

      <UploadCar open={uploadOpen} handleClose={() => setUploadOpen(false)} />
    </Box>
  );
}

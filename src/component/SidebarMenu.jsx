// SidebarMenu.jsx
import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Upload as UploadIcon,
  Logout as LogoutIcon,
  EventNote as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  CancelPresentation as DisvalidateIcon,
  Chat as ChatIcon,
  SupportAgent as SupportIcon,
  ReportProblem as WarningIcon,
  DirectionsCarFilled as CarIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const drawerWidth = 240;
const collapsedWidth = 60;

export default function SidebarMenu({
  collapsed,
  setCollapsed,
  isMobile,
  setMobileOpen,
  profileType,
  setUploadOpen,
  handleLogout,
}) {
  // Menu items
  const menuItems = [
    { key: "1", icon: <UploadIcon color="primary" />, label: "Upload New Car" },
    { key: "2", icon: <LogoutIcon />, label: "Logout", onClick: handleLogout },
    { key: "3", icon: <CalendarIcon color="warning" />, label: "All Reservations" },
    { key: "4", icon: <CheckCircleIcon color="success" />, label: "Validated Reservation" },
    { key: "5", icon: <DisvalidateIcon color="error" />, label: "Disvalidated Reservation" },
    { key: "6", icon: <ChatIcon color="primary" />, label: "Messages" },
    { key: "7", icon: <SupportIcon sx={{ color: "#9254de" }} />, label: "Support" },
    { key: "8", icon: <WarningIcon color="warning" />, label: "Reclamation" },
    { key: "9", icon: <CarIcon color="info" />, label: "My Cars" },
    { key: "10", icon: <CancelIcon color="error" />, label: "Unavailable Cars" },
    { key: "11", icon: <CheckCircleIcon color="success" />, label: "Available Cars" },
  ];

  const getFilteredMenuItems = () =>
    profileType === "buyer" ? menuItems.slice(1, 8) : menuItems;

  return (
    <Box sx={{ width: collapsed ? collapsedWidth : drawerWidth }}>
      {/* Collapse/expand button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton
          onClick={isMobile ? () => setMobileOpen(false) : () => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuIcon /> : <CloseIcon />}
        </IconButton>
      </Box>
      <Divider />

      {/* Menu list */}
      <List>
        {getFilteredMenuItems().map(({ key, icon, label, onClick }) => (
          <ListItem
            button
            key={key}
            onClick={() => {
              if (label === "Upload New Car") setUploadOpen(true);
              else if (label === "Logout") handleLogout();
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
}

import React from "react";
import { Box, Typography } from "@mui/material";

export default function DetailItem({ label, value }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "#fff",
        boxShadow: 1,
        border: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="body1" fontWeight="bold" color="primary">
        {label}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {value || "N/A"}
      </Typography>
    </Box>
  );
}

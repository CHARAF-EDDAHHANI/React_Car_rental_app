// UserDetails.jsx
import React from "react";
import { Box } from "@mui/material";
import DetailItem from "./DetailItem";

export default function UserDetails({ user, profileType }) {
  if (!user) {
    console.log("No user data available please check your login process USERDETAILS 8.");
    return null;
  } 

  const baseDetails = (
    <>
      <DetailItem label="Firstname" value={user.firstname} />
      <DetailItem label="Lastname" value={user.lastname} />
      <DetailItem label="Email" value={user.email} />
      <DetailItem label="Phone" value={user.phone} />
    </>
  );

  return (
    <Box
      sx={{
        mt: 2,
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr",
        },
      }}
    >
      {profileType === "seller" ? (
        <>
          {baseDetails}
          <DetailItem label="Address" value={user.adress} />
          <DetailItem label="Plan" value={user.plan} />
          <DetailItem label="Company Name" value={user.companyName} />
          <DetailItem label="Company Address" value={user.companyAddress} />
          <DetailItem label="Company Phone" value={user.companyPhone} />
          <DetailItem label="Company Email" value={user.companyEmail} />
        </>
      ) : (
        baseDetails
      )}
    </Box>
  );
}

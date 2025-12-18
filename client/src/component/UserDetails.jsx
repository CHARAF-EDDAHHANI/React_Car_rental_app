// UserDetails.jsx
import React from "react";
import { Box } from "@mui/material";
import DetailItem from "./DetailItem";
import { useTranslation } from "react-i18next";

export default function UserDetails({ user, profileType }) {
  const { i18n, t } = useTranslation();
const isArabic = i18n.language === "ar";
  if (!user) {
    console.log("No user data available please check your login process USERDETAILS 8.");
    return null;
  } 

  const baseDetails = (
    <>
      <DetailItem label={t("user.firstname")} value={user.firstname} />
      <DetailItem label={t("user.lastname")} value={user.lastname} />
      <DetailItem label={t("user.email")} value={user.email} />
      <DetailItem label={t("user.phone")} value={user.phone} />
    </>
  );

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr",
          direction: isArabic ? "rtl" : "ltr",
        },
      }}
    >
      {profileType === "seller" ? (
        <>
          {baseDetails}
          <DetailItem label={t("user.address")} value={user.address} />
          <DetailItem label={t("user.plan")} value={user.plan} />
          <DetailItem label={t("user.companyName")} value={user.companyName} />
          <DetailItem label={t("user.companyAddress")} value={user.companyAddress} />
          <DetailItem label={t("user.companyPhone")} value={user.companyPhone} />
          <DetailItem label={t("user.companyEmail")} value={user.companyEmail} />
        </>
      ) : (
        baseDetails
      )}
    </Box>
  );
}

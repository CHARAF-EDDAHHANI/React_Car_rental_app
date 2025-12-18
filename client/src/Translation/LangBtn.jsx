import { useTranslation } from "react-i18next";
import { MenuItem, Select, Box } from "@mui/material";

const languages = [
  { code: "en",  flag: "/flags/en.png" },
  { code: "fr",  flag: "/flags/fr.png" },
  { code: "ar",  flag: "/flags/ar.png" },
  { code: "es",  flag: "/flags/es.png" },
  { code: "de",  flag: "/flags/de.png" },
];

export default function LangBtn() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      size="small"
      IconComponent={() => null}
      sx={{
        borderRadius: "50px",
        border: "none",
        boxShadow: "none",
        "& fieldset": { border: "none" },
        "&:hover fieldset": { border: "none" },
        "&.Mui-focused fieldset": { border: "none" },
        minWidth: 60,
        fontWeight: "bold",
      }}
    >
      {languages.map((lang) => (
        <MenuItem key={lang.code} value={lang.code}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src={lang.flag}
              alt={lang.label}
              width="22"
              height="22"
              style={{ borderRadius: "50%" }}
            />
            {lang.label}
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
}

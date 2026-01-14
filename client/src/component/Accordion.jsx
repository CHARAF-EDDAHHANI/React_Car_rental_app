import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

/* - RTL aware Accordion - */

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",

  // RTL / LTR handled dynamically
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },

  "& .MuiAccordionSummary-content": {
    marginInlineStart: theme.spacing(1),
  },

  minHeight: 56,
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

/* - Component - */

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState(false);
  const { t } = useTranslation();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  /* - Accordion Data - */

  const accordionData = [
    {
      id: "panel1",
      title: "accordion.eligibility_requirements",
      items: [
        "accordion.renters_must_be_at_least_18_years_old_some_vehicles_may_require_25_plus",
        "accordion.A_valid_driver's_license_is_required_at_pickup",
        "accordion.Tourist_and_International_renters_must_present_a_passport",
      ],
    },
    {
      id: "panel2",
      title: "accordion.payment_methods",
      items: [
        "accordion.Reservations_can_be_made_online_by_phone_or_in_person",
        "accordion.A_security_deposit_is_required_at_pickup",
        "accordion.Payment_methods_Credit_debit_cards_cash_(prepaid_cards_not_accepted)",
      ],
    },
    {
      id: "panel6",
      title: "accordion.Prohibited_Uses",
      items: [
        "accordion.No_off-road_driving_racing_or_towing_unless_approved",
        "accordion.No_unauthorized_drivers_only_listed_renters_are_insured",
      ],
    },
    {
      id: "panel8",
      title: "accordion.cancellation_policy",
      items: [
        "accordion.Free_cancellation_up_to_24_hours_before_pickup",
        "accordion.No_shows_or_late_cancellations_may_incur_a_fee",
      ],
    },
    {
      id: "panel9",
      title: "accordion.Vehicle_Return",
      items: [
        "accordion.Return_the_car_on_time_to_avoid_late_fees",
        "accordion.Cleanliness_fee_may_apply_if_excessively_dirty",
      ],
    },
    {
      id: "panel10",
      title: "accordion.Breakdowns_And_Accidents",
      items: [
        "accordion.In_case_of_accident_contact_company",
        "accordion.Roadside_assistance_available_24_7",
      ],
    },
  ];


  return (
    <Box
      sx={{
        mb: 10, }}
    >
      {accordionData.map((panel) => (
        <Accordion
          key={panel.id}
          expanded={expanded === panel.id}
          onChange={handleChange(panel.id)}
        >
          <AccordionSummary
          >
            <Typography fontWeight={600}>
              {t(panel.title)}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Box
              component="ul"
              sx={{
                paddingInlineStart: 2,
                margin: 0,
                listStylePosition: "outside",
              }}
            >
              {panel.items.map((itemKey) => (
                <Typography
                  component="li"
                  key={itemKey}
                  sx={{
                    mb: 1,
                    lineHeight: 1.6,
                  }}
                >
                  {t(itemKey)}
                </Typography>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

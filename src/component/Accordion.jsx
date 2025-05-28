import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

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
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [value, setValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        marginBottom: 10,
      }}
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Eligibility Requirements</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Renters must be at least 21 years old (some vehicles may require 25+).
            <br /><br />
            A valid driver's license and credit card in the renter's name are required.
            <br /><br />
            International renters must present a passport and (if applicable) an International Driving Permit (IDP).
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Booking & Payment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Reservations can be made online, by phone, or in person.
            <br /><br />
            A security deposit (hold on credit card) is required at pickup.
            <br /><br />
            Payment methods: Credit/debit cards (prepaid cards not accepted).
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Rental Period & Extensions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Minimum rental: 24 hours.
            <br /><br />
            Extensions must be requested before the original return time; late returns may incur fees.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Fuel Policy</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Full-to-full: The car is provided with a full tank and must be returned full, or refueling charges apply.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Mileage Limits</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Unlimited mileage for most rentals (check specific vehicle restrictions).
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>Prohibited Uses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No off-road driving, racing, or towing unless approved.
            <br /><br />
            No smoking in vehicles (cleaning fee applies if violated).
            <br /><br />
            No unauthorized drivers (only listed renters are insured).
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography>Insurance & Damage</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Basic insurance (CDW) is included but may have a deductible.
            <br /><br />
            Optional full coverage reduces liability.
            <br /><br />
            Renters are responsible for all tolls, parking fines, and traffic violations.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <Typography>Cancellation Policy</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Free cancellation up to 24 hours before pickup.
            <br /><br />
            No-shows or late cancellations may incur a fee.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
          <Typography>Vehicle Return</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Return the car on time to avoid late fees.
            <br /><br />
            A cleanliness fee may apply if the car is returned excessively dirty.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion
        expanded={expanded === "panel10"}
        onChange={handleChange("panel10")}
      >
        <AccordionSummary aria-controls="panel10d-content" id="panel10d-header">
          <Typography>Breakdowns & Accidents</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            In case of an accident, contact the rental company immediately.
            <br /><br />
            Roadside assistance is available 24/7 for mechanical issues.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
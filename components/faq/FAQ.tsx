"use client";

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { faqData } from "@/components/faq/faqData";

const FAQ: React.FC = () => {
  return (
    <Box component="section">
      {faqData.map((section, sectionIndex) => (
        <Accordion
          key={sectionIndex}
          sx={{ backgroundColor: "rgba(250, 254, 238, 0.67)" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{section.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {section.subItems &&
              section.subItems.map((item, itemIndex) => (
                <Accordion key={itemIndex}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ backgroundColor: "rgba(250, 254, 238, 0.67)" }}
                  >
                    <Typography>{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ backgroundColor: "rgba(250, 254, 238, 0.67)" }}
                  >
                    <Typography>{item.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;

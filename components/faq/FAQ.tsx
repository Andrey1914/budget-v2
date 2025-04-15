"use client";

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { faqData } from "@/components/faq/faqData";

const FAQ: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      {faqData.map((section, sectionIndex) => (
        <Accordion
          key={sectionIndex}
          sx={{
            background: theme.palette.background.default,
            boxShadow: "none",
            borderRadius: "none",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              background: theme.palette.background.default,
              boxShadow: "none",
              borderBottom: "1px solid #030303 ",
              borderRadius: "none",
            }}
          >
            <Typography variant="h6">{section.question}</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              background: theme.palette.background.default,
              boxShadow: "none",
              // border: "none",
              // border: "1px solid red",

              borderRadius: "none",
            }}
          >
            {section.subItems &&
              section.subItems.map((item, itemIndex) => (
                <Accordion
                  key={itemIndex}
                  sx={{
                    background: theme.palette.background.default,
                    boxShadow: "none",
                    // borderBottom: "1px solid #030303 ",
                    borderRadius: "0px",
                    // border: "1px solid red",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      background: theme.palette.background.default,
                      boxShadow: "none",
                      borderBottom: "1px solid #030303 ",
                      // border: "1px solid red",
                      borderRadius: "none",
                    }}
                  >
                    <Typography>{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                  // sx={{
                  //   background: theme.palette.background.default,
                  //   boxShadow: "none",
                  //   borderBottom: "1px solid #030303 ",
                  //   borderRadius: "none",
                  // }}
                  >
                    <Typography>{item.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default FAQ;

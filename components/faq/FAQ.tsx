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
        <Accordion key={sectionIndex}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{section.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {section.subItems &&
              section.subItems.map((item, itemIndex) => (
                <Accordion key={itemIndex}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
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

// import React from 'react';
// import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { FAQItem, faqData } from './faqData'; // Импортируем данные

// // Функция для рендеринга вложенных аккордеонов
// const renderSubAccordion = (subItems: FAQItem[]) => {
//   return subItems.map((subItem, index) => (
//     <Accordion key={index}>
//       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//         <Typography>{subItem.question}</Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         <Typography>{subItem.answer}</Typography>
//       </AccordionDetails>
//     </Accordion>
//   ));
// };

// const FAQ: React.FC = () => {
//   return (
//     <div>
//       {faqData.map((item, index) => (
//         <Accordion key={index}>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography>{item.question}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography>{item.answer}</Typography>
//             {item.subItems && <div>{renderSubAccordion(item.subItems)}</div>}
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </div>
//   );
// };

// export default FAQ;

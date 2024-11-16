import React, { useState } from "react";
import { Container, Typography, Box, Grid2 } from "@mui/material";
import { AdvantagesText } from "@/components/Advantages/Advantages.styled";
import { textData } from "@/components/Advantages/AdvantagesData";

const Advantages: React.FC = () => {
  const [expandedStates, setExpandedStates] = useState<boolean[]>(
    Array(textData.length).fill(false)
  );

  const toggleText = (index: number) => {
    setExpandedStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <Box sx={{ backgroundColor: "#fefae0", padding: "60px 0" }}>
      <Container>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ marginBottom: 4, fontWeight: 600 }}
        >
          Контроль своих финансов с новым уровнем удобства
        </Typography>

        <Typography
          variant="h5"
          component="p"
          align="center"
          sx={{ marginBottom: 4, fontWeight: 400 }}
        >
          Наше приложение для контроля финансов и транзакций — это удобный
          инструмент для тех, кто стремится держать свои расходы и доходы под
          контролем. Мы продумали каждую деталь, чтобы процесс планирования,
          анализа и управления деньгами был максимально простым и эффективным.
        </Typography>

        <Grid2 container spacing={4} direction="column" sx={{ padding: 4 }}>
          {textData.map((item, index) => (
            <Grid2
              key={index}
              sx={{
                width: "100%",
                paddingLeft: { xs: 0, sm: index % 2 === 0 ? 2 : 6 },
                paddingRight: { xs: 0, sm: index % 2 === 0 ? 6 : 2 },
              }}
              component="div"
            >
              <Box>
                <Typography
                  variant="h5"
                  component="p"
                  sx={{ marginBottom: 2, fontWeight: 600 }}
                >
                  {item.title}
                </Typography>
                <AdvantagesText
                  variant="h6"
                  color="text.secondary"
                  isExpanded={expandedStates[index]}
                  onClick={() => toggleText(index)}
                >
                  {item.text}
                </AdvantagesText>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default Advantages;

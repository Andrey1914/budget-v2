import React, { useEffect, useState } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { US, EU } from "country-flag-icons/react/3x2";
import { useTheme } from "@mui/material/styles";
import { DashboardCard, PlusIconButton } from "@/components/UI";

interface NbuRate {
  r030: number;
  txt: string;
  rate: number;
  cc: string; // 'USD', 'EUR'
  exchangedate: string;
}

interface CurrencyRates {
  USD?: { buy: string; sell: string };
  EUR?: { buy: string; sell: string };
}

interface CurrencyWidgetProps {
  currentDateStr: string;
  onOpenConverter: () => void;
}

export const CurrencyWidget: React.FC<CurrencyWidgetProps> = ({
  currentDateStr,
  onOpenConverter,
}) => {
  const [rates, setRates] = useState<CurrencyRates>({});
  const [loading, setLoading] = useState<boolean>(true);

  const theme = useTheme();
  const сolor = theme.palette.primary.main;

  const formattedDate = currentDateStr.replace(/\//g, ".");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
        );
        const data: NbuRate[] = await res.json();

        const usd = data.find((item) => item.cc === "USD");
        const eur = data.find((item) => item.cc === "EUR");

        const formatRates = (officialRate?: number) => {
          if (!officialRate) return null;
          const buy = (officialRate * 0.992).toFixed(2);
          const sell = (officialRate * 1.008).toFixed(2);
          return { buy, sell };
        };

        setRates({
          USD: usd ? formatRates(usd.rate) || undefined : undefined,
          EUR: eur ? formatRates(eur.rate) || undefined : undefined,
        });
      } catch (error) {
        console.error("Ошибка загрузки курсов валют НБУ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return (
    <DashboardCard elevation={0}>
      <Typography variant="h4" fontWeight={400} mb={1.5}>
        {formattedDate}
      </Typography>

      <Box display="flex" gap={1.5} mb={2} flexWrap="wrap" alignItems="center">
        {loading ? (
          <>
            <Skeleton variant="rounded" width={140} height={32} />
            <Skeleton variant="rounded" width={140} height={32} />
          </>
        ) : (
          <Box display="flex" justifyContent="space-around" width="100%">
            {/* USD */}
            <Box>
              {rates.USD && (
                <Box display="flex" alignItems="center" gap={3} px={6} py={0.5}>
                  <US title="United States" style={{ width: 50 }} />
                  <Typography variant="body1" fontWeight={400}>
                    {rates.USD.buy} / {rates.USD.sell}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* EUR */}
            <Box>
              {rates.EUR && (
                <Box display="flex" alignItems="center" gap={3} px={6} py={0.5}>
                  <EU title="European Union" style={{ width: 50 }} />
                  <Typography variant="body1" fontWeight={400}>
                    {rates.EUR.buy} / {rates.EUR.sell}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>

      <Box
        onClick={onOpenConverter}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 1,
          px: 1.5,
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        <Typography variant="body1" fontWeight={400} color={сolor}>
          Currency converter
        </Typography>
      </Box>
    </DashboardCard>
  );
};

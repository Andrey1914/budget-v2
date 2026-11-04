import { useEffect, useState } from "react";
import axios from "axios";

export type ExchangeRateProvider = "ECB" | "NBU" | "BOC";

interface UseExchangeRatesResult {
  rates: Record<string, number>;
  base: string;
  provider: ExchangeRateProvider;
  error: string | null;
  loading: boolean;
  updatedAt: Date | null;
}

interface NbuCurrencyRate {
  cc: string;
  rate: number;
  exchangedate: string;
}

interface EcbApiResponse {
  rates: Record<string, number>;
  base: "EUR";
  updatedAt: string | null;
}

interface BocObservation {
  d: string;
  [seriesCode: string]: string | { v: string } | undefined;
}

interface BocApiResponse {
  observations: BocObservation[];
}

const NBU_API_URL =
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

const BOC_API_URL =
  "https://www.bankofcanada.ca/valet/observations/group/FX_RATES_DAILY/json?recent=1";

const parseNbuDate = (date: string): Date | null => {
  const parts = date.split(".");

  if (parts.length !== 3) {
    return null;
  }

  const [day, month, year] = parts.map(Number);

  if (!day || !month || !year) {
    return null;
  }

  return new Date(year, month - 1, day);
};

const parseBocDate = (date: string): Date | null => {
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

export const useExchangeRates = (
  provider: ExchangeRateProvider = "ECB",
  enabled = true,
): UseExchangeRatesResult => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [base, setBase] = useState("EUR");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const controller = new AbortController();

    const fetchRates = async () => {
      setLoading(true);
      setError(null);

      try {
        if (provider === "ECB") {
          const response = await axios.get<EcbApiResponse>(
            "/api/exchange-rates/ecb",
            {
              signal: controller.signal,
            },
          );

          setRates(response.data.rates);
          setBase(response.data.base);
          setUpdatedAt(
            response.data.updatedAt
              ? new Date(`${response.data.updatedAt}T00:00:00`)
              : null,
          );
        } else if (provider === "NBU") {
          const response = await axios.get<NbuCurrencyRate[]>(NBU_API_URL, {
            signal: controller.signal,
          });

          const nbuRates: Record<string, number> = {
            UAH: 1,
          };

          response.data.forEach((currency) => {
            if (
              currency.cc &&
              Number.isFinite(currency.rate) &&
              currency.rate > 0
            ) {
              nbuRates[currency.cc] = 1 / currency.rate;
            }
          });

          setRates(nbuRates);
          setBase("UAH");

          const latestDate = response.data[0]?.exchangedate;

          setUpdatedAt(latestDate ? parseNbuDate(latestDate) : null);
        } else {
          const response = await axios.get<BocApiResponse>(BOC_API_URL, {
            signal: controller.signal,
          });

          const observation = response.data.observations.reduce<
            BocObservation | undefined
          >((latest, current) => {
            if (!latest || current.d > latest.d) {
              return current;
            }

            return latest;
          }, undefined);

          const bocRates: Record<string, number> = {
            CAD: 1,
          };

          if (observation) {
            Object.entries(observation).forEach(([seriesCode, value]) => {
              if (
                !seriesCode.startsWith("FX") ||
                !seriesCode.endsWith("CAD") ||
                typeof value !== "object" ||
                value === null ||
                !("v" in value)
              ) {
                return;
              }

              const currencyCode = seriesCode.slice(2, -3);
              const rate = Number(value.v);

              if (
                currencyCode &&
                currencyCode !== "CAD" &&
                Number.isFinite(rate) &&
                rate > 0
              ) {
                bocRates[currencyCode] = 1 / rate;
              }
            });
          }

          setRates(bocRates);
          setBase("CAD");
          setUpdatedAt(observation ? parseBocDate(observation.d) : null);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }

        console.error("Error fetching exchange rates:", err);

        setError("Не удалось загрузить курсы валют.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchRates();

    return () => {
      controller.abort();
    };
  }, [provider, enabled]);

  return {
    rates,
    base,
    provider,
    error,
    loading,
    updatedAt,
  };
};

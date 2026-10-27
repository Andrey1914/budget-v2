import { useState, useEffect } from "react";
import axios from "axios";

export interface CurrencyItem {
  code: string;
  name: string;
}

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<CurrencyItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const appId = process.env.NEXT_PUBLIC_APP_ID;
      if (!apiUrl || !appId) return;

      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}?app_id=${appId}`);
        const list = Object.keys(response.data).map((key) => ({
          code: key,
          name: response.data[key],
        }));
        setCurrencies(list);
      } catch (err) {
        console.error("Error fetching currencies:", err);
        setError("Failed to load currencies.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies, error, loading };
};

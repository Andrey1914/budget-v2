import { useState, useEffect } from "react";
import axios from "axios";

export interface CurrencyItem {
  code: string;
  name: string;
}

interface UseCurrenciesResult {
  currencies: CurrencyItem[];
  error: string | null;
  loading: boolean;
}

export const useCurrencies = (): UseCurrenciesResult => {
  const [currencies, setCurrencies] = useState<CurrencyItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const appId = process.env.NEXT_PUBLIC_APP_ID;

    if (!apiUrl || !appId) {
      setError("Не заданы API_URL или APP_ID.");
      return;
    }

    const controller = new AbortController();

    const fetchCurrencies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<Record<string, string>>(apiUrl, {
          params: { app_id: appId },
          signal: controller.signal,
        });

        const list = Object.entries(response.data).map(([code, name]) => ({
          code,
          name,
        }));

        setCurrencies(list);
      } catch (err) {
        if (axios.isCancel(err)) return;

        console.error("Error fetching currencies:", err);
        setError("Не удалось загрузить список валют.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCurrencies();

    return () => controller.abort();
  }, []);

  return { currencies, error, loading };
};

// import { useState, useEffect } from "react";
// import axios from "axios";

// export interface CurrencyItem {
//   code: string;
//   name: string;
// }

// export const useCurrencies = () => {
//   const [currencies, setCurrencies] = useState<CurrencyItem[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//       const appId = process.env.NEXT_PUBLIC_APP_ID;
//       if (!apiUrl || !appId) return;

//       setLoading(true);
//       try {
//         const response = await axios.get(`${apiUrl}?app_id=${appId}`);
//         const list = Object.keys(response.data).map((key) => ({
//           code: key,
//           name: response.data[key],
//         }));
//         setCurrencies(list);
//       } catch (err) {
//         console.error("Error fetching currencies:", err);
//         setError("Failed to load currencies.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCurrencies();
//   }, []);

//   return { currencies, error, loading };
// };

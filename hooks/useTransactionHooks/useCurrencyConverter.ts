import { useCallback, useEffect, useMemo, useState } from "react";

import {
  useCurrencies,
  useExchangeRates,
  type ExchangeRateProvider,
} from "@/hooks/useTransactionHooks";

import { convertCurrencyAmount } from "@/components/Widgets/Currency/utils";

type AmountSide = "from" | "to";

export const useCurrencyConverter = (open: boolean) => {
  const {
    currencies,
    error: currenciesError,
    loading: currenciesLoading,
  } = useCurrencies();

  const [provider, setProvider] = useState<ExchangeRateProvider>("ECB");

  const {
    rates,
    base,
    error: ratesError,
    loading: ratesLoading,
    updatedAt,
  } = useExchangeRates(provider, open);

  const [amountFrom, setAmountFrom] = useState("100");
  const [amountTo, setAmountTo] = useState("");

  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("UAH");

  const [amountSide, setAmountSide] = useState<AmountSide>("from");

  const [pendingProvider, setPendingProvider] =
    useState<ExchangeRateProvider | null>(null);

  const [ratesBeforeSwitch, setRatesBeforeSwitch] = useState<Record<
    string,
    number
  > | null>(null);

  const currenciesByCode = useMemo(() => {
    return new Map(currencies.map((currency) => [currency.code, currency]));
  }, [currencies]);

  const supportedCurrencies = useMemo(() => {
    return Object.keys(rates).filter((currencyCode) => {
      const rate = rates[currencyCode];

      return Number.isFinite(rate) && rate > 0;
    });
  }, [rates]);

  const isLoading = currenciesLoading || ratesLoading;

  const error = currenciesError || ratesError;

  const convertAmount = useCallback(
    (amountValue: string, fromCurrency: string, toCurrency: string): string => {
      return convertCurrencyAmount(
        amountValue,
        fromCurrency,
        toCurrency,
        rates,
      );
    },
    [rates],
  );

  useEffect(() => {
    if (
      !pendingProvider ||
      ratesLoading ||
      !rates ||
      Object.keys(rates).length === 0 ||
      rates === ratesBeforeSwitch
    ) {
      return;
    }

    const defaultCurrency =
      pendingProvider === "NBU"
        ? "UAH"
        : pendingProvider === "BOC"
          ? "CAD"
          : "EUR";

    const defaultTargetCurrency = "USD";

    if (supportedCurrencies.includes(defaultCurrency)) {
      setCurrencyFrom(defaultCurrency);
    } else if (supportedCurrencies.includes(base)) {
      setCurrencyFrom(base);
    }

    if (supportedCurrencies.includes(defaultTargetCurrency)) {
      setCurrencyTo(defaultTargetCurrency);
    } else if (supportedCurrencies.includes(base)) {
      setCurrencyTo(base);
    }

    setPendingProvider(null);
    setRatesBeforeSwitch(null);
  }, [
    pendingProvider,
    ratesLoading,
    rates,
    ratesBeforeSwitch,
    supportedCurrencies,
    base,
  ]);

  useEffect(() => {
    if (pendingProvider || ratesLoading || supportedCurrencies.length === 0) {
      return;
    }

    const fallbackCurrency = supportedCurrencies.includes(base)
      ? base
      : supportedCurrencies[0];

    if (!supportedCurrencies.includes(currencyFrom)) {
      setCurrencyFrom(fallbackCurrency);
    }

    if (!supportedCurrencies.includes(currencyTo)) {
      setCurrencyTo(fallbackCurrency);
    }
  }, [
    pendingProvider,
    ratesLoading,
    supportedCurrencies,
    base,
    currencyFrom,
    currencyTo,
  ]);

  useEffect(() => {
    if (amountSide === "from") {
      const converted = convertAmount(amountFrom, currencyFrom, currencyTo);

      setAmountTo((currentAmount) =>
        currentAmount === converted ? currentAmount : converted,
      );

      return;
    }

    const converted = convertAmount(amountTo, currencyTo, currencyFrom);

    setAmountFrom((currentAmount) =>
      currentAmount === converted ? currentAmount : converted,
    );
  }, [
    amountSide,
    amountFrom,
    amountTo,
    currencyFrom,
    currencyTo,
    rates,
    convertAmount,
  ]);

  const handleAmountFromChange = (value: string) => {
    setAmountSide("from");
    setAmountFrom(value);
  };

  const handleAmountToChange = (value: string) => {
    setAmountSide("to");
    setAmountTo(value);
  };

  const handleSwapCurrencies = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);

    setAmountFrom(amountTo);
    setAmountTo(amountFrom);

    setAmountSide((currentSide) => (currentSide === "from" ? "to" : "from"));
  };

  const handleProviderChange = (value: ExchangeRateProvider | null) => {
    if (!value || value === provider) {
      return;
    }

    setRatesBeforeSwitch(rates);
    setPendingProvider(value);
    setProvider(value);
  };

  return {
    currencies,
    currenciesByCode,
    supportedCurrencies,

    provider,
    amountFrom,
    amountTo,
    currencyFrom,
    currencyTo,

    isLoading,
    error,
    updatedAt,

    setCurrencyFrom,
    setCurrencyTo,

    handleAmountFromChange,
    handleAmountToChange,
    handleSwapCurrencies,
    handleProviderChange,
  };
};

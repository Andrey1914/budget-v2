import type { ExchangeRateProvider } from "@/hooks/useTransactionHooks";

export interface Currency {
  code: string;
  name: string;
}

export interface RequestStateProps {
  loading: boolean;
  error: string | null;
}

export interface CurrencyOptionsProps {
  currencies: Currency[];
  supportedCurrencies: string[];
}

export interface CurrencyAmountFieldProps
  extends RequestStateProps, CurrencyOptionsProps {
  amount: string;
  currency: string;
  onAmountChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
}

export interface CurrencySelectProps
  extends RequestStateProps, CurrencyOptionsProps {
  value: string;
  onChange: (value: string) => void;
}

export interface CurrencyConverterFooterProps extends RequestStateProps {
  updatedAt: Date | null;
  onClose: () => void;
}

export interface CurrencyLabelProps {
  currencyCode: string;
}

export interface CurrencyProviderSelectorProps {
  provider: ExchangeRateProvider;
  onChange: (value: ExchangeRateProvider | null) => void;
}

export interface CurrencyConverterProps {
  open: boolean;
  onClose: () => void;
}

export interface NbuRate {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
}

export interface CurrencyRates {
  USD?: { buy: string; sell: string };
  EUR?: { buy: string; sell: string };
}

export interface CurrencyWidgetProps {
  currentDateStr: string;
  onOpenConverter: () => void;
}

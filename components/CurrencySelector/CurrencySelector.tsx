"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  const [currencies, setCurrencies] = useState<
    { code: string; name: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const appId = process.env.NEXT_PUBLIC_APP_ID;
      try {
        const response = await axios.get(`${apiUrl}?app_id=${appId}`);

        const currenciesList = Object.keys(response.data).map((key) => ({
          code: key,
          name: response.data[key],
        }));

        setCurrencies(currenciesList);
      } catch (error) {
        console.error("Error fetching currencies:", error);
        setError("Failed to load currencies.");
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="currency-selector-label">Currency</InputLabel>
      <Select
        labelId="currency-selector-label"
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        {Array.isArray(currencies) && currencies.length > 0 ? (
          currencies.map((currency, index) => (
            <MenuItem key={index} value={currency.code}>
              {currency.code} - {currency.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>{error || "No currencies available"}</MenuItem>
        )}
      </Select>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert("Currency saved!")}
        >
          Save Currency
        </Button>
      </Box>
    </FormControl>
  );
};

export default CurrencySelector;

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import axios from "axios";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Oval } from "react-loader-spinner";
import SelectCategory from "@/components/Category/Select";
import CustomPopover from "@/components/Popover/Popover";
import { Session, TransactionFormProps } from "@/interfaces";

const TransactionForm: React.FC<TransactionFormProps> = ({
  amount,
  setAmount,
  category,
  setCategory,
  description,
  setDescription,
  date,
  setDate,
  currency,
  setCurrency,
  loading,
  onSubmit,
  categories,
  newCategory,
  newCategoryDescription,
  setNewCategory,
  setNewCategoryDescription,
  handleAddCategory,
  handleEditCategory,
  handleOpenEditDialog,
  handleDeleteCategory,
  openAddDialog,
  setOpenAddDialog,
  openEditDialog,
  setOpenEditDialog,
  editingCategory,
  handleCloseEditDialog,

  open,
  anchorEl,
  message,
  onClose,
}) => {
  const { data: session } = useSession() as { data: Session | null };

  const [currencies, setCurrencies] = useState<
    { code: string; name: string }[]
  >([]);

  const [error, setError] = useState<string | null>(null);

  const userCurrency = session?.user?.currency;

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
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 2, width: "25ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <div>
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          autoFocus={true}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <SelectCategory
          categories={categories}
          category={category}
          setCategory={setCategory}
          newCategory={newCategory}
          newCategoryDescription={newCategoryDescription}
          setNewCategory={setNewCategory}
          setNewCategoryDescription={setNewCategoryDescription}
          handleAddCategory={handleAddCategory}
          handleEditCategory={handleEditCategory}
          handleOpenEditDialog={handleOpenEditDialog}
          handleDeleteCategory={handleDeleteCategory}
          openAddDialog={openAddDialog}
          setOpenAddDialog={setOpenAddDialog}
          openEditDialog={openEditDialog}
          setOpenEditDialog={setOpenEditDialog}
          editingCategory={editingCategory}
          handleCloseEditDialog={handleCloseEditDialog}
        />
      </div>

      <div>
        <TextField
          id="description"
          multiline
          rows={4}
          color="primary"
          label="Description"
          variant="outlined"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <FormControl fullWidth>
          <InputLabel id="currency-label">Currency</InputLabel>
          <Select
            labelId="currency-label"
            id="currency"
            value={userCurrency || currency || "PLN"}
            label="Currency"
            onChange={(e) => setCurrency(e.target.value)}
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
        </FormControl>
      </div>

      <div>
        <TextField
          id="date"
          variant="outlined"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <Button
        id="submit-button"
        variant="outlined"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <Oval
            height="30"
            width="30"
            color="#1727b7"
            secondaryColor="#6fb5e7"
          />
        ) : (
          "Add Transaction"
        )}
      </Button>

      <CustomPopover
        open={open}
        anchorEl={anchorEl}
        message={message}
        onClose={onClose}
      />
    </Box>
  );
};

export default TransactionForm;

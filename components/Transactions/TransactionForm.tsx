"use client";

import React from "react";
import { Box, MenuItem, FormControl } from "@mui/material";
import { Oval } from "react-loader-spinner";
import SelectCategory from "@/components/Category/Select";
import CustomPopover from "@/components/Popover/Popover";
import SnackbarNotification from "@/components/Notification/Snackbar";
import { TransactionFormProps } from "@/interfaces";
import {
  useCurrencies,
  useCategoryManager,
  useTransactionForm,
} from "@/hooks/useTransactionHooks";
import {
  FormContainer,
  ThreeColumnsRow,
  FormTextField,
  FormSelectField,
  ButtonContainer,
  ConfirmSubmitButton,
} from "./styles";

const TransactionForm: React.FC<TransactionFormProps> = (props) => {
  const { type } = props;

  const {
    values,
    setAmount,
    setDescription,
    setCategory,
    setDate,
    setCurrency,
    loading,
    handleSubmit,
    popover,
    snackbar,
    showNotification,
  } = useTransactionForm(props);

  const {
    currencies,
    error: currencyError,
    loading: currenciesLoading,
  } = useCurrencies();

  const categoryManager = useCategoryManager({
    type,
    onNotification: showNotification,
  });

  return (
    <>
      <FormContainer noValidate autoComplete="off" onSubmit={handleSubmit}>
        <SelectCategory
          categories={categoryManager.categories}
          category={values.category}
          setCategory={setCategory}
          newCategory={categoryManager.newCategory}
          newCategoryDescription={categoryManager.newCategoryDescription}
          setNewCategory={categoryManager.setNewCategory}
          setNewCategoryDescription={categoryManager.setNewCategoryDescription}
          handleAddCategory={categoryManager.handleAddCategory}
          handleEditCategory={categoryManager.handleEditCategory}
          handleOpenEditDialog={categoryManager.handleOpenEditDialog}
          handleDeleteCategory={() =>
            categoryManager.handleDeleteCategory(values.category, () =>
              setCategory(""),
            )
          }
          openAddDialog={categoryManager.openAddDialog}
          setOpenAddDialog={categoryManager.setOpenAddDialog}
          openEditDialog={categoryManager.openEditDialog}
          setOpenEditDialog={categoryManager.setOpenEditDialog}
          editingCategory={categoryManager.editingCategory}
          handleCloseEditDialog={categoryManager.handleCloseEditDialog}
        />

        <ThreeColumnsRow>
          <Box sx={{ flex: 1 }}>
            <FormTextField
              id="date"
              variant="outlined"
              type="date"
              value={values.date}
              onChange={(e) => setDate(e.target.value)}
              required
              fullWidth
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <FormTextField
              id="amount"
              placeholder="Сума"
              variant="outlined"
              type="number"
              value={values.amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              fullWidth
              autoFocus
            />
          </Box>

          <Box sx={{ flex: { xs: 1, sm: 1.4 } }}>
            <FormControl fullWidth variant="outlined">
              <FormSelectField
                id="currency"
                value={values.currency}
                onChange={(e) => setCurrency(e.target.value as string)}
                displayEmpty
                required
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#757575" }}>Валюта</span>;
                  }
                  const curr = currencies.find((c) => c.code === selected);
                  return curr
                    ? `${curr.code} - ${curr.name}`
                    : (selected as string);
                }}
              >
                <MenuItem value="" disabled>
                  Валюта
                </MenuItem>

                {Boolean(values.currency) &&
                  !currencies.some((curr) => curr.code === values.currency) && (
                    <MenuItem
                      key={values.currency}
                      value={values.currency}
                      sx={{ display: "none" }}
                    >
                      {values.currency}
                    </MenuItem>
                  )}
                {Array.isArray(currencies) && currencies.length > 0 ? (
                  currencies.map((curr) => (
                    <MenuItem key={curr.code} value={curr.code}>
                      {curr.code} - {curr.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>
                    {currenciesLoading
                      ? "Завантаження валют..."
                      : currencyError || "No currencies available"}
                  </MenuItem>
                )}
              </FormSelectField>
            </FormControl>
          </Box>
        </ThreeColumnsRow>

        <FormTextField
          id="description"
          placeholder="Description"
          variant="outlined"
          type="text"
          value={values.description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />

        <ButtonContainer>
          <ConfirmSubmitButton
            id="submit-button"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Oval
                height="24"
                width="24"
                color="#ffffff"
                secondaryColor="#6fb5e7"
              />
            ) : (
              "CONFIRM"
            )}
          </ConfirmSubmitButton>
        </ButtonContainer>

        <CustomPopover
          open={popover.open}
          anchorEl={popover.anchorEl}
          message={popover.message}
          onClose={popover.onClose}
        />
      </FormContainer>

      {snackbar.open && (
        <SnackbarNotification
          message={snackbar.message}
          severity={snackbar.severity}
        />
      )}
    </>
  );
};

export default TransactionForm;

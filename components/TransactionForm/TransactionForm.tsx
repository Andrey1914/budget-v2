import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { Oval } from "react-loader-spinner";
import SelectCategory from "@/components/Category/Select";
import CustomPopover from "@/components/Popover/Popover";
import { Category } from "@/interfaces";

interface TransactionFormProps {
  amount: number | string;
  setAmount: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  categories: Category[];
  newCategory: string;
  newCategoryDescription: string;
  setNewCategory: (value: string) => void;
  setNewCategoryDescription: (value: string) => void;
  handleAddCategory: () => Promise<void>;
  handleEditCategory: () => Promise<void>;
  handleOpenEditDialog: (category: Category) => void;
  handleDeleteCategory: () => Promise<void>;
  openAddDialog: boolean;
  setOpenAddDialog: (open: boolean) => void;
  openEditDialog: boolean;
  setOpenEditDialog: (open: boolean) => void;
  editingCategory: Category | null;
  handleCloseEditDialog: () => void;

  open: boolean;
  anchorEl: HTMLElement | null;
  message: string;
  onClose: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  amount,
  setAmount,
  category,
  setCategory,
  description,
  setDescription,
  date,
  setDate,
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
}) => (
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
        <Oval height="30" width="30" color="#1727b7" secondaryColor="#6fb5e7" />
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

export default TransactionForm;

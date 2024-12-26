import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

import { AddCategoryDialogProps } from "@/interfaces";

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({
  open,
  onClose,
  newCategory,
  newCategoryDescription,
  setNewCategory,
  setNewCategoryDescription,
  handleAddCategory,
}) => {
  return (
    <Dialog open={open} onClose={onClose} disableEnforceFocus>
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <TextField
          id="new-category"
          label="Category Name"
          variant="outlined"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
        <TextField
          id="new-category-description"
          label="Category Description"
          variant="outlined"
          value={newCategoryDescription}
          onChange={(e) => setNewCategoryDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={handleAddCategory}>
          Add Category
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryDialog;

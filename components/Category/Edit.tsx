import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { Category } from "@/interfaces";

interface EditCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  editingCategory: Category | null;
  newCategory: string;
  newCategoryDescription: string;
  setNewCategory: (value: string) => void;
  setNewCategoryDescription: (value: string) => void;
  handleEditCategory: () => Promise<void>;
}

const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({
  open,
  onClose,
  editingCategory,
  newCategory,
  newCategoryDescription,
  setNewCategory,
  setNewCategoryDescription,
  handleEditCategory,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <TextField
          id="edit-category"
          label="Category Name"
          variant="outlined"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
        <TextField
          id="edit-category-description"
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
        <Button variant="outlined" onClick={handleEditCategory}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategoryDialog;

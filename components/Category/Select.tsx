import React from "react";
import { Select, MenuItem, Button, FormControl } from "@mui/material";
import { Category } from "@/interfaces";
import AddCategoryDialog from "@/components/Category/Add";
import EditCategoryDialog from "@/components/Category/Edit";

interface CategorySelectProps {
  categories: Category[];
  category: string;
  setCategory: (value: string) => void;
  newCategory: string;
  newCategoryDescription: string;
  setNewCategory: (value: string) => void;
  setNewCategoryDescription: (value: string) => void;
  handleAddCategory: () => Promise<void>;
  handleEditCategory: () => Promise<void>;
  handleOpenEditDialog: (category: Category) => void;
  handleDeleteCategory: () => Promise<void>;
  openAddDialog: boolean;
  setOpenAddDialog: (value: boolean) => void;
  openEditDialog: boolean;
  setOpenEditDialog: (value: boolean) => void;
  editingCategory: Category | null;
  handleCloseEditDialog: () => void;
}

const SelectCategory: React.FC<CategorySelectProps> = ({
  categories,
  category,
  setCategory,
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
}) => (
  <div>
    <FormControl fullWidth variant="outlined">
      <Select
        id="category"
        labelId="category-label"
        value={category}
        onChange={(e) => setCategory(e.target.value as string)}
        required
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select Category
        </MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat._id} value={cat._id}>
            {cat.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Button variant="outlined" onClick={() => setOpenAddDialog(true)}>
      Add New Category
    </Button>
    <div>
      {category && (
        <div style={{ marginTop: 16 }}>
          <Button
            variant="outlined"
            onClick={() =>
              handleOpenEditDialog(
                categories.find((cat) => cat._id === category)!
              )
            }
          >
            Edit Category
          </Button>
          <Button variant="outlined" onClick={handleDeleteCategory}>
            Delete Category
          </Button>
        </div>
      )}
    </div>

    <AddCategoryDialog
      open={openAddDialog}
      onClose={() => setOpenAddDialog(false)}
      newCategory={newCategory}
      newCategoryDescription={newCategoryDescription}
      setNewCategory={setNewCategory}
      setNewCategoryDescription={setNewCategoryDescription}
      handleAddCategory={handleAddCategory}
    />

    <EditCategoryDialog
      open={openEditDialog}
      onClose={handleCloseEditDialog}
      editingCategory={editingCategory}
      newCategory={newCategory}
      newCategoryDescription={newCategoryDescription}
      setNewCategory={setNewCategory}
      setNewCategoryDescription={setNewCategoryDescription}
      handleEditCategory={handleEditCategory}
    />
  </div>
);

export default SelectCategory;

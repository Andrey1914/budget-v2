"use client";

import React from "react";
import { FormControl, MenuItem, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import { ActionButtons } from "@/components/UI/Buttons/ActionButtons";
import { CategorySelectProps } from "@/interfaces";
import AddCategoryDialog from "@/components/Category/Add";
import EditCategoryDialog from "@/components/Category/Edit";
import {
  CategoryRow,
  CategorySelectInput,
  CategoryActionsWrapper,
  AddCategoryButton,
  ActionButtonsWrapper,
} from "./styles";

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
}) => {
  const theme = useTheme();

  return (
    <>
      <CategoryRow>
        {/* Поле выбора категории */}
        <FormControl fullWidth variant="outlined">
          <CategorySelectInput
            id="category"
            labelId="category-label"
            value={category}
            onChange={(e) => setCategory(e.target.value as string)}
            required
            displayEmpty
            sx={{
              "& .MuiSelect-select": {
                color: category
                  ? theme.palette.text.primary
                  : theme.palette.text.secondary,
              },
            }}
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </CategorySelectInput>
        </FormControl>

        {/* Плюсик и импортированный ActionButtons */}
        <CategoryActionsWrapper>
          <AddCategoryButton
            onClick={() => setOpenAddDialog(true)}
            aria-label="Add category"
            size="small"
          >
            <Add sx={{ fontSize: "24px" }} />
          </AddCategoryButton>

          <ActionButtonsWrapper active={Boolean(category)}>
            <ActionButtons
              onEdit={() => {
                const selected = categories.find((cat) => cat._id === category);
                if (selected) handleOpenEditDialog(selected);
              }}
              onDelete={handleDeleteCategory}
            />
          </ActionButtonsWrapper>
        </CategoryActionsWrapper>
      </CategoryRow>

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
    </>
  );
};

export default SelectCategory;

// import React from "react";
// import { Select, MenuItem, Button, FormControl } from "@mui/material";
// import { CategorySelectProps } from "@/interfaces";
// import AddCategoryDialog from "@/components/Category/Add";
// import EditCategoryDialog from "@/components/Category/Edit";

// const SelectCategory: React.FC<CategorySelectProps> = ({
//   categories,
//   category,
//   setCategory,
//   newCategory,
//   newCategoryDescription,
//   setNewCategory,
//   setNewCategoryDescription,
//   handleAddCategory,
//   handleEditCategory,
//   handleOpenEditDialog,
//   handleDeleteCategory,
//   openAddDialog,
//   setOpenAddDialog,
//   openEditDialog,
//   setOpenEditDialog,
//   editingCategory,
//   handleCloseEditDialog,
// }) => (
//   <div>
//     <FormControl fullWidth variant="outlined">
//       <Select
//         id="category"
//         labelId="category-label"
//         value={category}
//         onChange={(e) => setCategory(e.target.value as string)}
//         required
//         displayEmpty
//       >
//         <MenuItem value="" disabled>
//           Select Category
//         </MenuItem>
//         {categories.map((cat) => (
//           <MenuItem key={cat._id} value={cat._id}>
//             {cat.name}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//     <Button variant="outlined" onClick={() => setOpenAddDialog(true)}>
//       Add New Category
//     </Button>
//     <div>
//       {category && (
//         <div style={{ marginTop: 16 }}>
//           <Button
//             variant="outlined"
//             onClick={() =>
//               handleOpenEditDialog(
//                 categories.find((cat) => cat._id === category)!
//               )
//             }
//           >
//             Edit Category
//           </Button>
//           <Button variant="outlined" onClick={handleDeleteCategory}>
//             Delete Category
//           </Button>
//         </div>
//       )}
//     </div>

//     <AddCategoryDialog
//       open={openAddDialog}
//       onClose={() => setOpenAddDialog(false)}
//       newCategory={newCategory}
//       newCategoryDescription={newCategoryDescription}
//       setNewCategory={setNewCategory}
//       setNewCategoryDescription={setNewCategoryDescription}
//       handleAddCategory={handleAddCategory}
//     />

//     <EditCategoryDialog
//       open={openEditDialog}
//       onClose={handleCloseEditDialog}
//       editingCategory={editingCategory}
//       newCategory={newCategory}
//       newCategoryDescription={newCategoryDescription}
//       setNewCategory={setNewCategory}
//       setNewCategoryDescription={setNewCategoryDescription}
//       handleEditCategory={handleEditCategory}
//     />
//   </div>
// );

// export default SelectCategory;

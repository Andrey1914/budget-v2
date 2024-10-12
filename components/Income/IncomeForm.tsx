"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { IncomeFormProps, Category } from "@/interfaces";
import SnackbarNotification from "@/components/Notification/Snackbar";
import { AddCategory } from "@/app/dashboard/catecories";

import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const IncomeForm: React.FC<IncomeFormProps> = ({ onSubmit, initialData }) => {
  const { data: session } = useSession();

  const [amount, setAmount] = useState(initialData?.amount || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState(initialData?.date || "");
  const [error, setError] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  const [newCategory, setNewCategory] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [open, setOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  // Загрузка категорий из базы данных
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/income/categories");
      const data = await res.json();
      setCategories(data || []);
      console.log("Categories data:", data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!session) {
        setError("You must be logged in to add income.");
        return;
      }

      const res = await fetch("/api/income/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, description, category, date }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add income");
      }

      setSnackbarMessage("Income added successfully");
      setSnackbarSeverity("success");
      setShowSnackbar(true);

      setAmount("");
      setDescription("");
      setCategory("");
      setDate("");
      setError("");
    } catch (error: any) {
      setError(error.message || "Failed to add income");

      setSnackbarMessage("Failed to add income");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    }
  };

  const AddCategory = async () => {
    try {
      const res = await fetch("/api/income/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCategory,
          description: newCategoryDescription,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add category");
      }

      const newCategoryData = await res.json();
      console.log(newCategoryData);

      if (Array.isArray(categories)) {
        setCategories([...categories, newCategoryData.category]);
      } else {
        setCategories([newCategoryData.category]);
      }

      setCategories((prev) => [...prev, newCategoryData.category]);

      await fetchCategories();

      setNewCategory("");
      setNewCategoryDescription("");
      setOpen(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Функция для редактирования категории
  const editCategory = async () => {
    if (!editingCategory) return;

    try {
      const res = await fetch("/api/income/categories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingCategory._id,
          name: newCategory,
          description: newCategoryDescription,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to edit category");
      }

      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === editingCategory._id
            ? { ...cat, name: newCategory, description: newCategoryDescription }
            : cat
        )
      );

      setCategory(editingCategory._id);

      setSnackbarMessage("Category updated successfully");
      setSnackbarSeverity("success");
      setShowSnackbar(true);
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error editing category:", error);
      setSnackbarMessage("Failed to edit category");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    }
  };

  // Функция для удаления категории
  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch("/api/income/categories", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete category");
      }

      setCategories((prev) => {
        const updatedCategories = prev.filter((cat) => cat._id !== id);

        if (category === id) {
          setCategory("");
        }
        return updatedCategories;
      });

      setCategories((prev) => prev.filter((category) => category._id !== id));
      setSnackbarMessage("Category deleted successfully");
      setSnackbarSeverity("success");
      setShowSnackbar(true);
    } catch (error) {
      console.error("Error deleting category:", error);
      setSnackbarMessage("Failed to delete category");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    }
  };

  // Обработчик для открытия диалогового окна редактирования
  const handleOpenEditDialog = (category: Category) => {
    if (!category) {
      console.error("Selected category not found");
      return;
    }
    setEditingCategory(category);
    setNewCategory(category.name);
    setNewCategoryDescription(category.description || "");
    setOpenEditDialog(true);
  };

  // Обработчик для закрытия диалогового окна редактирования
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setNewCategory("");
    setNewCategoryDescription("");
    setEditingCategory(null);
  };

  return (
    <>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 2, width: "25ch" } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            id="income-amount"
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
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as string)}
            required
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            {categories?.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <Button variant="outlined" onClick={() => setOpen(true)}>
            Add New Category
          </Button>
          {/* Кнопки редактирования и удаления */}
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
                <Button
                  variant="outlined"
                  onClick={() => {
                    deleteCategory(category);
                    setCategory("");
                  }}
                >
                  Delete Category
                </Button>
              </div>
            )}
          </div>
        </div>
        <div>
          <TextField
            id="income-description"
            multiline
            rows={4}
            color="primary"
            label="Description"
            variant="outlined"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <TextField
            id="income-date"
            variant="outlined"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button variant="outlined" type="submit">
          Add Income
        </Button>
      </Box>

      {showSnackbar && (
        <SnackbarNotification
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
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
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={AddCategory}>
            Add Category
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог для редактирования категории */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
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
          <Button variant="outlined" onClick={handleCloseEditDialog}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={editCategory}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default IncomeForm;

// предыдущая рабочая версия формы добавления дохода.
// "use client";

// import React, { useState } from "react";
// import { useSession } from "next-auth/react";
// import { IncomeFormProps } from "@/interfaces";
// import SnackbarNotification from "@/components/Notification/Snackbar";

// import { Box, TextField } from "@mui/material";

// const IncomeForm: React.FC<IncomeFormProps> = () => {
//   const { data: session } = useSession();
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [date, setDate] = useState("");
//   const [error, setError] = useState("");

//   const [showSnackbar, setShowSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
//     "success"
//   );

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       if (!session) {
//         setError("You must be logged in to add income.");
//         return;
//       }

//       const res = await fetch("/api/income/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ amount, description, category, date }),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || "Failed to add income");
//       }

//       setSnackbarMessage("Income added successfully");
//       setSnackbarSeverity("success");
//       setShowSnackbar(true);

//       setAmount("");
//       setDescription("");
//       setCategory("");
//       setDate("");
//       setError("");
//     } catch (error: any) {
//       setError(error.message || "Failed to add income");

//       setSnackbarMessage("Failed to add income");
//       setSnackbarSeverity("error");
//       setShowSnackbar(true);
//     }
//   };

//   return (
//     <>
//       <Box
//         component="form"
//         sx={{ "& > :not(style)": { m: 2, width: "25ch" } }}
//         noValidate
//         autoComplete="off"
//         onSubmit={handleSubmit}
//       >
//         <div>
//           <TextField
//             id="amount"
//             label="Amount"
//             variant="outlined"
//             autoFocus={true}
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <TextField
//             id="category"
//             label="Category"
//             variant="outlined"
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <TextField
//             id="description"
//             multiline
//             rows={4}
//             color="primary"
//             label="Description"
//             variant="outlined"
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <TextField
//             variant="outlined"
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />
//         </div>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <button type="submit">Add Income</button>
//       </Box>

//       {showSnackbar && (
//         <SnackbarNotification
//           message={snackbarMessage}
//           severity={snackbarSeverity}
//         />
//       )}
//     </>
//   );
// };

// export default IncomeForm;

//------------------------------------------
// import { useState, useEffect } from "react";

// const IncomeForm = ({ onSubmit, initialData }) => {
//   const [amount, setAmount] = useState(initialData?.amount || "");
//   const [description, setDescription] = useState(
//     initialData?.description || ""
//   );
//   const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
//   const [date, setDate] = useState(initialData?.date || "");
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // Fetch income categories
//     const fetchCategories = async () => {
//       const res = await fetch("/api/income-categories");
//       const data = await res.json();
//       setCategories(data);
//     };

//     fetchCategories();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ amount, description, categoryId, date });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         placeholder="Сумма"
//       />
//       <input
//         type="text"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Описание"
//       />
//       <select
//         value={categoryId}
//         onChange={(e) => setCategoryId(e.target.value)}
//       >
//         <option value="">Выберите категорию</option>
//         {categories.map((category) => (
//           <option key={category._id} value={category._id}>
//             {category.name}
//           </option>
//         ))}
//       </select>
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//       <button type="submit">Сохранить</button>
//     </form>
//   );
// };

// export default IncomeForm;

export interface Category {
  _id: string;
  name: string;
  description: string;
}

export interface CategoryFormProps {
  initialData?: Category;
  onSubmit: (data: Category) => void;
}

export interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  newCategory: string;
  newCategoryDescription: string;
  setNewCategory: (value: string) => void;
  setNewCategoryDescription: (value: string) => void;
  handleAddCategory: () => Promise<void>;
}

export interface EditCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  editingCategory: Category | null;
  newCategory: string;
  newCategoryDescription: string;
  setNewCategory: (value: string) => void;
  setNewCategoryDescription: (value: string) => void;
  handleEditCategory: () => Promise<void>;
}

export interface CategorySelectProps {
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

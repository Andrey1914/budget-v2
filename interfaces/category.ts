export interface ICategory {
  _id: string;
  name: string;
  description: string;
}

export interface CategoryFormProps {
  initialData?: ICategory;
  onSubmit: (data: ICategory) => void;
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
  editingCategory: ICategory | null;
  newCategory: string;
  newCategoryDescription: string;
  setNewCategory: (value: string) => void;
  setNewCategoryDescription: (value: string) => void;
  handleEditCategory: () => Promise<void>;
}

export interface CategorySelectProps {
  categories: ICategory[];
  category: string;
  setCategory: (value: string) => void;
  newCategory: string;
  newCategoryDescription: string;
  setNewCategory: (value: string) => void;
  setNewCategoryDescription: (value: string) => void;
  handleAddCategory: () => Promise<void>;
  handleEditCategory: () => Promise<void>;
  handleOpenEditDialog: (category: ICategory) => void;
  handleDeleteCategory: () => Promise<void>;
  openAddDialog: boolean;
  setOpenAddDialog: (value: boolean) => void;
  openEditDialog: boolean;
  setOpenEditDialog: (value: boolean) => void;
  editingCategory: ICategory | null;
  handleCloseEditDialog: () => void;
}

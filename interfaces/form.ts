interface FormData {
  amount: number;
  category: string;
  description: string;
  date: string;
  currency: string;
}

export interface BaseFormProps {
  initialData?: FormData;
  onSubmit: (data: FormData) => void;
}

export interface BaseEditFormProps {
  initialAmount: number;
  initialDescription: string;
  initialCategory: string;
  onUpdate: () => void;
}

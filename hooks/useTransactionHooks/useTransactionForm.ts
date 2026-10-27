import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import apiClient from "@/lib/apiClient";
import { validateFormsTransactions } from "@/utils/validators/validateFormTransactions";
import { Session, TransactionFormProps } from "@/interfaces";

export const useTransactionForm = ({
  type,
  initialData,
  onSuccess,
  onClose,
  onSubmit,
}: TransactionFormProps) => {
  const { data: session } = useSession() as { data: Session | null };

  const [amount, setAmount] = useState<number | string>(
    initialData?.amount || "",
  );
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [category, setCategory] = useState<string>(initialData?.category || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [currency, setCurrency] = useState<string>(
    initialData?.currency || session?.user?.currency || "USD",
  );

  // Валидация / Поповер
  const [popoverMessage, setPopoverMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Сабмит и обратная связь
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const showNotification = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const closeNotification = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (session?.user?.currency && !initialData?.currency) {
      setCurrency(session.user.currency);
    }
  }, [session, initialData?.currency]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      showNotification(`You must be logged in to add ${type}.`, "error");
      return;
    }

    if (
      !validateFormsTransactions(
        amount,
        description,
        category,
        date,
        setPopoverMessage,
        setAnchorEl,
      )
    ) {
      return;
    }

    setLoading(true);
    setPopoverMessage("");
    setAnchorEl(null);

    const parsedAmount = parseFloat(amount as string);

    try {
      await apiClient.post("/api/transactions", {
        type,
        amount: parsedAmount,
        description,
        category,
        currency,
        date,
      });

      showNotification(
        `${type === "income" ? "Income" : "Expense"} added successfully`,
        "success",
      );

      setAmount("");
      setDescription("");
      setCategory("");
      setDate("");

      if (onSubmit) {
        await onSubmit({
          type,
          amount: parsedAmount,
          description,
          category,
          currency,
          date,
        });
      }
      if (onSuccess) {
        onSuccess();
      } else if (onClose) {
        onClose();
      }
    } catch (error: any) {
      showNotification(error.message || `Failed to add ${type}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    values: { amount, description, category, date, currency },
    setAmount,
    setDescription,
    setCategory,
    setDate,
    setCurrency,
    loading,
    handleSubmit,
    popover: {
      open: Boolean(anchorEl),
      anchorEl,
      message: popoverMessage,
      onClose: () => setAnchorEl(null),
    },
    snackbar,
    showNotification,
    closeNotification,
  };
};

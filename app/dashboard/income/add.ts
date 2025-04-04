import axios from "axios";
import { IncomeFormProps } from "@/interfaces";

const addIncome = async (data: IncomeFormProps["initialData"]) => {
  try {
    const res = await axios.post("/api/transactions/add", data);

    if (res.status !== 201) {
      const responseData = await res.data;
      throw new Error(responseData.error || "Failed to add income");
    }

    return { success: true, message: "Income added successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to add income",
    };
  }
};

export default addIncome;

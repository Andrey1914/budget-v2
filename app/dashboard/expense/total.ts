export const fetchTotalExpense = async () => {
  try {
    const response = await fetch("/api/expense/total", {
      method: "GET",
      credentials: "include", // Включение куки, если требуется
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch total expense: ${errorText}`);
    }

    const data = await response.json();
    return data.total;
  } catch (err) {
    console.error("Error fetching total expense:", err);
    throw err;
  }
};

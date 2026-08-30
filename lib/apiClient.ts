import axios from "axios";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred";
    console.error("API Client Error:", message);
    return Promise.reject(new Error(message));
  },
);

export default apiClient;

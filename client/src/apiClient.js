import axios, { AxiosError } from "axios";
import errors from "./data/apiErrors";
import { showError } from "./components/ui/alert";

export const API_URL = "https://api.trainix.site/api/v1";

// this is because cors is not enabled on the server
// export const API_URL = "/api/v1";

const ApiClient = axios.create({
  baseURL: API_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

ApiClient.interceptors.request.use((config) => {
  return config;
});

ApiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const formattedError = formatError(error);
    showError(formattedError.data.message, { closeButton: true });
    return Promise.reject(formattedError);
  }
);

const formatError = (err) => {
  const errorResponse = {
    code: err.response.data.code,
    status: err.status,
    data: {
      data: err.response.data.data,
      message: errors[err.response.data.message] ?? err.response.data.message,
      status: err.response.data.status,
    },
  };
  return errorResponse;
};

export default ApiClient;

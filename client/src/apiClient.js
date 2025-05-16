import axios from "axios";

export const API_URL = "http://51.44.18.63:41431/api/v1";

const ApiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

ApiClient.interceptors.request.use((config) => {
  // here we will handle authintication and authorization
  return config;
});

ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    error = formatError();
    return error;
  }
);

const formatError = (error) => {
  // here we will format the errors in a generalized format
  return error;
};

export default ApiClient;

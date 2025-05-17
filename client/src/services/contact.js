import ApiClient from "../apiClient";

export const sendContactMessage = (data) => {
  return ApiClient.post("services/message", data);
};

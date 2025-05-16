import ApiClient from "../apiClient";

export const getPlans = () => {
  return ApiClient.get("plans");
};

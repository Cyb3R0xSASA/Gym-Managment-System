import ApiClient from "../apiClient";

export const verifyEmail = (data) => {
    return ApiClient.post("auth/verify-email", data);
};

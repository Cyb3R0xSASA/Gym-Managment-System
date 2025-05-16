import ApiClient from "../apiClient";

export const verifyEmail = (data) => {
    return ApiClient.post("auth/verify-email", data);
};

export const register = (data) => {
    return ApiClient.post("auth/register", data);
};
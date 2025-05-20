import ApiClient from "../apiClient";

export const verifyEmail = (data) => {
  return ApiClient.post("auth/verify-email", data);
};

export const login = (data) => {
  return ApiClient.post("auth/login", data);
};

export const register = (data) => {
    return ApiClient.post("auth/register", data);
};

export const resendOtp = (data) => {
    return ApiClient.post("auth/resend-otp", data);
};

export const forgotPassword = (data) => {
    return ApiClient.post("auth/forget-password", data);
};

export const resetPassword = (data) => {
    return ApiClient.post("auth/reset-password", data);
}
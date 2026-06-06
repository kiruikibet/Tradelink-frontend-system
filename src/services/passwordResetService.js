import { apiRequest } from "./apiClient";

export async function forgotPassword(email){
    return apiRequest("/api/auth/forgot-password/", {
        method: "POST",
        body: { email },
        errorMessage: "Failed to send password reset email."
    });
}

export async function resetPassword(uid,token,password){
    return apiRequest("/api/auth/reset-password/", {
        method: "POST",
        body: {
            uid,
            token,
            password
        },
        errorMessage: "Failed to reset password."
    });
}

import React from "react";
import AuthLayout from "./AuthPageLayout";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

export default function SignIn() {
    return (
        <>
        <AuthLayout>
            <ForgotPasswordForm />
        </AuthLayout>
        </>
    );
}

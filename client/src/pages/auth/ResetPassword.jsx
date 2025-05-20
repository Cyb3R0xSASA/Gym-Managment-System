import React from "react";
import AuthLayout from "./AuthPageLayout";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

export default function SignIn() {
    return (
        <>
        <AuthLayout>
            <ResetPasswordForm />
        </AuthLayout>
        </>
    );
}

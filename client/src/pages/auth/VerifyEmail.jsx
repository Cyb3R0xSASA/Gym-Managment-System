import React from "react";
import AuthLayout from "./AuthPageLayout";
import OtpForm from "../../components/auth/OtpForm";

export default function VerifyEmail() {
    return (
        <>
        <AuthLayout>
            <OtpForm />
        </AuthLayout>
        </>
    );
}

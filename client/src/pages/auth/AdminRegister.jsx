import React from "react";
import AuthLayout from "./AuthPageLayout";
import AdminRegisterForm from "../../components/auth/AdminRegisterForm";

export default function AdminRegister() {
    return (
        <>
        <AuthLayout>
            <AdminRegisterForm />
        </AuthLayout>
        </>
    );
}

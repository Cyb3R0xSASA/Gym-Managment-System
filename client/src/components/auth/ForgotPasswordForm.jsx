import React, { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { forgotPassword } from "../../services/auth";
import { showSuccess, showError } from "../../components/ui/alert";

export default function ForgotPasswordPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string()
        .email("بريد إلكتروني غير صالح")
        .required("البريد الإلكتروني مطلوب"),
    });

    const formik = useFormik({
        initialValues: {
        email: "",
        },
        validationSchema,
        onSubmit: async (values) => {
        try {
            setIsSubmitting(true);
            const response = await forgotPassword({ email: values.email });
            if (response.success) {
            setEmailSent(true);
            showSuccess("تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني");
            } else {
            showError(response.message || "حدث خطأ أثناء إرسال رابط استعادة كلمة المرور");
            }
        } catch (error) {
            console.error("خطأ في استعادة كلمة المرور:", error);
            showError("حدث خطأ أثناء إرسال رابط استعادة كلمة المرور");
        } finally {
            setIsSubmitting(false);
        }
        },
    });

    return (
        <div className="flex flex-col flex-1">
        <div className="w-full max-w-md pt-10 mx-auto">
            <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
            الرجوع إلى الصفحة الرئيسية
            <ChevronLeftIcon className="size-5" />
            </Link>
        </div>
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
            <div className="mb-5 sm:mb-8">
                <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                استعادة كلمة المرور
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.
                </p>
            </div>
            
            {emailSent ? (
                <div className="p-4 bg-green-50 rounded-md border border-green-100">
                <p className="text-sm text-green-700">
                    تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من بريدك الإلكتروني واتباع التعليمات.
                </p>
                <Button 
                    className="w-full mt-4" 
                    size="sm" 
                    onClick={() => setEmailSent(false)}
                >
                    إرسال مرة أخرى
                </Button>
                </div>
            ) : (
                <form onSubmit={formik.handleSubmit}>
                <div className="space-y-6">
                    <div>
                    <Label>البريد الإلكتروني <span className="text-error-500">*</span></Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="أدخل بريدك الإلكتروني"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.email && formik.errors.email ? "border-red-500" : ""}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
                    )}
                    </div>
                    <div>
                    <Button 
                        className="w-full" 
                        size="sm" 
                        type="submit" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "جارٍ الإرسال..." : "إرسال رابط الاستعادة"}
                    </Button>
                    </div>
                </div>
                </form>
            )}
            
            <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                تذكرت كلمة المرور؟{" "}
                <Link
                    to="/login"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400 font-semibold"
                >
                    سجل الدخول
                </Link>
                </p>
            </div>
            </div>
        </div>
        </div>
    );
}

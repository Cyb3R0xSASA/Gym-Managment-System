/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeOff, Eye } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";

import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { register } from "../../services/auth";

export default function GymRegistrationForm() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [planInfo, setPlanInfo] = useState({
        planId: "",
        planType: ""
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const planId = searchParams.get("planId");
        const planType = searchParams.get("planType");

        if (planId && planType) {
        setPlanInfo({
            planId,
            planType
        });
        } else {
        console.error("معلومات الخطة غير موجودة في الرابط");
        navigate("/plans");
        }
    }, [location]);
    const validationSchema = Yup.object({
        firstName: Yup.string()
        .min(2, "يجب أن يكون الاسم الأول على الأقل حرفين")
        .max(50, "يجب أن يكون الاسم الأول أقل من 50 حرف")
        .required("الاسم الأول مطلوب"),
        lastName: Yup.string()
        .min(2, "يجب أن يكون الاسم الأخير على الأقل حرفين")
        .max(50, "يجب أن يكون الاسم الأخير أقل من 50 حرف")
        .required("الاسم الأخير مطلوب"),
        email: Yup.string()
        .email("بريد إلكتروني غير صالح")
        .required("البريد الإلكتروني مطلوب"),
        password: Yup.string()
        .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
        .max(128, "يجب أن تكون كلمة المرور أقل من 128 حرف")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,128}$/,
            "يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم ورمز خاص"
        )
        .required("كلمة المرور مطلوبة"),
        gender: Yup.string()
        .oneOf(["male", "female"], "يرجى اختيار الجنس")
        .required("الجنس مطلوب"),
        terms: Yup.boolean()
        .oneOf([true], "يجب الموافقة على الشروط والأحكام")
        .required("يجب الموافقة على الشروط والأحكام"),
    });
    const formik = useFormik({
        initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        terms: false,
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
        try {
            const { terms, ...registrationData } = values;
            const finalData = {
            ...registrationData,
            planId: planInfo.planId,
            planType: planInfo.planType
            };
            const response = await register(finalData);
            if (response.success) {
            navigate("/verify-email?email=" + values.email);
            }
        } catch (error) {
            console.error("خطأ في التسجيل:", error);
        } finally {
            setSubmitting(false);
        }
        },
    });

    return (
        <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
        <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
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
                تسجيل صالة رياضية جديدة
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                أدخل البيانات التالية لتسجيل صالتك الرياضية
                </p>
                {planInfo.planId && planInfo.planType && (
                <div className="mt-2 p-2 bg-blue-50 rounded-md border border-blue-100">
                    <p className="text-sm text-blue-700">
                    نوع الاشتراك: {planInfo.planType === "monthly" ? "شهري" : 
                                    planInfo.planType === "semiAnnual" ? "نصف سنوي" : 
                                    planInfo.planType === "annual" ? "سنوي" : planInfo.planType}
                    </p>
                </div>
                )}
            </div>
            <div>
                <form onSubmit={formik.handleSubmit}>
                <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* الاسم الأول */}
                    <div className="sm:col-span-1">
                        <Label>
                        الاسم الأول<span className="text-error-500">*</span>
                        </Label>
                        <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="أدخل الاسم الأول"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.firstName && formik.errors.firstName ? "border-red-500" : ""}
                        />
                        {formik.touched.firstName && formik.errors.firstName && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.firstName}</p>
                        )}
                    </div>
                    {/* الاسم الأخير */}
                    <div className="sm:col-span-1">
                        <Label>
                        الاسم الأخير<span className="text-error-500">*</span>
                        </Label>
                        <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="أدخل الاسم الأخير"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.lastName && formik.errors.lastName ? "border-red-500" : ""}
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.lastName}</p>
                        )}
                    </div>
                    </div>
                    {/* البريد الإلكتروني */}
                    <div>
                    <Label>
                        البريد الإلكتروني<span className="text-error-500">*</span>
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="أدخل بريد إلكتروني صالح"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.email && formik.errors.email ? "border-red-500" : ""}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
                    )}
                    </div>
                    {/* كلمة المرور */}
                    <div>
                    <Label>
                        كلمة المرور<span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                        <Input
                        id="password"
                        name="password"
                        placeholder="أدخل كلمة المرور"
                        type={showPassword ? "text" : "password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.password && formik.errors.password ? "border-red-500" : ""}
                        />
                        <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer left-4 top-1/2"
                        >
                        {showPassword ? (
                            <Eye className="text-gray-400 size-5" />
                        ) : (
                            <EyeOff className="text-gray-400 size-5" />
                        )}
                        </span>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
                    )}
                    </div>
                    {/* الجنس */}
                    <div>
                    <Label>
                        الجنس<span className="text-error-500">*</span>
                    </Label>
                    <div className="flex items-center gap-5 mt-2">
                        <label className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-300">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formik.values.gender === "male"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-radio accent-[#5351d7]"
                        />
                        ذكر
                        </label>
                        <label className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-300">
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formik.values.gender === "female"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-radio accent-[#5351d7]"
                        />
                        أنثى
                        </label>
                    </div>
                    {formik.touched.gender && formik.errors.gender && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.gender}</p>
                    )}
                    </div>
                    {/* الموافقة على الشروط */}
                    <div className="flex items-center gap-3">
                    <Checkbox
                        id="terms"
                        name="terms"
                        checked={formik.values.terms}
                        onChange={() => formik.setFieldValue("terms", !formik.values.terms)}
                        onBlur={formik.handleBlur}
                    />
                    <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                        بمجرد إنشاءك الحساب فأنت توافق على{" "}
                        <span className="text-gray-800 dark:text-white/90">
                        إتفاقيات الخدمة,
                        </span>{" "}
                        و{" "}
                        <span className="text-gray-800 dark:text-white">
                        سياسات الخصوصية
                        </span>
                    </p>
                    </div>
                    {formik.touched.terms && formik.errors.terms && (
                    <p className="text-sm text-red-500 mt-1">{formik.errors.terms}</p>
                    )}
                    {/* زر التسجيل */}
                    <div>
                    <Button className="w-full" size="sm" type="submit" disabled={formik.isSubmitting || !planInfo.planId || !planInfo.planType}>
                        {formik.isSubmitting ? "جارٍ التسجيل..." : "تسجيل الصالة الرياضية"}
                    </Button>
                    </div>
                </div>
                </form>

                <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                    لديك حساب بالفعل؟ {""}
                    <Link
                    to="/login"
                    className="text-[#333198] hover:text-brand-600 dark:text-brand-400 font-semibold"
                    >
                    سجل الدخول
                    </Link>
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

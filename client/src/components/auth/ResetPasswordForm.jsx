/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeOff, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { forgotPassword, resetPassword } from "../../services/auth";
import { showError, showSuccess } from "../ui/alert";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../form/input/InputField";

export default function OtpForm() {
    const [searchParams] = useSearchParams();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const inputsRef = useRef([]);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // التحقق من صحة كلمة المرور باستخدام Yup
    const validationSchema = Yup.object({
        password: Yup.string()
            .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
            .max(128, "يجب أن تكون كلمة المرور أقل من 128 حرف")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,128}$/,
                "يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم ورمز خاص"
            )
            .required("كلمة المرور الجديدة مطلوبة"),
    });

    // استخدام Formik للتحكم في حقل كلمة المرور
    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema,
        onSubmit: () => {}, // سيتم التعامل مع الإرسال في دالة verifyOtp
    });

    useEffect(() => {
        // استخراج البريد الإلكتروني من الرابط
        const emailFromUrl = searchParams.get("email");
        if (emailFromUrl) {
            setEmail(emailFromUrl);
        } else {
            console.error("البريد الإلكتروني غير موجود في الرابط");
        }

        if (timer > 0) {
            const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer, searchParams]);

    // Get token from URL and autofill
    useEffect(() => {
        const token = searchParams.get("token");
        if (token && /^\d{6}$/.test(token)) {
            setOtp(token.split(""));
            inputsRef.current[5]?.focus();
        }
    }, [searchParams]);

    // OTP input change handler
    const handleChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) inputsRef.current[index + 1]?.focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleResend = async () => {
        if (!email) {
            showError("البريد الإلكتروني غير موجود في الرابط");
            return;
        }

        try {
            const response = await forgotPassword({ email });
            if (response.success) {
                setOtp(["", "", "", "", "", ""]);
                setTimer(60);
                inputsRef.current[0]?.focus();
                showSuccess("تم إرسال الرمز مرة أخرى إلى بريدك الإلكتروني");
            } else {
                showError("حدث خطأ أثناء إعادة إرسال الرمز");
            }
        } catch (error) {
            console.error("خطأ في إعادة إرسال الرمز:", error);
            showError("حدث خطأ أثناء إعادة إرسال الرمز");
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        
        // التحقق من صحة كلمة المرور
        const errors = await formik.validateForm();
        if (Object.keys(errors).length > 0) {
            formik.setTouched({ password: true });
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // إرسال رمز التحقق والبريد الإلكتروني وكلمة المرور الجديدة
            const response = await resetPassword({ 
                otp: otp.join(""), 
                email: email,
                password: formik.values.password
            });
            
            if (response.success) {
                showSuccess("تم إعادة تعيين كلمة المرور بنجاح!");
                navigate("/login");
            } else {
                showError("رمز التحقق غير صحيح أو انتهت صلاحيته");
            }
        } catch (error) {
            console.error("خطأ في إعادة تعيين كلمة المرور:", error);
            showError("حدث خطأ أثناء إعادة تعيين كلمة المرور");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col justify-center w-full max-w-md mx-auto">
            <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    الرجوع إلى الصفحة الرئيسية
                    <ChevronLeftIcon className="size-5" />
                </Link>
            </div>

            <div className="mb-6">
                <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white sm:text-title-md">
                    إعادة تعيين كلمة المرور
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    أدخل رمز التحقق المكون من 6 أرقام وكلمة المرور الجديدة.
                </p>
                {email && (
                    <p className="text-sm text-blue-500 mt-1 font-semibold">
                        {email}
                    </p>
                )}
            </div>
            <form onSubmit={verifyOtp}>
                {/* حقل رمز التحقق */}
                <Label>رمز التحقق</Label>
                <div className="flex justify-between gap-1 my-4" dir="ltr">
                    {otp.map((digit, index) => (
                        <motion.input
                            required
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputsRef.current[index] = el)}
                            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-center text-lg border rounded-md bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 1, ease: "easeOut" }}
                        />
                    ))}
                </div>

                {/* حقل كلمة المرور الجديدة */}
                <div className="mt-6">
                    <Label>كلمة المرور الجديدة <span className="text-error-500">*</span></Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            placeholder="أدخل كلمة المرور الجديدة"
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
                    <p className="text-xs text-gray-500 mt-1">
                        يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، وتتضمن حرفاً كبيراً، وحرفاً صغيراً، ورقماً، ورمزاً خاصاً.
                    </p>
                </div>

                <Button 
                    className="w-full mt-4" 
                    size="sm" 
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "جارٍ التحقق..." : "تأكيد وإعادة تعيين كلمة المرور"}
                </Button>
            </form>

            {/* Resend Section */}
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                {timer > 0 ? (
                    <span>يمكنك إعادة إرسال الرمز خلال {timer} ثانية</span>
                ) : (
                    <button
                        onClick={handleResend}
                        className="text-brand-500 hover:text-brand-600 font-semibold transition-colors cursor-pointer"
                        disabled={!email}
                    >
                        إعادة إرسال الرمز
                    </button>
                )}
            </div>
        </div>
    );
}

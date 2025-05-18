import React, { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeOff, Eye } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { login } from "../../services/auth";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("بريد إلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
      password: Yup.string().min(6, "كلمة المرور قصيرة جدًا").required("كلمة المرور مطلوبة"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
        const res = await login(values);
        if(res.code == 1) navigate("/dashboard")
        setSubmitting(false);
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
              تسجيل الدخول
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              مرحباً بك من جديد, أدخل البريد الإلكترونى وكلمة المرور لتسجيل دخولك.
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label>البريد الإلكترونى <span className="text-error-500">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="info@gmail.com"
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
                <Label>كلمة المرور <span className="text-error-500">*</span></Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                    تذكرنى للمرة القادمة
                  </span>
                </div>
                <Link
                  to="/reset-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  نسيت كلمة المرور ؟
                </Link>
              </div>
              <div>
                <Button className="w-full" size="sm" type="submit" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? "جارٍ التحقق..." : "سجل الدخول"}
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              ليس لديك حساب مسجل ؟{" "}
              <Link
                to="/register"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400 font-semibold"
              >
                سجل الآن
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

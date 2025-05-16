import React, { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeOff, Eye } from "lucide-react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
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
              إنشاء حساب جديد
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              إملأ البيانات التالية لإنشاء حساب جديد
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- First Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      الإسم الأول<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="أدخل إسمك الأول"
                    />
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      الإسم الأخير<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="أدخل إسمك الأخير"
                    />
                  </div>
                </div>
                {/* <!-- Email --> */}
                <div>
                  <Label>
                    البريد الإلكترونى<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="أدخل بريد إلكترونى صالح"
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    كلمة المرور<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="أدخل كلمة المرور"
                      type={showPassword ? "text" : "password"}
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
                </div>
                {/* <!-- Confirm Password --> */}
                <div>
                  <Label>
                    تأكيد كلمة المرور<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="أدخل كلمة المرور مرة أخرى"
                      type={showConfirm ? "text" : "password"}
                    />
                    <span
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer left-4 top-1/2"
                    >
                      {showConfirm ? (
                        <Eye className="text-gray-400 size-5" />
                      ) : (
                        <EyeOff className="text-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Gender Selection (Required) --> */}
                <div>
                  <div className="flex items-center gap-5">
                    <label className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-300">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        required
                        className="form-radio accent-[#5351d7]"
                      />
                      ذكر
                    </label>
                    <label className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-300">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="form-radio accent-[#5351d7]"
                      />
                      أنثى
                    </label>
                    <label className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-300">
                      <input
                        type="radio"
                        name="gender"
                        value="custom"
                        className="form-radio accent-[#5351d7]"
                      />
                      مخصص
                    </label>
                  </div>
                </div>
                {/* <!-- Checkbox --> */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
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
                {/* <!-- Button --> */}
                <div>
                <Button className="w-full" size="sm">
                    أنشئ الحساب
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                لديك حساب بالفعل ؟ {""}
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

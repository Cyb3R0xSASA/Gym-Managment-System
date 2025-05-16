import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-gradient-to-b from-black to-[#242372] return relative dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="flex text-white items-end mb-4 text-[20px] font-bold">
              TRAINIX
                <img
                  width={100}
                  height={48}
                  src="/images/trainix.png"
                  alt="Logo"
                />
              </Link>
              <p className="text-center text-white">
              تعرف على الجيل القادم من نظم إدارة الصالات الرياضية مع ترينيكس
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

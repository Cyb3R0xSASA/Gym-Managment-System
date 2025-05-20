import React, { Suspense, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { getPlans } from "@/services/plans";
import Spinner from "../ui/spinner";
import { useNavigate } from "react-router-dom";

const frequencies = [
  { label: "شهرياً", key: "monthly" },
  { label: "نصف سنوى", key: "semi" },
  { label: "سنوياً", key: "annual" },
];

export default function PricingPlans() {
  const [billing, setBilling] = useState("monthly");
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  const formatPlansPricing = useCallback(
    (plans) => {
      plans = plans.map((plan) => {
        plan.prices = {
          monthly: plan.monthlyPrice,
          annual: plan.annualPrice - plan.annualDiscount,
          semi: plan.semiAnnualPrice - plan.semiAnnualDiscount,
        };
        return plan;
      });
      return plans;
    },
    [plans]
  );

  useEffect(() => {
    (async () => {
      const data = await getPlans();
      const formatedPlans = formatPlansPricing(data.data);
      setPlans(formatedPlans);
    })();
  }, []);

  const handleSubscription = (planId) => {
    navigate(`/admin_register?planId=${planId}&planType=${billing}`);
  };

  return (
    <div className="flex flex-col items-center py-[40px] px-[20px] gap-[40px]">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] w-full max-w-[1200px]">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={clsx(
              "relative bg-white rounded-[15px] p-[30px] flex flex-col justify-between card-shadow transition-all duration-300 hover:scale-105",
              plan.name.en === "Premium"
                ? "scale-105 border border-[#4A35D3]"
                : "border border-gray-200"
            )}
          >
            <div>
              <h3 className="normal-text font-semibold text-[#242372]">
                {plan.name.ar}
              </h3>
              <p className="text-[11px] text-gray-600 mb-4">
                {plan.description.ar}
              </p>
              <p
                className="medium-text font-bold text-[#242372] mb-4"
                dir="rtl"
              >
                {plan?.prices?.[billing] === 0
                  ? "Free"
                  : `EGP ${plan?.prices?.[billing]}`}
              </p>
              <ul className="space-y-[2px] text-[11px] text-gray-700">
                <li>عدد {plan.features["branches"]} من الفروع</li>
                <li>عدد {plan.features["clientsPerBranch"]} من العملاء</li>
                <li>عدد {plan.features["employeesPerBranch"]} من الموظفين</li>
                <li>عدد {plan.features["trainersPerBranch"]} من المدربين</li>
              </ul>
            </div>
            <button
              onClick={() => handleSubscription(plan._id)}
              className={clsx(
                "mt-[20px] w-full py-[8px] rounded-[10px] small-text transition cursor-pointer",
                plan.name.en === "Premium"
                  ? "bg-gradient-to-tr from-black to-[#4A35D3] text-white"
                  : "border border-[#242372] text-[#242372] hover:bg-[#242372] hover:text-white"
              )}
            >
              إشترك الآن
            </button>
          </div>
        ))}
      </div>
      <div className="flex space-x-[10px] rounded-[10px] overflow-hidden border border-[#242372]">
        {frequencies.map((f) => (
          <button
            key={f.key}
            onClick={() => setBilling(f.key)}
            className={clsx(
              "px-[20px] py-[10px] small-text font-medium  transition-all duration-300 cursor-pointer",
              billing === f.key
                ? "bg-gradient-to-tr from-black to-[#4A35D3] text-white"
                : "text-[#242372]"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import clsx from 'clsx';

const plans = [
    {
        name: 'الخطة المجانية',
        description: 'تجربة محدودة لمدة 7 أيام.',
        prices: { monthly: 0, semi: 0, annual: 0 },
        features: [
            'مدرب واحد',
            'موظف واحد',
            '10 عملاء فقط'
        ]
    },
    {
        name: 'الخطة الأساسية',
        description: 'مناسبة للصالات الصغيرة.',
        prices: { monthly: 500, semi: 2800, annual: 5500 },
        features: [
            'فرع واحد',
            '2 موظفين',
            '5 مدربين',
            'حد أقصى 50 عميل'
        ]
    },
    {
        name: 'الخطة المميزة',
        description: 'الخيار المثالي للصالات متعددة الفروع.',
        prices: { monthly: 1000, semi: 5600, annual: 10500 },
        features: [
            'حتى 10 فروع',
            'لكل فرع 3 موظفين',
            '8 مدربين',
            'حد أقصى 100 عميل لكل فرع'
        ],
        highlight: true
    },
    {
        name: 'الخطة المتقدمة',
        description: 'حل شامل لإدارة الصالات الكبيرة.',
        prices: { monthly: 2000, semi: 11000, annual: 20000 },
        features: [
            'حتى 20 فرع',
            'لكل فرع 10 موظفين',
            'عدد غير محدود من المدربين',
            'عدد غير محدود من العملاء'
        ]
    }
];

const frequencies = [
    { label: 'شهرياً', key: 'monthly' },
    { label: 'نصف سنوى', key: 'semi' },
    { label: 'سنوياً', key: 'annual' },
];

export default function PricingPlans() {
    const [billing, setBilling] = useState('monthly');

    return (
        <div className="flex flex-col items-center py-[40px] px-[20px] gap-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] w-full max-w-[1200px]">
            {plans.map((plan) => (
            <div
                key={plan.name}
                className={clsx(
                'relative bg-white rounded-[15px] p-[30px] flex flex-col justify-between card-shadow transition-all duration-300 hover:scale-105',
                plan.highlight ? 'scale-105 border border-[#4A35D3]' : 'border border-gray-200'
                )}
            >
                <div>
                <h3 className="normal-text font-semibold text-[#242372]">{plan.name}</h3>
                <p className="text-[11px] text-gray-600 mb-4">{plan.description}</p>
                <p className="medium-text font-bold text-[#242372] mb-4" dir="rtl">
                    {plan.prices[billing] === 0 ? 'Free' : `EGP ${plan.prices[billing]}`}
                </p>
                <ul className="space-y-[2px] text-[11px] text-gray-700">
                    {plan.features.map((feature, i) => (
                    <li key={i}>- {feature}</li>
                    ))}
                </ul>
                </div>
                <button
                className={clsx(
                    'mt-[20px] w-full py-[8px] rounded-[10px] small-text transition cursor-pointer',
                    plan.highlight
                    ? 'bg-gradient-to-tr from-black to-[#4A35D3] text-white'
                    : 'border border-[#242372] text-[#242372] hover:bg-[#242372] hover:text-white'
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
                'px-[20px] py-[10px] small-text font-medium  transition-all duration-300 cursor-pointer',
                billing === f.key
                    ? 'bg-gradient-to-tr from-black to-[#4A35D3] text-white'
                    : 'text-[#242372]'
                )}
            >
                {f.label}
            </button>
            ))}
        </div>
        </div>
    );
}

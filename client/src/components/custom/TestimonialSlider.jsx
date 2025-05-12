/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

const testimonialsData = [
        {
            id: 't1',
            name: 'خالد الأحمد',
            avatar: '/images/avatar.jpg', // Placeholder avatar
            comment: 'أستخدم @خدمتكم منذ فترة وأنا معجب جداً بالسهولة والدعم الفني الرائع.\n✅ واجهة مستخدم بسيطة\n⚡ أداء سريع وموثوق\n💬 دعم فني متجاوب\n\nأنصح به بشدة لكل من يبحث عن الجودة.'
        },
        {
            id: 't2',
            name: 'فاطمة الزهراء',
            avatar: '/images/avatar.jpg',
            comment: 'لقد جربت العديد من الأدوات المشابهة على مدار عامين، ولكن @خدمتكم هي الأفضل بلا منازع.\n\nتجربة المستخدم في جدولة المحتوى وكتابته لا مثيل لها. حقاً في مستوى آخر!'
        },
        {
            id: 't3',
            name: 'يوسف المنصور',
            avatar: '/images/avatar.jpg',
            comment: 'أوصي بـ @خدمتكم لكتابة جميع تغريداتي ومنشوراتي، بما في ذلك جدولة النشر والتحليلات. يوفر علي الكثير من الوقت والجهد.'
        },
        {
            id: 't4',
            name: 'عائشة محمود',
            avatar: '/images/avatar.jpg',
            comment: '@خدمتكم رائعة جداً وقيمتها تفوق سعرها بكثير.\n\nلقد جربنا بدائل كثيرة في @شركتنا ولكن لا شيء يضاهيها. إذا كنت لا تزال تستخدم الطرق التقليدية، فأنت تضيع وقتك.'
        },
        {
            id: 't5',
            name: 'سالم عبدالله',
            avatar: '/images/avatar.jpg',
            comment: 'بعد تجربة جميع أدوات جدولة المنشورات الرئيسية تقريباً، استقررت على @خدمتكم.\n\nالميزة القاتلة بالنسبة لي هي محرر الصور المدمج - فريد ومفيد للغاية 🙏'
        },
        {
            id: 't6',
            name: 'نور الهدى',
            avatar: '/images/avatar.jpg',
            comment: 'لقد وصلت إلى أكثر من ٦٠٠ ألف ظهور منذ أن بدأت الكتابة عبر الإنترنت قبل ٦ أشهر مع @خدمتكم 🥳\n\nأشكر الفريق على بناء أداة كتابة جميلة ومدروسة وذات تصميم جيد.\n\n👉 تجربة مستخدم وتصميم نظيف\n👉 متوافق مع الجوال\n👉 اختصارات لوحة مفاتيح مفيدة\n👉 نادراً ما أرى أي أخطاء'
        },
        {
            id: 't7',
            name: 'أحمد خالد (مطور ويب)',
            avatar: '/images/avatar.jpg',
            comment: 'هذه هي بيئة الكتابة المفضلة الجديدة لدي لسلاسل التغريدات.\n\nلقد قاموا ببناء شيء بسيط ورائع وخالٍ من المشتتات مع @خدمتكم 😍'
        },
        {
            id: 't8',
            name: 'فريق التصميم الإبداعي',
            avatar: '/images/avatar.jpg', 
            comment: 'مُعجب حقًا بالطريقة التي بسطت بها @خدمتكم تجربة كتابة ونشر المحتوى الخاص بنا.\n\nتجربة مستخدم جميلة.\nلا يوجد أي تعقيد.\n\nالبساطة هي قمة التطور.'
        },
        {
            id: 't9',
            name: 'مطور إيثريوم',
            avatar: '/images/avatar.jpg',
            comment: 'مُعجب بـ @خدمتكم. إنه المحرر الذي تتمناه لأي منصة.\n\nحفظ مسودات متعددة، وإعادة ترتيب التغريدات في السلسلة، ونقل الصور المرفقة بسهولة تامة.'
        }
];

const ChevronLeftIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const ChevronRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

const TestimonialSlider = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [direction, setDirection] = useState(0);

    const updateItemsPerPage = useCallback(() => {
        if (window.innerWidth < 768) {
        setItemsPerPage(1);
        } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
        } else {
        setItemsPerPage(6);
        }
        setCurrentPage(0); 
    }, []);

    useEffect(() => {
        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, [updateItemsPerPage]);

    const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentPage((prevPage) => {
        const nextPage = prevPage + newDirection;
        if (nextPage < 0) {
            return totalPages - 1;
        }
        return nextPage % totalPages;
        });
    };

    const sliderVariants = {
        enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
        }),
        center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        },
        exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        })
    };

    const cardContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1 
        }
        }
    };

    const cardItemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
            ease: 'easeOut'
        }
        })
    };

    const startIndex = currentPage * itemsPerPage;
    const currentTestimonials = testimonialsData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="w-full py-[40px] md:py-[60px]">
        <div className="w-full min-w-[100vw] md:min-w-[70vw] px-[14px] sm:px-[20px] lg:px-[10px]">
            <div className="flex justify-center items-center mb-[40px]">
            <button 
                onClick={() => paginate(1)} 
                className="mx-2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-40"
                aria-label="Next testimonials"
                disabled={totalPages <= 1}
            >
                <ChevronRightIcon className="h-6 w-6" />
            </button>
            <button 
                onClick={() => paginate(-1)} 
                className="mx-2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-40"
                aria-label="Previous testimonials"
                disabled={totalPages <= 1}
            >
                <ChevronLeftIcon className="h-6 w-6" />
            </button>
            </div>

            <div className="w-full overflow-hidden relative min-h-[400px] md:min-h-[700px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                key={currentPage} 
                custom={direction}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] p-[20px] absolute top-0 left-0`}
                style={{
                    gridTemplateColumns: 
                    itemsPerPage === 1 ? '1fr' : 
                    itemsPerPage === 2 ? 'repeat(2, minmax(0, 1fr))' : 
                    'repeat(3, minmax(0, 1fr))'
                }}
                >
                {currentTestimonials.map((testimonial, index) => (
                    <TestimonialCard 
                    key={testimonial.id} 
                    name={testimonial.name} 
                    avatar={testimonial.avatar} 
                    comment={testimonial.comment} 
                    cardVariants={cardItemVariants}
                    customIndex={index} 
                    />
                ))}
                </motion.div>
            </AnimatePresence>
            </div>
        </div>
        </div>
    );
};

export default TestimonialSlider;

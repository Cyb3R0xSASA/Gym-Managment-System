/* eslint-disable no-unused-vars */
import React from 'react';
import Hero from '../layouts/Hero';
import { motion } from 'framer-motion';

const services = [
    {
        title: 'نظام إدارة العضويات',
        desc: 'تتبع العضويات , الحضور وتقدم العملاء بسهولة',
        icon: '/icons/cloud.png'
    },
    {
        title: 'نظام دفع متقدم',
        desc: 'معالجة الاشتراكات , الدفعات بدون تدخل بشرى',
        icon: '/icons/wallet.png'
    },
    {
        title: 'لوحة تحكم متكاملة',
        desc: 'أحصل على إحصائيات عن نمو صالتك الرياضية',
        icon: '/icons/pc.png'
    },
    {
        title: 'جدولة الحصص التدريبية',
        desc: 'أدر الحصص التدريبية والحجوزات بكفاءة عالية',
        icon: '/icons/calender.png'
    }
];

const Home = () => {
    const subtleFadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } }
    };

    const subtleSlideUp = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const subtleScaleIn = {
        hidden: { opacity: 0, scale: 0.50 },
        visible: { opacity: 1, scale: 1, transition: { duration: 2 } }
    };

    const buttonHoverEffect = { scale: 1.03 };

    const listContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5,
            }
        }
    };

    const listItemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const viewportProps = { once: true, amount: 0.5 };

    return (
        <motion.div 
            className={`relative flex flex-col items-center min-h-[60vh] md:min-h-[80vh] pt-[100px] md:pt-[120px] text-white`}
            initial="hidden"
            animate="visible"
            variants={subtleFadeIn}
        >
            <Hero isMain={true}/>

            {/* Hero Content Section */}
            <motion.div 
                className=	'flex flex-col items-center justify-start gap-[15px] md:gap-[25px] z-10'
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }} // Stagger children in this section
            >
                <motion.img 
                    src='/images/trainix.png' 
                    alt='hero-logo' 
                    className='w-[60px] md:w-[80px]'
                    variants={subtleScaleIn}
                />
                <motion.h1 
                    className='main-title-text text-center max-w-[560px]'
                    variants={subtleSlideUp}
                >
                    تعرف على الجيل القادم من نظم إدارة الصالات الرياضية مع ترينيكس
                </motion.h1>
                <motion.p 
                    className='large-text text-center text-[#E6E8EC] max-w-[280px] md:max-w-[700px]'
                    variants={subtleSlideUp}
                >
                    ترينيكس  هي شركة رائدة في مجال توفير الأنظمة الخاصة لادارة ومتابعة الصالات الرياضية. نحن نوفر لعملائنا أفضل ما توصلت إليه التكنولوجيا الحديثة عبر تطبيقات تساهم في رقمنة عمل الشركات بكفاءة عالية. تقوم ترينيكس بتقديم عدد من الخدمات للشركات للوصول بعملائها إلى أفضل النتائج وخلق بيئة رقمية أفضل وتحقيق النجاح.
                </motion.p>
                <motion.div 
                    className='mt-[20px] flex items-center gap-[10px] md:gap-[30px]'
                    variants={subtleSlideUp}
                >
                    <motion.a 
                        href='#' 
                        className='hover-zoom border border-white relative medium-text text-white px-[10px] py-[8px] rounded-[10px] md:px-[20px] md:py-[10px]'
                        whileHover={buttonHoverEffect}
                    >
                        عرض الخدمات ←
                    </motion.a>
                    <motion.a 
                        href='#' 
                        className='hover-zoom btn-gradient relative medium-text text-white px-[20px] py-[10px] rounded-[10px]'
                        whileHover={buttonHoverEffect}
                    >
                        انضم الآن
                    </motion.a>
                </motion.div>
                <motion.img 
                    src='/images/Web-Dashboard-Illustration.png' 
                    alt='Web-Dashboard-Illustration' 
                    className='w-full max-w-[1200px] rounded-[25px]'
                    variants={subtleScaleIn}
                />
            </motion.div>

            {/* Services Bar */}
            <motion.div 
                className='relative w-full py-[40px] gap-[40px] btn-gradient return grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:px-[140px]'
                initial="hidden"
                whileInView="visible"
                viewport={viewportProps}
                variants={listContainerVariants}
            >
                {services.map((service, index) => (
                    <motion.div 
                        key={index} 
                        className='flex items-center justify-center gap-[15px]'
                        variants={listItemVariants}
                    >
                        <motion.img 
                            src={service.icon} 
                            alt='service-icon' 
                            className='h-[50px] md:h-[50px]'
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={viewportProps}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        />
                        <div className='flex flex-col gap-[5px]'>
                            <motion.h3 
                                className='medium-text font-bold bg-gradient-to-r from-white to-[#AEAEAE] bg-clip-text text-transparent'
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={viewportProps}
                                transition={{ duration: 0.3, delay: index * 0.05 + 0.1 }}
                            >
                                {service.title}
                            </motion.h3>
                            <motion.p 
                                className='normal-text max-w-[160px] leading-[16px] bg-gradient-to-r from-white to-[#AEAEAE] bg-clip-text text-transparent'
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={viewportProps}
                                transition={{ duration: 0.3, delay: index * 0.05 + 0.15 }}
                            >
                                {service.desc}
                            </motion.p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Website Preview Section */}
            <motion.div 
                className='my-[30px] md:my-[100px] flex flex-col items-start md:items-center gap-[30px] px-[40px] md:px-0'
                initial="hidden"
                whileInView="visible"
                viewport={viewportProps}
                variants={subtleFadeIn}
            >
                <motion.h1 
                    className='primary-text max-w-[400px] md:text-center font-bold bg-gradient-to-r to-[#0F0F0F] from-[#888888] bg-clip-text text-transparent'
                    variants={subtleSlideUp}
                >
                    كل ما تحتاجه فى مكان واحد بخدمة متميزة
                </motion.h1>
                <motion.div 
                    className='flex items-end flex-col md:flex-row gap-[20px]'
                    variants={listContainerVariants}
                >
                    <motion.div className='flex flex-col justify-between' variants={listItemVariants}>
                        <div className='flex flex-col items-start gap-[10px]'>
                            <motion.div 
                                className='p-[10px] bg-gradient-to-r from-[#5F5DC1] to-[#242372] rounded-[10px]'
                                initial={{scale:0.8, opacity:0}}
                                whileInView={{scale:1, opacity:1}}
                                viewport={viewportProps}
                                transition={{duration:0.3}}
                            >
                                <img src='/icons/pie-chart.png' className='w-[30px]'/>
                            </motion.div>
                            <motion.h3 className='large-text text-[#5F5DC1] font-bold' variants={subtleSlideUp}>
                                تقارير ذكية وإحصائيات مباشرة
                            </motion.h3>
                            <motion.p className='medium-text leading-[20px] max-w-[220px] text-[#909090]' variants={subtleSlideUp}>
                                يقدم لك النظام تقارير لحظية توضح أداء الجيم المالي، إقبال العملاء، أكثر الخدمات طلبًا، وأكثر المدربين نشاطًا، لتتمكن من اتخاذ قرارات مبنية على بيانات حقيقية.
                            </motion.p>
                        </div>
                    </motion.div>
                    <motion.img 
                        src='/images/Illustration-statistic.png' 
                        alt='Illustration-statistic' 
                        className='w-full hidden md:inline-block max-w-[600px] rounded-[25px]'
                        variants={subtleScaleIn}
                    />
                    <motion.div className='flex flex-col justify-between gap-[20px] md:gap-[100px]' variants={listItemVariants}>
                        <div className='flex flex-col items-start gap-[10px]'>
                            <motion.div 
                                className='p-[10px] bg-gradient-to-r from-[#5F5DC1] to-[#242372] rounded-[10px]'
                                initial={{scale:0.8, opacity:0}}
                                whileInView={{scale:1, opacity:1}}
                                viewport={viewportProps}
                                transition={{duration:0.3, delay:0.1}}
                            >
                                <img src='/icons/layers.png' className='w-[30px]'/>
                            </motion.div>
                            <motion.h3 className='large-text text-[#5F5DC1] font-bold' variants={subtleSlideUp}>
                                إدارة الاشتراكات والعضويات
                            </motion.h3>
                            <motion.p className='medium-text leading-[20px] max-w-[220px] text-[#909090]' variants={subtleSlideUp}>
                                نظامنا يتيح لك متابعة وإدارة عضويات المتدربين بسهولة، من تسجيل العضو لأول مرة، مرورًا بتجديد الاشتراك، وحتى التنبيهات التلقائية قبل انتهاء الاشتراك لضمان تجربة احترافية.
                            </motion.p>
                        </div>
                        <div className='flex flex-col items-start gap-[10px]'>
                            <motion.div 
                                className='p-[10px] bg-gradient-to-r from-[#5F5DC1] to-[#242372] rounded-[10px]'
                                initial={{scale:0.8, opacity:0}}
                                whileInView={{scale:1, opacity:1}}
                                viewport={viewportProps}
                                transition={{duration:0.3, delay:0.2}}
                            >
                                <img src='/icons/trending-up.png' className='w-[30px]'/>
                            </motion.div>
                            <motion.h3 className='large-text text-[#5F5DC1] font-bold' variants={subtleSlideUp}>
                                متابعة أداء المدربين والكلاسات
                            </motion.h3>
                            <motion.p className='medium-text leading-[20px] max-w-[220px] text-[#909090]' variants={subtleSlideUp}>
                                راقب أداء المدربين ومواعيد الجلسات الجماعية بكل دقة، مع إمكانية تتبع الحضور والغياب، وتقييمات العملاء لكل مدرب وكلاس داخل الصالة.
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
                <motion.a 
                    href='#' 
                    className='hover-zoom btn-gradient return relative medium-text text-white px-[20px] py-[10px] rounded-[10px]'
                    variants={subtleSlideUp}
                    whileHover={buttonHoverEffect}
                >
                    إعرض المزيد
                </motion.a>
            </motion.div>

            {/* CTA Section */}
            <motion.div 
                className='relative w-full flex flex-col items-center justify-start gap-[15px] md:gap-[25px] py-[50px]'
                initial="hidden"
                whileInView="visible"
                viewport={viewportProps}
                variants={subtleFadeIn}
            >
                <div className='colored1-shape opacity-30'/>
                <div className='big1-shape opacity-10'/>
                <div className='small1-shape opacity-30'/>
                <motion.h1 
                    className='primary-text text-center max-w-[230px] md:max-w-none bg-gradient-to-r to-[#0F0F0F] from-[#888888] bg-clip-text text-transparent'
                    variants={subtleSlideUp}
                >
                    مستعد لتحويل صالتك الرياضية مع ترينيكس
                </motion.h1>
                <motion.p 
                    className='large-text text-center text-[#909090] max-w-[280px] md:max-w-[710px]'
                    variants={subtleSlideUp}
                    transition={{delay:0.1}}
                >
                    إنضم الآن إلى ملاك الصالات الرياضية الذين وثقوا فى ترينيكس لإدارة أعمالهم . نحن نسعى لتقديم تجربة مختلفة تسهم فى تسهيل ورقمنة العمليات الروتينية والحفاظ على بيانات العملاء . كما نسعى لتطوير الشركات عبر إضافة وسائل مساعدة حديثة ومبتكرة تهدف إلى زيادة الإنتاجية وتدريب العمالة على نظم الإدارة الحديثة كل ذلك وأكثر تجده فقط وحصرياً مع نظم ترينيكس للإدارة
                </motion.p>
                <motion.div 
                    className='mt-[20px] flex items-center gap-[10px] md:gap-[30px]'
                    variants={subtleSlideUp}
                    transition={{delay:0.2}}
                >
                    <motion.a 
                        href='#' 
                        className='hover-zoom border border-[#242372] relative medium-text text-[#242372] px-[10px] py-[8px] rounded-[10px] md:px-[20px] md:py-[10px]'
                        whileHover={buttonHoverEffect}
                    >
                        اتصل بنا ←
                    </motion.a>
                    <motion.a 
                        href='#' 
                        className='hover-zoom btn-gradient relative medium-text text-white px-[20px] py-[10px] rounded-[10px]'
                        whileHover={buttonHoverEffect}
                    >
                        الأسئلة الشائعة
                    </motion.a>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Home;


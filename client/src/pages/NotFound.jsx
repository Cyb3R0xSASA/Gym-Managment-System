/* eslint-disable no-unused-vars */
import React from 'react';
import PageModel from '../layouts/PageModel';
import { motion } from 'framer-motion';

const NotFound = () => {
    const subtleFadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const subtleSlideUp = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
    };

    const imageScaleIn = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } }
    };

    const buttonHoverEffect = { scale: 1.03 };

    const contentContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 } 
        }
    };

    return (
        <motion.div 
            className='relative'
            initial="hidden"
            animate="visible"
            variants={subtleFadeIn}
        >
            <PageModel title={''} subtitle={''} content={''}/>
            
            <picture>
                <source media="(min-width: 400px)" srcSet="/images/404.png" />
                <motion.img
                    src="/images/404-mob.png"
                    alt="404"
                    className="w-full md:w-1/2 absolute z-10 top-0 left-0 md:translate-x-1/2"
                    variants={imageScaleIn}
                />
            </picture>
            
            <motion.div 
                className='flex flex-col items-center gap-[16px]'
                variants={contentContainerVariants}
            >
                <motion.h4 
                    className='large-text text-[#272727]'
                    variants={subtleSlideUp}
                >
                    أوووبس ! شكلنا ضيعنا الصفحة
                </motion.h4>
                <motion.a 
                    href='/' 
                    className='hover-zoom btn-gradient return relative medium-text text-white px-[70px] py-[10px] rounded-[10px]'
                    variants={subtleSlideUp}
                    whileHover={buttonHoverEffect}
                    transition={{delay:0.4}}
                >
                    إرجع للصفحة الرئيسية
                </motion.a>
            </motion.div>
        </motion.div>
    );
}

export default NotFound;
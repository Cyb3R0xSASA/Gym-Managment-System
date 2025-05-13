/* eslint-disable no-unused-vars */
import React from 'react';
import PageModel from '../layouts/PageModel';
import { motion } from 'framer-motion';

const PartnersData = [
    'images/mastercard.png',
    'images/Visa.png',
    'images/Paypal.png',
    'images/microsoft 1.png',
    'images/Anytime-Fitness-Logo 2.png',
    'images/Optimum-Nutrition-Logo 1.png',
];

const Partners = () => {
    const mainContainerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const gridContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.5 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 2 } }
    };

    const viewportProps = { once: true, amount: 0.2 };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={mainContainerVariants}
        >
            <PageModel 
                title={'شركاؤنا في النجاح'}
                subtitle={'بنفتخر بشراكتنا مع نخبة من الصالات الرياضية والعلامات التجارية اللي وثقوا في منصتنا لتطوير إدارتهم وتحقيق نمو حقيقي. سوا بنبني مستقبل أقوى لقطاع اللياقة!'}
                content={
                    <motion.div 
                        className='grid grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[20px] mt-[50px]'
                        variants={gridContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportProps}
                    >
                        {PartnersData.map((item, index) => {
                            return (
                                <motion.div 
                                    key={index} 
                                    className='flex justify-center items-center w-[100px] h-[100px] md:w-[180px] md:h-[180px] bg-white rounded-[20px] card-shadow'
                                    variants={itemVariants}
                                >
                                    <motion.img 
                                        src={item} 
                                        alt={item} 
                                        initial={{opacity: 0}}
                                        animate={{opacity:1}}
                                        transition={{delay: index * 0.3 + 0.4}}
                                        className='w-3/4 object-contain'
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                }
                topG={1}
            />
        </motion.div>
    );
}

export default Partners;


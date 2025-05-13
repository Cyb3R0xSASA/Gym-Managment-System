/* eslint-disable no-unused-vars */
import React from 'react'
import PageModel from '../layouts/PageModel'
import PricingPlans from '../components/custom/PricingPlans'
import { motion } from 'framer-motion'

const Faq = () => {
    return (
        <div>
        <PageModel
            title={'إختر الخطة المناسبة لبرنامج إدارة صالتك الرياضية'} 
            subtitle={'لدينا العديد من الخطط القوية المصممة خصيصاً لتناسب متطلباتك وتحقق أقصى استفادة ممكنة من البرنامج'}
            content={
                <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="flex flex-col items-center justify-center gap-[30px]"
                >
                    <button className="px-[15px] py-[10px] border rounded-[10px] normal-text hover-zoom">أنشئ برنامج مخصص  ←</button>
                    <PricingPlans />
                </motion.div>
            }
            topG={1}
        />
        </div>
    );
};

export default Faq;
/* eslint-disable no-unused-vars */
import React from 'react'
import PageModel from '../layouts/PageModel'
import TestimonialSlider from '../components/custom/TestimonialSlider';
import { motion } from 'framer-motion'

const Faq = () => {
    return (
        <div>
        <PageModel
            title="اسمعها من اللي جربوا المنصة قبل كده!"
            subtitle="تجارب حقيقية من أصحاب صالات استفادوا من النظام وحققوا فرق كبير في شغلهم."
            content={
                <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                >
                    <TestimonialSlider />
                </motion.div>
            }
            topG={1}
        />
        </div>
    );
};

export default Faq;
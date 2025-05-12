/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ name, avatar, comment, cardVariants, customIndex }) => {
    return (
        <motion.div
        className="w-full bg-white rounded-[20px] card-shadow2 p-[20px] flex flex-col h-full break-inside-avoid-column"
        variants={cardVariants}
        custom={customIndex}
        initial="hidden"
        animate="visible"
        >
        <div className="w-full flex items-center gap-[10px] mb-4">
            <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
            <h3 className="font-semibold text-gray-900">{name}</h3>
        </div>
        <p className="text-gray-700 small-text leading-relaxed whitespace-pre-line">
            {comment}
        </p>
        </motion.div>
    );
};

export default TestimonialCard;


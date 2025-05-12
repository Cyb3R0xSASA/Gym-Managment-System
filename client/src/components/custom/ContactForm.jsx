/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form data submitted:', formData);
    };

    const inputClasses = "w-full min-w-[250px] md:min-w-[350px] p-[10px] md:p-[15px] text-right bg-white rounded-[10px] card-shadow  placeholder-gray-400 text-gray-700";

    const formContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };

    const fieldVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
        },
    };

    return (
        <div className='flex items-center gap-[20px] flex-col-reverse md:flex-row justify-center mx-auto'>
            <div className='relative w-[250px] md:w-[350px] md:h-[450px]'>
                <img src="/icons/location.png" alt="location" className='w-[30px] md:w-[40px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2' />
                <img src="/images/contact.png" alt="contact" className='rounded-[20px] card-shadow' />
            </div>
            <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-[8px] max-w-[250px] md:max-w-[350px]"
                variants={formContainerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={fieldVariants}>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="الإسم الكامل *"
                    required
                    className={inputClasses}
                />
                </motion.div>
                <motion.div variants={fieldVariants}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="البريد الإلكتروني"
                    className={inputClasses}
                />
                </motion.div>
                <motion.div variants={fieldVariants}>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=" * رقم الهاتف"
                    required
                    className={inputClasses}
                />
                </motion.div>
                <motion.div variants={fieldVariants}>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="الرسالة *"
                    required
                    rows="5"
                    className={`${inputClasses} min-h-[120px] resize-none`}
                />
                </motion.div>
                <motion.div variants={fieldVariants}>
                <motion.button
                    type="submit"
                    className="w-full px-[30px] py-[12px] rounded-[10px] cursor-pointer return relative normal-text font-semibold text-white btn-gradient focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 ease-in-out shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                >
                    إرسال
                </motion.button>
                </motion.div>
            </motion.form>
        </div>
    );
};

export default ContactForm;


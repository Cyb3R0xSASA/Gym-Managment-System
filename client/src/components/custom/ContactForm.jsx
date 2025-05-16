/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import contactFormSchema from "@/validations/contactFormSchema";
import { sendContactMessage } from "@/services/contact";
import { showError, showSuccess } from "../ui/alert";

const ContactForm = () => {
  const {
    errors,
    handleBlur,
    handleChange,
    values,
    handleSubmit,
    resetForm,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: contactFormSchema,
    onSubmit: async (data) => {
      try {
        await sendContactMessage(data);
        showSuccess("تم ارسال الرسالة بنجاح");
        resetForm();
      } catch (err) {
        showError();
      }
    },
  });

  const inputClasses =
    "w-full min-w-[250px] md:min-w-[350px] p-[10px] md:p-[15px] text-right bg-white rounded-[10px] card-shadow  placeholder-gray-400 text-gray-700";

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
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="flex items-center gap-[20px] flex-col-reverse md:flex-row justify-center mx-auto">
      <div className="relative w-[250px] md:w-[350px] md:h-[450px]">
        <img
          src="/icons/location.png"
          alt="location"
          className="w-[30px] md:w-[40px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        />
        <img
          src="/images/contact.png"
          alt="contact"
          className="rounded-[20px] card-shadow"
        />
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
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="الإسم الكامل *"
            required
            className={inputClasses}
          />
          {errors.name && touched.name && (
            <p className="text-red-500">{errors.name}</p>
          )}
        </motion.div>
        <motion.div variants={fieldVariants}>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="البريد الإلكتروني"
            className={inputClasses}
          />
          {errors.email && touched.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
        </motion.div>
        <motion.div variants={fieldVariants}>
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder=" * رقم الهاتف"
            required
            className={inputClasses}
          />
          {errors.phone && touched.phone && (
            <p className="text-red-500">{errors.phone}</p>
          )}
        </motion.div>
        <motion.div variants={fieldVariants}>
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="الرسالة *"
            required
            rows="5"
            className={`${inputClasses} min-h-[120px] resize-none`}
          />
          {errors.message && touched.message && (
            <p className="text-red-500">{errors.message}</p>
          )}
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

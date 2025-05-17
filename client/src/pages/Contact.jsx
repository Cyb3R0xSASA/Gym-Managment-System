/* eslint-disable no-unused-vars */
import React from "react";
import PageModel from "../layouts/PageModel";
import ContactForm from "../components/custom/ContactForm";
import { motion } from "framer-motion";

const Faq = () => {
  return (
    <div>
      <PageModel
        title="عندك استفسار، اقتراح، أو محتاج مساعدة؟"
        subtitle="فريقنا جاهز يرد عليك بسرعة ويهتم بكل تفاصيلك – إحنا هنا علشان نسمعك ونخلي تجربتك أفضل كل يوم."
        content={
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="mt-[30px]"
          >
            <ContactForm />
          </motion.div>
        }
        topG={1}
      />
    </div>
  );
};

export default Faq;

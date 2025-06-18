import React from "react";
import { motion } from "framer-motion";


const FormStep = ({ isActive, children }) => {
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isActive ? "block opacity-100 h-auto" : "hidden opacity-0 h-0"
      }`}
    >
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default FormStep;
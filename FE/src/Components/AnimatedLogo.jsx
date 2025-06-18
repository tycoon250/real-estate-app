import React from "react";
import { motion } from "framer-motion";

const AnimatedLogo = () => {
  return (
    <motion.div
      className="relative w-16 h-16 mb-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500 to-blue-400"
        animate={{
          rotate: [0, 10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">S</div>
    </motion.div>
  );
};

export default AnimatedLogo;
import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep
                  ? "bg-primary text-white"
                  : "bg-secondary text-foreground/60"
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                backgroundColor: index <= currentStep ? "var(--primary-color)" : "var(--secondary-color)"
              }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1, 
                ease: [0.34, 1.56, 0.64, 1] 
              }}
            >
              {index < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </motion.div>
            <motion.span
              className={`text-xs mt-1 ${
                index <= currentStep ? "text-foreground font-medium" : "text-foreground/60"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            >
              {index === 0 ? "Details" : index === 1 ? "Contact" : "Documents"}
            </motion.span>
          </div>
        ))}
      </div>
      <div className="progress-bar-track">
        <motion.div
          className="progress-bar-indicator"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
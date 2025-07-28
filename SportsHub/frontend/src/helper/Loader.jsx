import React from "react";
import { motion } from "motion/react";

const circleVariants = {
  animate: {
    scale: [1, 1.5, 1],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Loader = ({isDarkMode}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent text-white">
      <div className="flex space-x-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-6 h-6 rounded-full ${!isDarkMode ? 'bg-blue-500' : 'bg-orange-500'}`}
            variants={circleVariants}
            animate="animate"
            transition={{ delay: i * 0.2 }}
          />
        ))}
      </div>
      <p className="text-lg font-semibold tracking-widest animate-pulse">Loading...</p>
    </div>
  );
};

export default Loader;

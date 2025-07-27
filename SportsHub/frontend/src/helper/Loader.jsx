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

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="flex space-x-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-6 h-6 rounded-full bg-white"
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

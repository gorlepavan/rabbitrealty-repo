import React from 'react';
import { motion } from 'framer-motion';

const RabbitLogo = ({ 
  size = 48, 
  color = '#ff0000',
  animated = false 
}) => {
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  };

  const earAnimation = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, -5, 0, 5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={animated ? "hidden" : "visible"}
      animate="visible"
    >
      {/* Body */}
      <motion.path
        d="M25 40c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z"
        fill={animated ? "none" : color}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        variants={animated ? pathVariants : {}}
      />
      
      {/* Left Ear */}
      <motion.path
        d="M17 22c-3-5-3-15-3-15s7 2 9 7"
        fill={animated ? "none" : color}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        variants={animated ? pathVariants : {}}
        initial={animated ? "initial" : false}
        animate={animated ? "animate" : false}
        custom={0}
      />
      
      {/* Right Ear */}
      <motion.path
        d="M33 22c3-5 3-15 3-15s-7 2-9 7"
        fill={animated ? "none" : color}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        variants={animated ? pathVariants : {}}
        initial={animated ? "initial" : false}
        animate={animated ? "animate" : false}
        custom={1}
      />
      
      {/* Eyes */}
      <motion.circle
        cx="20"
        cy="28"
        r="1.5"
        fill={animated ? "none" : "#000"}
        stroke="#000"
        strokeWidth="1"
        variants={animated ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 1.5 } }
        } : {}}
      />
      
      <motion.circle
        cx="30"
        cy="28"
        r="1.5"
        fill={animated ? "none" : "#000"}
        stroke="#000"
        strokeWidth="1"
        variants={animated ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 1.5 } }
        } : {}}
      />
      
      {/* Nose */}
      <motion.path
        d="M25 30a2 2 0 100 4 2 2 0 000-4z"
        fill={animated ? "none" : "#000"}
        stroke="#000"
        strokeWidth="1"
        variants={animated ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 1.8 } }
        } : {}}
      />
      
      {/* Whiskers */}
      <motion.path
        d="M23 33l-8 2M23 34l-8 0M23 35l-8-2"
        stroke="#000"
        strokeWidth="0.5"
        variants={animated ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 2 } }
        } : {}}
      />
      
      <motion.path
        d="M27 33l8 2M27 34l8 0M27 35l8-2"
        stroke="#000"
        strokeWidth="0.5"
        variants={animated ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 2 } }
        } : {}}
      />
    </motion.svg>
  );
};

export default RabbitLogo; 
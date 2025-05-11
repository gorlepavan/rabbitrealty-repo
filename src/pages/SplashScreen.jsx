import React from 'react';
import { motion } from 'framer-motion';
import RabbitLogo from '../components/common/RabbitLogo';

const SplashScreen = () => {
  const containerVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren'
      }
    },
    exit: {
      opacity: 0,
      transition: { 
        duration: 0.5,
        when: 'afterChildren'
      }
    }
  };

  const textVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5,
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  // Background animation with floating shapes
  const floatingShapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 2
  }));

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-secondary-900 relative overflow-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Animated background elements */}
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full bg-primary-600 opacity-20"
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -30, 20, -10, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}
      
      <div className="z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            rotate: [0, -10, 0, 10, 0]
          }}
          transition={{ 
            duration: 1.5,
            times: [0, 0.5, 1],
            ease: "easeInOut" 
          }}
        >
          <RabbitLogo size={120} color="#ff0000" animated={true} />
        </motion.div>
        
        <motion.h1
          className="font-heading text-4xl font-bold text-white mt-8"
          variants={textVariants}
        >
          Rabbit <span className="text-primary-500">Realty</span>
        </motion.h1>
        
        <motion.p
          className="text-gray-400 mt-2"
          variants={textVariants}
        >
          Premium Real Estate Solutions
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SplashScreen; 
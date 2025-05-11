import React from 'react';
import { motion } from 'framer-motion';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

const PageLayout = ({ children, title }) => {
  // Update document title if provided
  React.useEffect(() => {
    if (title) {
      document.title = `${title} | Rabbit Realty`;
    } else {
      document.title = 'Rabbit Realty';
    }
  }, [title]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main 
        className="flex-grow"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default PageLayout; 
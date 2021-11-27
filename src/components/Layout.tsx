import React from 'react';
import { motion } from 'framer-motion';

// @ts-ignore
const Layout = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default Layout;

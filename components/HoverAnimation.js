'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export const HoverAnimation = ({
  id,
  layoutId,
  children,
  className = '',
  backgroundClassName = 'inset-0'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      id={id}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={className}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            key="hover-background"
            layoutId={layoutId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`bg-hover absolute -z-1 rounded-lg ${backgroundClassName}`}
          />
        )}
      </AnimatePresence>
      {children}
    </motion.span>
  );
};

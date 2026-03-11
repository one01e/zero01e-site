"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

type FadeInUpProps = MotionProps & {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function FadeInUp({ children, delay = 0, className = "", ...props }: FadeInUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

type StaggerGridProps = MotionProps & {
  children: ReactNode;
  className?: string;
};

export function StaggerGrid({ children, className = "", ...props }: StaggerGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = MotionProps & {
  children: ReactNode;
  className?: string;
};

export function StaggerItem({ children, className = "", ...props }: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}

import type { Variants } from 'framer-motion'

export const listItensDelay: Variants = {
    hidden: { opacity: 0, y: 20 },
    exit: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 25,
      },
    },
  };


export const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9 },
  },
}

const listItensDelayMenu = 0.1

export const menuVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
      staggerChildren: listItensDelayMenu,
    },
  },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
}

export const formVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 }
}

export const DivVariantes: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 }
}
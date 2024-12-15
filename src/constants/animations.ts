import { Variants } from 'framer-motion';

export const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

export const FADE_IN_UP: Variants = {
  initial: { 
    opacity: 0,
    y: 20,
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: SPRING_TRANSITION,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

export const STAGGER_CHILDREN: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const HOVER_SCALE = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

export const TAP_SCALE = {
  scale: 0.95,
};

export const GRADIENT_ANIMATION = {
  animate: {
    background: [
      'radial-gradient(circle at 0% 0%, rgba(234, 179, 8, 0.15) 0%, rgba(11, 17, 32, 0) 50%)',
      'radial-gradient(circle at 100% 100%, rgba(234, 179, 8, 0.15) 0%, rgba(11, 17, 32, 0) 50%)',
      'radial-gradient(circle at 0% 100%, rgba(234, 179, 8, 0.15) 0%, rgba(11, 17, 32, 0) 50%)',
      'radial-gradient(circle at 100% 0%, rgba(234, 179, 8, 0.15) 0%, rgba(11, 17, 32, 0) 50%)',
    ],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

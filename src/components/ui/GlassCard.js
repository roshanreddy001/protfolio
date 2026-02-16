'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import clsx from 'clsx';
import styles from './GlassCard.module.css'; // Will create this later

const GlassCard = ({ children, className, hoverEffect = true }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e) => {
    if (!ref.current || !hoverEffect) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={clsx(styles.cardContainer, className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className={styles.glassCard}
        style={{
          rotateX: hoverEffect ? rotateX : 0,
          rotateY: hoverEffect ? rotateY : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <div className={styles.highlight} />
        <div className={styles.content}>{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default GlassCard;

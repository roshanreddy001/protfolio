'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

export default function Button({ children, href, variant = 'primary', className, ...props }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const Component = href ? motion.a : motion.button;

    return (
        <Component
            ref={ref}
            href={href}
            className={clsx(styles.button, styles[variant], className)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            {...props}
        >
            <span className={styles.content}>{children}</span>
            <div className={styles.glow} />
        </Component>
    );
}

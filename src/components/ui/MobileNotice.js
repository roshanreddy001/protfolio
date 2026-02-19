'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Monitor } from 'lucide-react';
import styles from './MobileNotice.module.css';

export default function MobileNotice() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            // Check if width is less than 1024px (Tablet/Mobile)
            if (window.innerWidth < 1024) {
                // Check if already dismissed in this session
                const dismissed = sessionStorage.getItem('mobile-notice-dismissed');
                if (!dismissed) {
                    setIsVisible(true);
                }
            }
        };

        checkDevice();
        // Optional: Listen for resize
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    const dismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('mobile-notice-dismissed', 'true');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.notice}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                >
                    <div className={styles.iconWrapper}>
                        <Monitor size={20} color="var(--accent)" />
                    </div>
                    <div className={styles.content}>
                        <p className={styles.text}>
                            <strong>Best Experience on Desktop</strong>
                            <br />
                            For the full cinematic effect, please view on a larger screen.
                        </p>
                    </div>
                    <button onClick={dismiss} className={styles.closeBtn}>
                        <X size={18} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

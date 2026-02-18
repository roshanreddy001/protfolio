'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
import styles from './Hero.module.css';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
    const { scrollY } = useScroll();

    // Fade IN quickly (0-100), STAY visible (100-600), then Fade OUT (600-800)
    const contentOpacity = useTransform(scrollY, [0, 100, 600, 800], [0, 1, 1, 0]);
    const contentY = useTransform(scrollY, [0, 100, 600, 800], [50, 0, 0, -50]);
    const contentScale = useTransform(scrollY, [0, 100, 600, 800], [0.9, 1, 1, 0.9]);

    // Fade OUT the scroll indicator quickly
    const indicatorOpacity = useTransform(scrollY, [0, 50], [1, 0]);

    return (
        <section className={styles.hero}>
            <div className="container">
                <motion.div
                    className={styles.content}
                    style={{
                        opacity: contentOpacity,
                        y: contentY,
                        scale: contentScale
                    }}
                >
                    <div className={styles.wrapper}>
                        <h2 className={styles.title}>
                            Full Stack Developer
                        </h2>

                        <h1 className={`gradient-text ${styles.name}`}>
                            Roshna Reddy Basava
                        </h1>

                        <p className={styles.tagline}>
                            Building scalable web applications and intelligent systems using modern web technologies and machine learning.
                        </p>

                        <div className={styles.actions}>
                            <Button
                                href="#projects"
                                variant="primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (window.lenis) {
                                        window.lenis.scrollTo('#projects', { duration: 5 });
                                    } else {
                                        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                View Work
                            </Button>
                            <Button
                                href="#contact"
                                variant="primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (window.lenis) {
                                        window.lenis.scrollTo('#contact', { duration: 5 });
                                    } else {
                                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                Contact Me
                            </Button>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.scrollIndicator}
                    style={{ opacity: indicatorOpacity }}
                    initial={{ y: 0 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span>Scroll to Enter</span>
                    <ArrowDown size={20} color="var(--accent)" />
                </motion.div>
            </div>
        </section>
    );
}

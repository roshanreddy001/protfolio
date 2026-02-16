'use client';

import { motion } from 'framer-motion';
import styles from './AboutMe.module.css';

export default function AboutMe() {
    return (
        <section id="about-me" className={styles.section}>
            <div className="container">
                <div className={styles.content}>
                    <motion.h2
                        className={`gradient-text ${styles.heading}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        About Me
                    </motion.h2>

                    <motion.div
                        className={styles.textWrapper}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className={styles.text}>
                            Full Stack Developer | Machine Learning Enthusiast
                        </p>
                        <p className={styles.text}>
                            Computer Science graduate with hands-on experience in MERN stack development, database systems (SQL & MongoDB), and implementation of Machine Learning and Deep Learning algorithms.
                            Focused on building practical, scalable, and performance-driven applications.

                            My focus is on solving real-world problems through code, whether it&apos;s optimizing
                            neural networks or crafting pixel-perfect user interfaces. I thrive in varying environments
                            where performance and usability are paramount.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

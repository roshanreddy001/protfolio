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
                            Full Stack Developer | AI Enthusiast
                        </p>
                        <p className={styles.text}>
                            I am a passionate developer building full stack applications powered by intelligent systems. Focusing on MERN stack development, database architecture, and Machine Learning concepts, I strive to build scalable platforms that merge software engineering with AI-driven ideas.
                        </p>
                        <p className={styles.text}>
                            From exploring LLM integration in real-world applications to developing responsive user interfaces and efficient backend systems, I approach every project with curiosity, clarity, and a desire to learn.

                            My goal is to grow as an engineer and contribute to systems that solve meaningful real-world problems.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

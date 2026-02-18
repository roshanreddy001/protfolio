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
                            Full Stack Developer | AI Systems Builder
                        </p>
                        <p className={styles.text}>
                            I design and develop high-performance full stack applications powered by intelligent systems. With hands-on experience in MERN stack development, database architecture, and Machine Learning implementation, I focus on building scalable platforms that merge software engineering with AI-driven decision making.
                        </p>
                        <p className={styles.text}>
                            From integrating existing LLMs into real-world applications to developing responsive user interfaces and optimized backend systems, I approach every project with performance, clarity, and long-term scalability in mind.

                            My goal is to engineer systems that learn, adapt, and solve meaningful real-world problems.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

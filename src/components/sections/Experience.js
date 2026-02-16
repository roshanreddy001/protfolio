'use client';

import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const timeline = [
    {
        year: "2025 - Present",
        title: "Senior Full Stack Engineer",
        company: "Tech Innovations Inc.", // Placeholder
        description: "Leading the development of scalable cloud-native applications using Next.js and AWS."
    },
    {
        year: "2023 - 2025",
        title: "Machine Learning Engineer",
        company: "DataDynamics", // Placeholder
        description: "Implemented deep learning models for computer vision and NLP tasks."
    }
];

export default function Experience() {
    return (
        <section id="experience" className={styles.section}>
            <div className="container">
                <h2 className={`gradient-text ${styles.heading}`}>Experience</h2>

                <div className={styles.timeline}>
                    {timeline.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.item}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className={styles.marker}></div>
                            <div className={styles.content}>
                                <span className={styles.year}>{item.year}</span>
                                <h3 className={styles.title}>{item.title}</h3>
                                <span className={styles.company}>{item.company}</span>
                                <p className={styles.description}>{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

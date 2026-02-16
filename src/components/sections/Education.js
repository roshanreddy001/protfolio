'use client';

import { motion } from 'framer-motion';
import styles from './Education.module.css';

const education = [
    {
        degree: "B.Tech in Computer Science",
        institution: "University of Technology", // Placeholder
        year: "2021 - 2025",
        details: "Specializing in AI/ML. GPA: 3.8/4.0. Relevant coursework: Data Structures, Algorithms, Deep Learning."
    },
    {
        degree: "High School Diploma",
        institution: "City High School",
        year: "2019 - 2021",
        details: "Major in Science and Mathematics."
    }
];

export default function Education() {
    return (
        <section id="education" className={styles.section}>
            <div className="container">
                <h2 className={`gradient-text ${styles.heading}`}>Education</h2>

                <div className={styles.list}>
                    {education.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.item}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={styles.header}>
                                <h3 className={styles.degree}>{item.degree}</h3>
                                <span className={styles.year}>{item.year}</span>
                            </div>
                            <h4 className={styles.institution}>{item.institution}</h4>
                            <p className={styles.details}>{item.details}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

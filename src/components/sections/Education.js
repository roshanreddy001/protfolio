'use client';

import { motion } from 'framer-motion';
import styles from './Education.module.css';

const education = [
    {
        degree: "INTEGRATED M.Tech in Computer Science",
        institution: "Vellore Institute of Technology", // Placeholder
        year: "2023 - 2028",
        details: "Specializing in AI/ML. GPA: 8.61 Relevant coursework: Data Structure & Algorithms,Web Development, Machine Learning, Deep Learning."
    },
    {
        degree: "Intermediate(MPC)",
        institution: "Srichaitanya Junior College",
        year: "2021 - 2023",
        details: "Percentage: 89%"
    },
    {
        degree: "10th Grade",
        institution: "bhashyam public School",
        year: "2021",
        details: "Percentage: 100%"
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

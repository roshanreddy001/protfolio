'use client';

import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const skills = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 95 },
    { name: 'Node.js', level: 85 },
    { name: 'express', level: 80 },
    { name: 'Python', level: 80 },
    { name: 'TensorFlow', level: 80 },
];

const SkillBar = ({ name, level, index }) => {
    return (
        <div className={styles.skillContainer}>
            <div className={styles.skillHeader}>
                <span>{name}</span>
                <span className={styles.percentage}>{level}%</span>
            </div>
            <div className={styles.track}>
                <motion.div
                    className={styles.bar}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}

export default function Skills() {
    return (
        <section id="skills" className={styles.section}>
            <div className="container">
                <h2 className={`gradient-text ${styles.heading}`}>Technical Expertise</h2>
                <div className={styles.grid}>
                    {skills.map((skill, index) => (
                        <SkillBar key={skill.name} {...skill} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

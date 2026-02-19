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

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function Skills() {
    return (
        <section id="skills" className={styles.section}>
            <div className="container">
                <motion.h2
                    className={`gradient-text ${styles.heading}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Technical Expertise
                </motion.h2>
                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {skills.map((skill, index) => (
                        <motion.div key={skill.name} variants={itemVariants}>
                            <div className={styles.skillContainer}>
                                <div className={styles.skillHeader}>
                                    <span>{skill.name}</span>
                                    <span className={styles.percentage}>{skill.level}%</span>
                                </div>
                                <div className={styles.track}>
                                    <motion.div
                                        className={styles.bar}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

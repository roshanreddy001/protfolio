'use client';

import { motion } from 'framer-motion';
import { Layout, Server, Database, BrainCircuit } from 'lucide-react';
import styles from './Skills.module.css';

const categories = [
    {
        title: 'Frontend',
        icon: <Layout size={28} className={styles.categoryIcon} />,
        skills: [
            { name: 'HTML5', icon: '/icons/HTML.png', tagline: 'Semantic web structure' },
            { name: 'CSS3', icon: '/icons/CSS.png', tagline: 'Styling & Layouts' },
            { name: 'JavaScript', icon: '/icons/JS.png', tagline: 'Dynamic UI logic' },
            { name: 'React', icon: '/icons/React.svg', tagline: 'Component logic' },
            { name: 'Bootstrap', icon: '/icons/BOOTSTRAP.png', tagline: 'Responsive design' }
        ]
    },
    {
        title: 'Backend',
        icon: <Server size={28} className={styles.categoryIcon} />,
        skills: [
            { name: 'Node.js', icon: '/icons/Node.svg', tagline: 'JS Runtime' },
            { name: 'Express', icon: '/icons/Express.svg', tagline: 'Web framework' },
            { name: 'Spring Boot', icon: '/icons/SPRINGBOOT.png', tagline: 'Backend APIs' },
            { name: 'Hibernate', icon: '/icons/hibernate.png', tagline: 'ORM mapping' }
        ]
    },
    {
        title: 'Database',
        icon: <Database size={28} className={styles.categoryIcon} />,
        skills: [
            { name: 'MySQL', icon: '/icons/MySQL.png', tagline: 'Relational database' },
            { name: 'MongoDB', icon: '/icons/MongoDB.png', tagline: 'NoSQL database' },
            { name: 'PostgreSQL', icon: '/icons/SQL.svg', tagline: 'Advanced SQL' }
        ]
    }
    /*
    ,{
        title: 'AI / ML',
        icon: <BrainCircuit size={28} className={styles.categoryIcon} />,
        skills: [
            { name: 'Python', icon: '/icons/Python.svg', tagline: 'Data scripting' },
            { name: 'TensorFlow', icon: '/icons/TensorFlow.svg', tagline: 'Deep learning rules' },
            { name: 'NumPy', icon: '/icons/NumPy.svg', tagline: 'Array computation' },
            { name: 'Matplotlib', icon: '/icons/Matplotlib.svg', tagline: 'Data visualization' },
            { name: 'Python DS', icon: '/icons/Python.svg', tagline: 'Data Science' },
        ]
    }
    */
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
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
                    {categories.map((category) => {
                        return (
                            <motion.div key={category.title} variants={itemVariants} className={styles.categoryContainer}>
                                <div className={styles.categoryHeader}>
                                    {category.icon}
                                    <span className={styles.categoryTitle}>{category.title}</span>
                                </div>
                                <div className={styles.marqueeContainer}>
                                    <div className={styles.marqueeContent}>
                                        {category.skills.map((skill, idx) => (
                                            <div key={`${skill.name}-${idx}`} className={styles.skillCard} data-tagline={skill.tagline}>
                                                <div className={styles.skillIconWrapper}>
                                                    <img 
                                                        src={skill.icon} 
                                                        alt={skill.name} 
                                                        className={styles.skillIcon} 
                                                    />
                                                </div>
                                                <span className={styles.skillName}>{skill.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

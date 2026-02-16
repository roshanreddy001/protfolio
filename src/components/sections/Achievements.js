'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { Award, Code, Cpu } from 'lucide-react'; // Example icons
import styles from './Achievements.module.css';

const achievements = [
    {
        title: "Hackathon Winner",
        description: "1st Place in National AI Hackathon 2024 for 'Project Vision'.",
        icon: <Award size={32} color="var(--accent)" />
    },
    {
        title: "AWS Certified",
        description: "AWS Certified Solutions Architect – Associate.",
        icon: <Cpu size={32} color="var(--accent)" />
    },
    {
        title: "CodeRank 5 Star",
        description: "Top 1% in competitive programming on CodeRank.",
        icon: <Code size={32} color="var(--accent)" />
    }
];

export default function Achievements() {
    return (
        <section id="achievements" className={styles.section}>
            <div className="container">
                <h2 className={`gradient-text ${styles.heading}`}>Achievements</h2>

                <div className={styles.grid}>
                    {achievements.map((item, index) => (
                        <GlassCard key={index} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                {item.icon}
                            </div>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.description}>{item.description}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

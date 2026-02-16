'use client';

import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { Github, ExternalLink } from 'lucide-react';
import styles from './Projects.module.css';

const projects = [
    {
        title: "StreakCounter", // Placeholder
        date: "2025",
        description: "A high-performance AI integration platform building next-gen neural interfaces.",
        tech: ["Next.js", "TensorFlow", "WebGL"],
        link: "#",
        github: "#"
    },
    {
        title: "Neon Nexus", // Placeholder
        date: "2024",
        description: "Cyberpunk aesthetic e-commerce dashboard with real-time analytics.",
        tech: ["React", "Three.js", "Firebase"],
        link: "#",
        github: "#"
    },
    {
        title: "Quantum Flow", // Placeholder
        date: "2024",
        description: "Generative art visualizer using complex algorithms and fluid dynamics.",
        tech: ["Canvas API", "GLSL", "Node.js"],
        link: "#",
        github: "#"
    }
];

export default function Projects() {
    return (
        <section id="projects" className={styles.section}>
            <div className="container">
                <h2 className={styles.heading}>Selected Works</h2>

                <div className={styles.grid}>
                    {projects.map((project, index) => (
                        <GlassCard key={index} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className={styles.date}>{project.date}</span>
                                <div className={styles.links}>
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="Github">
                                        <Github size={20} />
                                    </a>
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>

                            <h3 className={styles.title}>{project.title}</h3>
                            <p className={styles.description}>{project.description}</p>

                            <div className={styles.tags}>
                                {project.tech.map(t => (
                                    <span key={t} className={styles.tag}>{t}</span>
                                ))}
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';

import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { Github, ExternalLink } from 'lucide-react';
import styles from './Projects.module.css';

const projects = [
    {
        title: "StreakCounter",
        date: "2025",
        description: "A high-performance academic streak tracking platform designed to monitor daily consistency from day one to the present. Built with a fully responsive UI, it stores structured progress data in MongoDB and generates personalized academic roadmaps based on user data limitations. Integrated with existing LLMs to intelligently guide goal tracking, milestone planning, and long-term productivity optimization.",
        tech: ["React", "HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "LLM Integration"],
        link: "#",
        github: "#"
    },
    {
        title: "Gesture2Speak",
        date: "2024",
        description: "An AI-powered gesture-to-speech translation system that converts hand gestures into real-time spoken output supporting 30+ languages. Built using a lightweight TensorFlow CDN model for efficient browser-based inference, with a Flask backend handling processing logic. Integrated with existing LLMs to enhance contextual accuracy, making communication seamless and accessible.",
        tech: ["TensorFlow Lite (CDN)", "Flask", "Python", "LLM Integration", "JavaScript", "Speech Synthesis API"],
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

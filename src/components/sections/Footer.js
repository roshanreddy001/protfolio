'use client';

import { Github, Linkedin, Mail, FileText, Heart } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.glassBackground} />

            <div className={`container ${styles.container}`}>
                <div className={styles.content}>

                    {/* Brand & Quote */}
                    <div className={styles.brandSection}>
                        <h3 className={styles.logo}>Roshan Reddy Basava</h3>
                        <p className={styles.quote}>
                            "Building the future, one pixel at a time."
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className={styles.linkSection}>
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                            <span>GitHub</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/roshan-reddy-basava-54b449322"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                            <span>LinkedIn</span>
                        </a>
                        <a
                            href="mailto:reddyroshan976@gmail.com"
                            className={styles.socialLink}
                            aria-label="Email"
                        >
                            <Mail size={20} />
                            <span>Email</span>
                        </a>
                        <a
                            href="/resume.pdf"
                            download
                            className={`${styles.socialLink} ${styles.resumeLink}`}
                            aria-label="Download Resume"
                        >
                            <FileText size={20} />
                            <span>Resume</span>
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Roshna Reddy Basava. All rights reserved.
                    </p>
                    <p className={styles.madeWith}>
                        Made with <Heart size={14} className={styles.heart} />
                    </p>
                </div>
            </div>
        </footer>
    );
}
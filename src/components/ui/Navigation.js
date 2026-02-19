'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import styles from './Navigation.module.css';

const navLinks = [
    { name: 'About', href: '#about-me' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    // Body Scroll Lock
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    // Active Section Tracker using Intersection Observer
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Active when element is in middle of viewport
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        navLinks.forEach(link => {
            const section = document.querySelector(link.href);
            if (section) observer.observe(section);
        });

        // Also observe home
        const homeSection = document.querySelector('#home');
        if (homeSection) observer.observe(homeSection);

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
            setActiveSection(href.replace('#', ''));
        }
    };

    return (
        <>
            <motion.nav
                className={clsx(styles.nav, { [styles.scrolled]: isScrolled })}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={styles.navContainer}>
                    <div
                        className={styles.logo}
                        onClick={(e) => scrollToSection(e, '#home')}
                    >
                        Roshan
                    </div>

                    <div className={styles.desktopMenu}>
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace('#', '');
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className={clsx(styles.navLink, { [styles.activeLink]: isActive })}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                    </div>

                    <button
                        className={styles.mobileToggle}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <motion.div
                className={clsx(styles.mobileMenu, { [styles.open]: mobileMenuOpen })}
                initial={false}
                animate={mobileMenuOpen ? "open" : "closed"}
                variants={{
                    open: {
                        y: "0%",
                        transition: { type: "spring", stiffness: 300, damping: 30, staggerChildren: 0.07, delayChildren: 0.2 }
                    },
                    closed: {
                        y: "-100%",
                        transition: { type: "spring", stiffness: 300, damping: 30, staggerChildren: 0.05, staggerDirection: -1 }
                    }
                }}
            >
                <button
                    className={styles.closeToggle}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <X size={32} />
                </button>

                <motion.div className={styles.mobileLinks}>
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className={styles.mobileLink}
                            variants={{
                                open: { opacity: 1, y: 0 },
                                closed: { opacity: 0, y: 50 }
                            }}
                        >
                            <span className={styles.linkIndex}>0{index + 1}</span>
                            <span className={styles.linkText}>{link.name}</span>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Decorative Footer in Menu */}
                <motion.div
                    className={styles.menuFooter}
                    variants={{
                        open: { opacity: 1, transition: { delay: 0.5 } },
                        closed: { opacity: 0 }
                    }}
                >
                    <p>Designed by Roshan</p>
                </motion.div>
            </motion.div>
        </>
    );
}

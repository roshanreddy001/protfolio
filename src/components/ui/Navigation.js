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
    //{ name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            // Use lenis if available globally, or native scroll
            // Since we wrapped layout with Lenis (via useScroll hook in page.js, wait... 
            // lenis instance is local to page.js? No, ideally it should be global context or window based if we want nav to control it.
            // But Lenis hijacks native scroll, so element.scrollIntoView should work if Lenis is configured to intercept it, 
            // or we use lenis instance to scroll. 
            // For now, native scrollIntoView usually works with Lenis in standard config.
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    return (
        <>
            <motion.nav
                className={clsx(styles.nav, { [styles.scrolled]: isScrolled })}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={clsx("container", styles.navContainer)}>
                    <div className={styles.logo}>
                        Roshan <span className={styles.accent}></span>
                    </div>

                    <div className={styles.desktopMenu}>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={styles.navLink}
                            >
                                {link.name}
                                <span className={styles.linkUnderline} />
                            </a>
                        ))}
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
            <div className={clsx(styles.mobileMenu, { [styles.open]: mobileMenuOpen })}>
                <motion.div
                    className={styles.mobileLinks}
                    initial="closed"
                    animate={mobileMenuOpen ? "open" : "closed"}
                    variants={{
                        open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                        closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                    }}
                >
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className={styles.mobileLink}
                            variants={{
                                open: { opacity: 1, y: 0 },
                                closed: { opacity: 0, y: 20 }
                            }}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </>
    );
}

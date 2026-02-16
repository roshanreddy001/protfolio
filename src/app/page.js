'use client';

import { useSmoothScroll } from '@/hooks/useScroll';
import FrameSequence from '@/components/FrameSequence';
import Navigation from '@/components/ui/Navigation';
import Hero from '@/components/sections/Hero';
import AboutMe from '@/components/sections/AboutMe';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';
import styles from './page.module.css';

export default function Home() {
    useSmoothScroll();

    return (
        <main className={styles.main}>
            <Navigation />
            <FrameSequence />

            <div className={styles.contentWrapper}>

                {/* 1. Hero / Introduction */}
                <Hero />

                {/* Spacer for Frame Animation Visibility - Increased to let Hero stay visible */}
                <div style={{ height: '120vh' }}></div>

                {/* 2. About Me */}
                <AboutMe />

                {/* 3. Technical Skills */}
                <Skills />

                {/* 4. Projects */}
                <Projects />

                {/* 5. Experience / Internship */}
                <Experience />

                {/* 6. Education */}
                <Education />

                {/* 7. Achievements / Certifications */}
                <Achievements />

                {/* 8. Technical Expertise (Skipped for now) */}
                {/* 9. Blog (Skipped for now) */}

                {/* 10. Contact */}
                <Contact />

            </div>
        </main>
    );
}

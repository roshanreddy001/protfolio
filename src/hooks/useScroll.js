'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export const useSmoothScroll = () => {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 2.0, // Slower, heavier feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 0.8, // Slightly resistant to feel "heavy"
            smoothTouch: true, // Enable for touch devices too
            touchMultiplier: 1.5,
        });

        lenisRef.current = lenis;
        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            window.lenis = null;
        };
    }, []);

    return lenisRef;
};

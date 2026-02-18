'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useSpring, motion, useMotionValueEvent } from 'framer-motion';
import styles from './FrameSequence.module.css';

const frameCount = 160;

export default function FrameSequence() {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const { scrollYProgress } = useScroll(); // Global scroll progress

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // console.log("Scroll Progress:", latest);
    });


    // Smooth out the scroll progress for smoother animation frame transitions
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001
    });

    // Map scroll progress (0 to 1) to frame index (0 to 159)
    // We want the sequence to play over the entire page or a specific section?
    // User says "Frame animation must be scroll-controlled".
    // Usually this means the hero section or the background of the whole site.
    // "Hero section with frame-sequence animation background" -> implies it might be just Hero?
    // But also "Background must have soft radial gradient blending... Frame animation must be scroll-controlled".
    // If 160 frames, likely it covers a good amount of scroll.
    // Let's assume it covers the full height or a tracked section. 
    // For now, mapping to global scrollYProgress is easiest if the sequence is the main background.

    const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const imgs = [];
            const promises = [];


            // Use main frames for all devices
            const basePath = '/frames_optimized';
            const extension = 'webp';

            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = `${basePath}/frame_${i.toString().padStart(4, '0')}.${extension}`;
                    img.onload = () => {
                        setLoadingProgress(prev => prev + (1 / frameCount) * 100);
                        resolve(img);
                    };
                    img.onerror = reject;
                    imgs[i - 1] = img; // Ensure order
                });
                promises.push(promise);
            }

            try {
                await Promise.all(promises);
                setImages(imgs);
                setLoaded(true);
            } catch (err) {
                console.error("Failed to load frames", err);
            }
        };

        loadImages();
    }, []);

    const renderFrame = (index) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext('2d');

        // Maintain aspect ratio cover
        const img = images[index];
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgRatio;
            drawHeight = canvas.height;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    useEffect(() => {
        if (!loaded || !canvasRef.current) return;

        const unsubscribe = frameIndex.on("change", (latest) => {
            const index = Math.floor(latest);
            requestAnimationFrame(() => renderFrame(index));
        });

        // Initial render
        renderFrame(0);

        return () => unsubscribe();
    }, [loaded, frameIndex]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Re-render current frame
                const currentIndex = Math.floor(frameIndex.get());
                if (images.length > 0) renderFrame(currentIndex);
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size
        return () => window.removeEventListener('resize', handleResize);
    }, [loaded, images]);

    if (!loaded) {
        return (
            <div className={styles.loader}>
                <div className={styles.spinner}></div>
                <p>Loading Experience {Math.round(loadingProgress)}%</p>
            </div>
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className={styles.canvas}
        />
    );
}

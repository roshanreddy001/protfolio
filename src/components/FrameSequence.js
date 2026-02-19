'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useSpring, motion, useMotionValueEvent } from 'framer-motion';
import styles from './FrameSequence.module.css';

const frameCount = 240;

export default function FrameSequence() {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0); // For background loading
    const [welcomeProgress, setWelcomeProgress] = useState(0); // For introduction screen

    // Simulate loading progress for the welcome screen
    useEffect(() => {
        if (loaded) return;

        const interval = setInterval(() => {
            setWelcomeProgress(prev => {
                if (prev >= 99) {
                    clearInterval(interval);
                    return 99;
                }
                // Check if we are close to the end, slow down
                const increment = prev > 80 ? 0.5 : 2;
                return Math.min(prev + increment, 99);
            });
        }, 60); // Updates every 60ms => ~3s to reach 99

        return () => clearInterval(interval);
    }, [loaded]);

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
            const basePath = '/frames_optimized';
            const extension = 'png';

            // Priority Batch: First 50 frames (enough for initial scroll)
            const priorityCount = 50;

            // Helper to load a single image
            const loadImage = (index) => new Promise((resolve, reject) => {
                const img = new Image();
                img.src = `${basePath}/frame_${index.toString().padStart(4, '0')}.${extension}`;
                img.onload = () => resolve(img);
                img.onerror = reject;
                imgs[index] = img;
            });

            // 1. Load Priority Batch
            for (let i = 0; i < priorityCount; i++) {
                promises.push(loadImage(i));
            }

            try {
                // Wait for Priority frames + Minimum Delay
                await Promise.all([
                    Promise.all(promises),
                    new Promise(resolve => setTimeout(resolve, 3000))
                ]);

                setImages([...imgs]); // Set initial images
                setWelcomeProgress(100); // Complete visual progress
                setTimeout(() => setLoaded(true), 500); // Small delay to show 100%

                // 2. Load Remaining Frames in Batches
                const batchSize = 20;
                for (let i = priorityCount; i < frameCount; i += batchSize) {
                    const batchPromises = [];
                    const end = Math.min(i + batchSize, frameCount);

                    for (let j = i; j < end; j++) {
                        batchPromises.push(
                            loadImage(j).catch(e => {
                                console.warn(`Failed frame ${j}`, e);
                                return null;
                            }) // Catch errors to keep batch moving
                        );
                    }

                    await Promise.all(batchPromises);
                    setImages([...imgs]); // Update state incrementally
                    setLoadingProgress(Math.round((end / frameCount) * 100));
                    console.log(`Loaded frames ${i} to ${end}`);
                }

            } catch (err) {
                console.error("Failed to load frames", err);
                setLoaded(true); // Fallback: unlock anyway on error
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
    }, [loaded, frameIndex, images]);

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
                <motion.div
                    className={styles.welcomeContainer}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className={styles.welcomeText}>ARCHITECTING DIGITAL EXCELLENCE</h1>
                    <motion.p
                        className={styles.welcomeSubtext}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Roshan Reddy Basava | Full Stack & AI Engineer
                    </motion.p>

                    {/* Subtle Loading Indicator */}
                    <motion.div
                        className={styles.loadingIndicator}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 1 }}
                    >
                        Initializing... {Math.floor(welcomeProgress)}%
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <canvas
                ref={canvasRef}
                className={styles.canvas}
            />

            {/* Persistent Background Loader - Shows while remaining frames load */}
            {loadingProgress < 100 && (
                <motion.div
                    className={styles.persistentIndicator}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.spinner}></div>
                    Optimizing... {loadingProgress}%
                </motion.div>
            )}
        </>
    );
}

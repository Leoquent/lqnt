'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Tracks scroll direction and whether user has scrolled past the hero.
 * - Header stays visible in the hero zone (0–100vh).
 * - After hero: hides on scroll-down, reappears on scroll-up.
 */
export function useScrollDirection(threshold = 10) {
    const [isVisible, setIsVisible] = useState(true);
    const [isPastHero, setIsPastHero] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        let ticking = false;

        const update = () => {
            const currentY = window.scrollY;
            const heroHeight = window.innerHeight;

            setIsPastHero(currentY > heroHeight);

            if (currentY <= heroHeight) {
                // Always show header in the hero zone
                setIsVisible(true);
            } else {
                const diff = currentY - lastScrollY.current;
                if (Math.abs(diff) > threshold) {
                    setIsVisible(diff < 0); // scrolling up → visible
                }
            }

            lastScrollY.current = currentY;
            ticking = false;
        };

        let frameId = 0;

        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                frameId = requestAnimationFrame(update);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);

    return { isVisible, isPastHero };
}

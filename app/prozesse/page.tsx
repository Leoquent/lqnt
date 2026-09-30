"use client";

import { useEffect, useRef, useState } from "react";
import QuizModal from "@/components/QuizModal";
import Applications from "./Applications";
import Profile from "./Profile";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const painPoints = [
    "endloser|Zettelwirtschaft",
    "fehleranfälliger|Routinearbeit",
    "doppelter|Datenpflege",
    "starren|Systemvorgaben",
    "administrativer|Dauerlast",
    "Sonntagen am|Schreibtisch",
    "isolierten|Insellösungen",
    "unnötigem|Hin und Her",
    "Softwaresklaverei"
];

const solutionsData = [
    { id: "01", title: "KI-Strategie & Beratung", badges: ["Analyse", "Einrichtung", "Einweisung"], text: "Wo kann KI Ihren Betrieb entlasten? Ich analysiere mit Ihnen die Möglichkeiten, wähle passende Werkzeuge aus und entwickle einen konkreten Fahrplan. Auf Wunsch übernehme ich die Einrichtung und zeige Ihnen und Ihrem Team, wie Sie damit im Alltag arbeiten. Auch unabhängig von einem Entwicklungsprojekt buchbar." },
    { id: "02", title: "KI-Agenten & Automatisierung", badges: ["Agenten", "Dokumente", "Arbeitsabläufe"], text: "Ich richte KI-Agenten ein und entwickle Automatisierungen, die wiederkehrende Aufgaben übernehmen: Informationen verarbeiten, Dokumente zuordnen oder Arbeitsschritte ausführen. Welche Aufgaben selbstständig laufen und wo eine Prüfung sinnvoll ist, legen wir gemeinsam fest." },
    { id: "03", title: "Individuelle Software", badges: ["Eigene Tools", "Dashboards", "Webanwendungen"], text: "Wenn vorhandene Software nicht zu Ihrem Ablauf passt, entwickle ich das passende Werkzeug. Von einer gezielten Erweiterung über Dashboards und Planungstools bis zur eigenständigen Webanwendung – abgestimmt auf Ihre Anforderungen und Geschäftslogik." },
    { id: "04", title: "Systeme & Insellösungen vernetzen", badges: ["Schnittstellen", "Daten", "Bestehende Systeme"], text: "Informationen einmal erfassen und dort verfügbar machen, wo sie gebraucht werden. Ich verbinde bestehende Anwendungen, führe Daten zusammen und ergänze fehlende Schnittstellen. Für weniger doppelte Datenpflege und mehr Überblick." }
];

const navLinks = [
    { name: "Status Quo", href: "#status-quo-section" },
    { name: "Leistungen", href: "#solutions" },
    { name: "Prozess", href: "#prozess" },
    { name: "Anwendungen", href: "#anwendungen" },
    { name: "Warum ich", href: "#warum-ich" },
    { name: "Webdesign", href: `${basePath}/webdesign/` }
];

const prozessData = [
    {
        n: "01",
        title: "Analyse",
        text: "In einer kostenlosen Potenzialanalyse identifiziere ich mit Ihnen Flaschenhälse und ungenutzte Potenziale. Sie erhalten eine erste Einschätzung, wo sich Ihre Abläufe mit KI, Automatisierung oder individueller Software sinnvoll vereinfachen lassen."
    },
    {
        n: "02",
        title: "Architektur",
        text: "Ich entwerfe die maßgeschneiderte Blaupause für Ihre Lösung – mit klaren Datenwegen, Schnittstellen und Zugriffsrechten. Leistungsumfang und Kosten stimmen wir vor dem Entwicklungsstart ab."
    },
    {
        n: "03",
        title: "Entwicklung",
        text: "Ich programmiere, teste und iteriere Ihre Lösung in enger Abstimmung mit Ihnen. Ein früher Prototyp macht sie greifbar. Typische Fälle und Ausnahmen prüfen wir gemeinsam."
    },
    {
        n: "04",
        title: "Betrieb",
        text: "Ich integriere die Lösung in Ihren Arbeitsalltag und begleite die Einführung. Hosting, Wartung und Weiterentwicklung vereinbaren wir passend zu Ihrem Bedarf."
    }
];

export default function Page() {

    const [openSolution, setOpenSolution] = useState<string | null>(null);
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [motionPaused, setMotionPaused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [processStatic, setProcessStatic] = useState(false);

    const pageRef = useRef<HTMLDivElement>(null);
    const typewriterRef = useRef<HTMLSpanElement>(null);
    const sqGeoCoreRef = useRef<HTMLDivElement>(null);
    const sqRingRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(-1);

    const desktopProgressFillsRef = useRef<(HTMLDivElement | null)[]>([]);
    const activeStepRef = useRef(-1);

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReducedMotion(query.matches);
        update();
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        const root = pageRef.current;
        if (!root) return;
        // Keep every step readable when its text cannot fit the sticky frame.
        const measure = () => {
            const available = window.innerHeight - 64;
            if (window.innerWidth < 768) {
                const hero = root.querySelector<HTMLElement>('.process-hero-content');
                if (hero) root.style.setProperty('--process-hero-height', `${hero.offsetHeight}px`);
                // Mobile uses a moving text track, so it does not need every step to fit at once.
                setProcessStatic(false);
                const intro = root.querySelector<HTMLElement>('.process-mobile-intro');
                const footer = root.querySelector<HTMLElement>('.process-mobile-cta');
                const cards = Array.from(root.querySelectorAll<HTMLElement>('.mobile-prozess-card'));
                if (intro && footer && cards.length) {
                    const needed = intro.offsetHeight + footer.offsetHeight + Math.max(...cards.map(card => card.offsetHeight)) + 2;
                    root.style.setProperty('--process-mobile-min-height', `${needed}px`);
                }
            } else {
                const cards = Array.from(root.querySelectorAll<HTMLElement>('.process-card-content'));
                setProcessStatic(cards.some(el => el.offsetHeight + 40 > available / 4));
            }
        };
        const observer = new ResizeObserver(measure);
        root.querySelectorAll('.process-hero-content, .process-card-content, .mobile-prozess-card, [data-mobile-process-layout] > div').forEach(el => observer.observe(el));
        window.addEventListener('resize', measure);
        measure();
        return () => { observer.disconnect(); window.removeEventListener('resize', measure); };
    }, []);

    // Keep ref in sync
    useEffect(() => {
        activeStepRef.current = activeStep;
    }, [activeStep]);

    // Nav-Scrollzustand, Mobile-Menü und Body-Scroll-Lock liegen jetzt in <SiteNav />.

    // Keyboard activation for div-based toggles (a11y: Enter/Space)
    const onKeyToggle = (e: React.KeyboardEvent, fn: () => void) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fn();
        }
    };

    // --- GSAP ORCHESTRATOR ---
    useGSAP(() => {
        if (motionPaused) { setActiveStep(3); return; }
        let mm = gsap.matchMedia();

        const words = gsap.utils.toArray('.hero-word') as HTMLElement[];
        const elements = gsap.utils.toArray('.hero-element') as HTMLElement[];

        // Set transform-origin to center for each word so 3D rotation looks natural
        words.forEach(w => { w.style.transformOrigin = '50% 50%'; });

        // --- HERO PARALLAX: subtle upward drift as user scrolls (DESKTOP ONLY).
        //     Scrubbing a position:fixed, full-screen (100svh) element every scroll frame is a
        //     major jank source on mobile, where the URL bar also resizes the viewport mid-scroll.
        //     Mobile uses native sticky positioning; only its children are transformed. ---
        mm.add("(min-width: 768px) and (min-height: 741px) and (prefers-reduced-motion: no-preference)", () => {
            const heroSection = document.getElementById('hero-sticky-section');
            if (heroSection) {
                gsap.to(heroSection, {
                    y: -120,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "#content-wrapper",
                        start: "top bottom",
                        end: "top -20%",
                        scrub: true,
                    }
                });
            }
        });

        // --- DESKTOP ONLY ANIMATIONS (Animations play only if user has no reduced motion preference) ---
        mm.add("(min-width: 768px) and (min-height: 741px) and (prefers-reduced-motion: no-preference)", () => {
            
            // 1. HERO 3D Dispersion
            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#content-wrapper",
                    start: "top bottom-=150px", 
                    end: "top 30%",
                    scrub: 0.5,
                    invalidateOnRefresh: true
                }
            });

            words.forEach((word, i) => {
                const dirX = (Math.random() - 0.5) * 200;           // lateral scatter
                const dirY = -(30 + Math.random() * 120);           // drift upward
                const dirZ = -(200 + Math.random() * 400);          // push deep into screen
                const rotX = -10 + (Math.random() - 0.5) * 60;      // tilt back
                const rotY = (Math.random() - 0.5) * 90;            // yaw
                const rotZ = (Math.random() - 0.5) * 25;            // slight roll
                const endScale = 0.4 + Math.random() * 0.3;         // shrink = depth

                heroTl.to(word, {
                    x: dirX, y: dirY, z: dirZ,
                    rotationX: rotX, rotationY: rotY, rotationZ: rotZ,
                    opacity: 0,
                    filter: "blur(16px)",
                    scale: endScale,
                    ease: "power1.in",
                    immediateRender: false
                }, 0);
            });

            gsap.set(words, {
                opacity: 1, filter: "none", x: 0, y: 0, z: 0,
                rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1,
                willChange: "transform, opacity"
            });
            gsap.set(elements, {
                opacity: 1, filter: "none", y: 0, z: 0, scale: 1,
                willChange: "transform, opacity"
            });

            heroTl.to(elements, {
                y: -40, z: -150, opacity: 0, filter: "blur(10px)",
                scale: 0.85, ease: "power1.in"
            }, 0);

            // 2. STATUS QUO (Removed per user request to avoid jumping/bugs)

            // 3. SOLUTIONS
            const solHeader = document.querySelector('#solutions > div > div:first-child') as HTMLElement;
            const solCards = gsap.utils.toArray('#solutions .group') as HTMLElement[];
            
            const solTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#solutions',
                    start: "top 75%",
                    end: "center 50%",
                    scrub: 1,
                }
            });
            if (solHeader) solTl.fromTo(solHeader, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
            if (solCards.length > 0) solTl.fromTo(solCards, { opacity: 0, scale: 0.95, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 2, stagger: 0.2 }, "-=0.5");
        });

        // 4. PROZESS (Card Slider via native CSS sticky on both breakpoints — never pin:true here)
        // Reduced motion: skip the scrub timelines entirely and show all steps fully revealed.
        mm.add("(prefers-reduced-motion: reduce)", () => {
            activeStepRef.current = 3;
            setActiveStep(3);
        });

        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
            if (processStatic) { setActiveStep(3); return; }
            const fills = desktopProgressFillsRef.current;
            const card2 = document.querySelector('.desktop-card-1') as HTMLElement; // step 02 is index 1
            const card3 = document.querySelector('.desktop-card-2') as HTMLElement; // step 03 is index 2
            const card4 = document.querySelector('.desktop-card-3') as HTMLElement; // step 04 is index 3
            
            if (fills.length > 0) {
                const tl = gsap.timeline({
                    onUpdate: function() {
                        const visualProgress = this.progress();
                        const step = Math.min(3, Math.floor(visualProgress * 5));
                        if (step !== activeStepRef.current) {
                            activeStepRef.current = step;
                            setActiveStep(step);
                        }
                    },
                    scrollTrigger: {
                        id: "prozess-pin",
                        trigger: "#prozess",
                        start: "top 64px",
                        end: "+=1000",
                        // NO pin — native CSS `sticky` (see the two columns below) holds each
                        // column in place. GSAP only scrubs the card reveal, so there is no
                        // pin/unpin boundary and therefore no jump. scrub 0.6 = smooth catch-up.
                        scrub: 0.6,
                    }
                });

                // Initial off-screen positions for cards 2, 3, 4
                gsap.set([card2, card3, card4], { y: '100vh' });

                // Card 2 slides up to its natural position (takes 20%)
                tl.to(card2, { y: 0, ease: "none", duration: 0.20 }, 0);
                // Card 3 slides up to its natural position (takes 20%)
                tl.to(card3, { y: 0, ease: "none", duration: 0.20 }, 0.20);
                // Card 4 slides up to its natural position (takes 20%, ends at 0.60)
                tl.to(card4, { y: 0, ease: "none", duration: 0.20 }, 0.40);

                // Animate horizontal progress bars sequentially
                fills.forEach((fill, i) => {
                    if (fill) {
                        tl.fromTo(fill, 
                            { scaleX: 0 }, 
                            { scaleX: 1, ease: "none", duration: 0.20 },
                            i * 0.20
                        );
                    }
                });

                // Pad the timeline to exactly 1.00 to keep progress mapping correct
                tl.set({}, {}, 1.00);

                // Left Text Block translation removed to allow standard scroll alignment (matches ruempelross sticky behavior)
            }
        });

        mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
            // The ticker rises over the stationary intro. Start while the headline
            // is still visible, including when a very short viewport needs some overflow.
            const heroTl = gsap.timeline({ scrollTrigger: {
                id: "process-mobile-hero", trigger: "#content-wrapper",
                start: () => Math.max(0, (document.getElementById('content-wrapper')?.offsetTop || 0)
                    - (document.getElementById('hero-sticky-section')?.offsetHeight || 0)) + 24,
                end: () => `+=${Math.max(220, window.innerHeight * 0.45)}`, scrub: 0.35,
                invalidateOnRefresh: true
            }});
            words.forEach((word, i) => {
                heroTl.to(word, { x: (i % 2 ? 1 : -1) * (24 + i * 5), y: -45 - i * 6,
                    z: -180, rotationX: 18, rotationY: i % 2 ? 20 : -20,
                    rotationZ: i % 2 ? 6 : -6, opacity: 0, scale: 0.65,
                    ease: "power1.in" }, 0);
            });

            // Keep the desktop depth/fade on the supporting content, with shorter
            // mobile paths. The actions wait until the whole intro fits above the
            // ticker on short screens, so the CTA and conversation note can be read.
            elements.forEach((element, i) => {
                const isActions = element.classList.contains('process-hero-actions');
                gsap.fromTo(element, {
                    y: 0, z: 0, scale: 1, opacity: 1,
                }, {
                    y: -48, z: -120, scale: 0.85, opacity: 0,
                    transformOrigin: 'left top', ease: 'none',
                    scrollTrigger: {
                        id: `process-mobile-hero-element-${i}`,
                        trigger: '#content-wrapper',
                        start: () => isActions
                            ? Math.max(0, (document.getElementById('hero-sticky-section')?.offsetHeight || 0)
                                - window.innerHeight) + 8
                            : element.classList.contains('process-hero-eyebrow') ? 0 : 24,
                        end: () => `+=${Math.max(160, window.innerHeight * 0.3)}`,
                        scrub: 0.35, invalidateOnRefresh: true,
                    },
                });
            });

            const cards = gsap.utils.toArray<HTMLElement>('.mobile-prozess-card');
            const track = pageRef.current?.querySelector<HTMLElement>('.process-mobile-track');
            const frame = pageRef.current?.querySelector<HTMLElement>('.process-mobile-window');
            if (cards.length && track && frame) {
                const tl = gsap.timeline({ scrollTrigger: {
                    id: "process-mobile-steps", trigger: "#prozess",
                    start: () => `top ${Math.min(72, window.innerHeight - (pageRef.current?.querySelector<HTMLElement>('.process-steps-section')?.offsetHeight || 0))}px`,
                    end: "+=1400",
                    scrub: 0.4, invalidateOnRefresh: true,
                    onUpdate: self => {
                        const step = Math.min(3, Math.floor(self.progress * 4));
                        if (step !== activeStepRef.current) { activeStepRef.current = step; setActiveStep(step); }
                    }
                }});
                gsap.set(cards.slice(1), { opacity: 0, y: 40 });
                gsap.set(track, { y: 0 });
                cards.slice(1).forEach((card, index) => {
                    const at = 0.2 + index * 0.25;
                    tl.to(card, { opacity: 1, y: 0, duration: 0.16, ease: "none" }, at);
                    tl.to(track, { y: () => -Math.max(0, card.offsetTop + card.offsetHeight - frame.clientHeight),
                        duration: 0.16, ease: "none" }, at);
                });
                tl.set({}, {}, 1);
            }
        });

        mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
            gsap.utils.toArray<HTMLElement>('.why-card').forEach(card => {
                gsap.fromTo(card, { opacity: 0, y: 44 }, { opacity: 1, y: 0, ease: "none",
                    scrollTrigger: { trigger: card, start: "top 92%", end: "top 65%", scrub: 0.35 }
                });
                ScrollTrigger.create({ trigger: card, start: "top 60%", end: "bottom 40%",
                    toggleClass: { targets: card, className: "why-card-active" }
                });
            });
        });

        // Remaining desktop animations
        mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
            // 6. WARUM WIR
            const wwHeader = document.querySelector('#warum-ich > div > div:first-child') as HTMLElement;
            const wwCards = gsap.utils.toArray('#warum-ich .why-card') as HTMLElement[];
            
            const wwTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#warum-ich',
                    start: "top 80%",
                    end: "center center",
                    scrub: 1,
                }
            });
            if (wwHeader) wwTl.fromTo(wwHeader, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
            if (wwCards.length > 0) wwTl.fromTo(wwCards, { opacity: 0, y: 50, rotationY: 5, transformOrigin: "left center" }, { opacity: 1, y: 0, rotationY: 0, stagger: 0.1, ease: "power2.out" }, "-=0.5");

            // 7. CTA
            const ctaReveal = document.querySelector('#cta .reveal') as HTMLElement;
            const ctaExecute = document.querySelector('#cta span.text-\\[20vw\\]') as HTMLElement;
            
            const ctaTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#cta',
                    start: "top 90%",
                    end: "bottom bottom",
                    scrub: 1,
                }
            });
            
            if (ctaExecute) ctaTl.fromTo(ctaExecute, { y: 150 }, { y: -50, duration: 2 });
            if (ctaReveal) ctaTl.from(ctaReveal, { opacity: 0, y: 80, duration: 1 }, "-=1.5");

        });

        // Cleanup
        return () => mm.revert();
    }, { dependencies: [motionPaused, processStatic], revertOnUpdate: true, scope: pageRef });

    // --- 3D INTERACTION ---
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!sqGeoCoreRef.current || motionPaused || !window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)));
        const y = Math.max(-1, Math.min(1, (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)));
        const rotX = -y * 20;
        const rotY = (x * 35) - 15;

        sqGeoCoreRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

        if (sqRingRef.current) {
            sqRingRef.current.style.transform = `translateZ(20px) rotate(${12 + (x * 10)}deg)`;
        }
    };

    const handleMouseLeave = () => {
        if (motionPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (sqGeoCoreRef.current) {
            sqGeoCoreRef.current.style.transform = `rotateX(0deg) rotateY(-15deg)`;
        }
        if (sqRingRef.current) {
            sqRingRef.current.style.transform = `translateZ(20px) rotate(12deg)`;
        }
    };

    // --- TYPEWRITER ---
    useEffect(() => {
        // Respect reduced-motion: show the first phrase statically, no typing loop
        if (reducedMotion || motionPaused) {
            if (typewriterRef.current) {
                typewriterRef.current.innerHTML = painPoints[0]
                    .split('|')
                    .map((w) => `<span>${w}</span>`)
                    .join('<span class="typewriter-space"> </span><br class="typewriter-break" />');
            }
            return;
        }

        let currentPainIndex = 0;
        let currentCharIndex = 0;
        let isDeletingPhase = false;
        let timeoutId: NodeJS.Timeout;

        const typeWriterLoop = () => {
            if (!typewriterRef.current) return;
            const fullText = painPoints[currentPainIndex];

            if (isDeletingPhase) {
                currentCharIndex--;
            } else {
                currentCharIndex++;
            }

            let words = fullText.split('|');
            let html = '';
            let globalCharCount = 0;

            for (let i = 0; i < words.length; i++) {
                let word = words[i];
                html += '<span>';

                for (let j = 0; j < word.length; j++) {
                    if (globalCharCount < currentCharIndex) {
                        html += word[j];
                    } else {
                        html += `<span class="opacity-0">${word[j]}</span>`;
                    }
                    globalCharCount++;
                }
                html += '</span>';

                if (i < words.length - 1) {
                    html += '<span class="typewriter-space"> </span><br class="typewriter-break" />';
                    globalCharCount++;
                }
            }

            typewriterRef.current.innerHTML = html;

            let typeSpeed = isDeletingPhase ? 30 : 70;

            if (!isDeletingPhase && currentCharIndex === fullText.length) {
                typeSpeed = 2000;
                isDeletingPhase = true;
            } else if (isDeletingPhase && currentCharIndex === 0) {
                isDeletingPhase = false;
                currentPainIndex = (currentPainIndex + 1) % painPoints.length;
                typeSpeed = 500;
            }

            timeoutId = setTimeout(typeWriterLoop, typeSpeed);
        };

        timeoutId = setTimeout(typeWriterLoop, 1000);
        return () => clearTimeout(timeoutId);
    }, [motionPaused, reducedMotion]);

    const openQuiz = () => setIsQuizOpen(true);

    return (
        <div ref={pageRef} className="bg-vanta text-bone font-sans antialiased relative w-full process-page" data-motion-paused={motionPaused} data-process-static={processStatic} style={{ overflowX: 'clip' }}>
            <div className="noise-bg"></div>
            <a className="process-skip" href="#content-wrapper">Zum Inhalt</a>

            <SiteNav links={navLinks} onQuizOpen={openQuiz} homeHref="/" darkFrom="viewport" />

            {/* Hero – fixed in the background behind content */}
            <section className="fixed top-0 left-0 right-0 h-[100svh] flex flex-col bg-white z-0 overflow-hidden" id="hero-sticky-section">
                <div className="process-hero-content w-full flex-1 px-6 pt-24 pb-16 md:px-8 md:py-12 lg:px-10 lg:py-20 flex flex-col justify-start md:justify-center relative mx-auto max-w-[1440px]" style={{ perspective: '1200px', perspectiveOrigin: '50% 40%' }}>
                    <div className="font-mono mb-8 md:mb-8 uppercase text-sm font-medium tracking-wider md:tracking-widest hero-element process-hero-eyebrow">
                        <span className="brutalist-marker text-vanta">KI, Prozessoptimierung &amp; Automatisierung</span>
                    </div>

                    <h1 className="hero-headline text-vanta mb-6 md:mb-8 process-hero-title" style={{ transformStyle: 'preserve-3d' }}>
                        <span className="hero-word inline-block">Systeme,</span>{" "}<span className="hero-word inline-block">die</span>{" "}<br className="process-mobile-break" />
                        <span className="hero-word inline-block">Ihnen</span>{" "}<br className="process-desktop-break" />
                        <span className="hero-word inline-block">Arbeit</span>{" "}<br className="process-mobile-break" />
                        <span className="hero-word inline-block brutalist-marker">abnehmen.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-mute leading-relaxed mb-10 md:mb-10 hero-element process-hero-copy">
                        Ob bestehende Insellösungen vernetzen oder komplette Tools neu entwickeln: Ich konzipiere und programmiere Systeme,
                        die zu Ihrer Geschäftslogik passen und Ihre Arbeitsabläufe optimieren. Mit Automatisierung und KI dort, wo sie sinnvoll Arbeit abnehmen.
                    </p>

                    <div className="process-hero-actions flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6 hero-element">
                        <button onClick={openQuiz} className="btn-glitch inline-block bg-lime text-vanta font-mono font-bold uppercase py-4 px-8 border border-lime transition-all duration-75 cursor-pointer">
                            Potenzial Analysieren
                        </button>
                        <span className="font-mono text-xs text-mute uppercase block">Kostenloses Erstgespräch<br /><span className="text-vanta">unverbindlich</span></span>
                    </div>

                </div>
            </section>

            {/* Content area – starts at viewport bottom (ticker flush), scrolls up over hero */}
            <main className="relative z-10" id="content-wrapper" style={{ marginTop: 'calc(100svh - 48px)' }}>
                {/* Ticker – flush at viewport bottom on load, scrolls up with content (decorative) */}
                <div aria-hidden="true" className="h-[48px] shrink-0 border-t border-b border-gridline text-lime overflow-hidden flex items-center whitespace-nowrap bg-[#080808] w-full relative">
                    <div className="animate-marquee font-mono text-xs uppercase tracking-widest flex gap-12 items-center pr-12 shrink-0">
                        <span>KLARE ABLÄUFE</span> <span className="opacity-30">/</span>
                        <span>WENIGER DATENPFLEGE</span> <span className="opacity-30">/</span>
                        <span>MEHR ÜBERBLICK</span> <span className="opacity-30">/</span>
                        <span>PASSENDE WERKZEUGE</span> <span className="opacity-30">/</span>
                        <span>WENIGER ROUTINE</span> <span className="opacity-30">/</span>
                        <span>VERBUNDENE SYSTEME</span> <span className="opacity-30">/</span>
                        <span>KLARE ABLÄUFE</span> <span className="opacity-30">/</span>
                        <span>WENIGER DATENPFLEGE</span> <span className="opacity-30">/</span>
                        <span>MEHR ÜBERBLICK</span> <span className="opacity-30">/</span>
                        <span>PASSENDE WERKZEUGE</span> <span className="opacity-30">/</span>
                        <span>WENIGER ROUTINE</span> <span className="opacity-30">/</span>
                        <span>VERBUNDENE SYSTEME</span> <span className="opacity-30">/</span>
                    </div>
                    <div className="animate-marquee font-mono text-xs uppercase tracking-widest flex gap-12 items-center pr-12 shrink-0" aria-hidden="true">
                        <span>KLARE ABLÄUFE</span> <span className="opacity-30">/</span>
                        <span>WENIGER DATENPFLEGE</span> <span className="opacity-30">/</span>
                        <span>MEHR ÜBERBLICK</span> <span className="opacity-30">/</span>
                        <span>PASSENDE WERKZEUGE</span> <span className="opacity-30">/</span>
                        <span>WENIGER ROUTINE</span> <span className="opacity-30">/</span>
                        <span>VERBUNDENE SYSTEME</span> <span className="opacity-30">/</span>
                        <span>KLARE ABLÄUFE</span> <span className="opacity-30">/</span>
                        <span>WENIGER DATENPFLEGE</span> <span className="opacity-30">/</span>
                        <span>MEHR ÜBERBLICK</span> <span className="opacity-30">/</span>
                        <span>PASSENDE WERKZEUGE</span> <span className="opacity-30">/</span>
                        <span>WENIGER ROUTINE</span> <span className="opacity-30">/</span>
                        <span>VERBUNDENE SYSTEME</span> <span className="opacity-30">/</span>
                    </div>
                </div>
                <section id="status-quo-section" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="border-b border-gridline bg-[#080808] text-white overflow-hidden flex justify-center">
                    <div className="w-full max-w-[1440px] relative">
                        <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[5%] pointer-events-none z-0 overflow-hidden opacity-20 lg:opacity-60 mix-blend-screen" style={{ perspective: '1200px' }}>
                        <div id="sq-geo-core" ref={sqGeoCoreRef} className="hidden lg:block relative w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] lg:w-[650px] lg:h-[650px] preserve-3d transition-transform duration-300 ease-out" style={{ transform: "rotateX(0deg) rotateY(-15deg)" }}>
                            <div className="absolute inset-0 border border-white/20 flex items-start p-4" style={{ transform: "translateZ(-100px)" }}>
                            </div>
                            <div id="sq-ring" ref={sqRingRef} className="absolute inset-8 border border-white/25 rotate-12 transition-transform duration-300" style={{ transform: "translateZ(20px)" }}></div>
                            <div className="absolute inset-20 border border-lime/25 -rotate-12" style={{ transform: "translateZ(80px)" }}></div>
                            <div className="absolute inset-[38%] border border-lime/30 bg-lime/5 backdrop-blur-md flex items-center justify-center animate-pulse" style={{ transform: "translateZ(150px)" }}>
                                <div className="w-1.5 h-1.5 bg-lime opacity-50"></div>
                            </div>
                            <div className="absolute top-1/2 left-[-30%] w-[160%] h-px bg-gradient-to-r from-transparent via-lime/20 to-transparent" style={{ transform: "translateZ(40px)" }}></div>
                            <div className="absolute left-1/2 top-[-30%] w-px h-[160%] bg-gradient-to-b from-transparent via-white/10 to-transparent" style={{ transform: "translateZ(40px)" }}></div>
                        </div>
                    </div>

                    <div className="px-6 py-6 md:px-8 md:py-12 lg:px-10 lg:py-20 flex flex-col gap-8 md:gap-12 relative z-10 w-full border-x border-gridline">
                        <div className="reveal w-full">
                            <p className="font-mono text-xs uppercase mb-6 tracking-widest">
                                <span className="brutalist-marker text-vanta">Status Quo</span>
                            </p>
                            <h2 className="section-headline w-full" style={{ transitionDelay: '100ms' }}>
                                <span className="text-white">Schluss mit</span><br />
                                {/* Screenreader: static phrase instead of the permanently mutating typewriter */}
                                <span className="sr-only">endloser Zettelwirtschaft.</span>
                                <span id="typewriter" ref={typewriterRef} aria-hidden="true" className="text-lime block min-h-[2.4em] md:min-h-0"></span>
                            </h2>
                            <button className="process-motion-control" onClick={() => setMotionPaused(!motionPaused)} aria-pressed={motionPaused}>{motionPaused ? "Bewegung fortsetzen" : "Bewegung pausieren"}</button>
                        </div>

                        <div className="w-full max-w-4xl reveal" style={{ transitionDelay: '200ms' }}>
                            <h3 className="text-xl md:text-2xl font-bold  tracking-tight text-white/90">
                                Software sollte Zeit sparen. Nicht Zeit kosten.
                            </h3>
                            <p className="text-base md:text-lg text-bone/80 leading-relaxed font-light">
                                Standard-Tools zwingen Ihr Unternehmen in starre Prozesse und rauben Ihnen wertvolle Zeit. Ich drehe den Spieß um:
                                Ich konzipiere und programmiere Systeme, die sich <span className="bg-lime text-vanta px-1.5 py-0.5 font-normal">kompromisslos Ihrer Geschäftslogik unterwerfen</span> – und Ihnen wiederkehrende Arbeit abnehmen.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 pt-8 md:pt-12 border-t border-gridline/20 reveal" style={{ transitionDelay: '300ms' }}>
                            <p className="text-base md:text-lg text-bone/80 leading-relaxed">
                                <span className="text-lime">Mission</span> · Ich übersetze Unternehmenswissen in Systeme, die Arbeit abnehmen. Dafür verbinde ich strategische Kreativität mit technischer Umsetzung: Prozesse verstehen, Insellösungen vernetzen und Routine sinnvoll automatisieren.
                            </p>
                            <p className="text-base md:text-lg text-bone/80 leading-relaxed">
                                <span className="text-lime">Vision</span> · Ein Mittelstand, in dem Systeme Routine selbstständig erledigen und Menschen Ergebnisse prüfen und freigeben – statt jeden Arbeitsschritt selbst auszuführen.
                            </p>
                        </div>
                    </div>
                    </div>
                </section>

                <section id="solutions" className="border-b border-gridline bg-vanta text-white flex justify-center">
                    <div className="w-full max-w-[1440px]">
                        <div className="px-6 py-6 md:px-8 md:py-12 lg:px-10 lg:py-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 reveal border-x border-gridline">
                        <div>
                            <p className="font-mono text-xs uppercase mb-6 tracking-widest">
                                <span className="brutalist-marker text-vanta">Leistungen</span>
                            </p>
                            <h2 className="section-headline max-w-2xl">
                                Ihre Abläufe.<br />Ihre Lösung.
                            </h2>
                        </div>
                        <p className="max-w-md text-bone/70 text-sm leading-relaxed font-light">
                            Von der ersten Orientierung bis zur individuellen Entwicklung: Ich unterstütze Sie dabei, KI sinnvoll einzusetzen,
                            Prozesse zu verbessern und die passenden Werkzeuge dafür aufzubauen.
                        </p>
                    </div>

                    <div className="w-full">
                        {/* Desktop: 2-Column Grid with Hover */}
                        <div className="hidden md:grid grid-cols-2 reveal border-x border-gridline">
                            {solutionsData.map((sol, idx) => (
                                <div 
                                    key={sol.id} 
                                    className="group relative bg-vanta p-8 lg:p-10 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col overflow-hidden hover:bg-lime h-auto min-h-[300px]"
                                >
                                
                                    <h3 className="text-xl md:text-2xl  font-bold mb-4 text-white group-hover:text-vanta transition-colors duration-500 relative z-10">{sol.title}</h3>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                                        {sol.badges.map(b => (
                                            <span key={b} className="border border-lime/30 group-hover:border-vanta/30 group-hover:bg-vanta group-hover:text-lime px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-lime/70 bg-lime/5 transition-all duration-500">{b}</span>
                                        ))}
                                    </div>

                                    <div className="mt-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10">
                                        <p className="text-bone/80 group-hover:text-vanta/80 text-base leading-relaxed pt-4 border-t border-white/20 group-hover:border-vanta/20 transition-colors duration-500">
                                            {sol.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile: Accordion Menu */}
                        <div className="md:hidden grid grid-cols-1 reveal border-x border-gridline">
                            {solutionsData.map((sol, idx) => (
                                <div
                                    key={`mobile-${sol.id}`}
                                    role="button"
                                    tabIndex={0}
                                    aria-expanded={openSolution === sol.id}
                                    aria-controls={`solution-${sol.id}`}
                                    onClick={() => setOpenSolution(openSolution === sol.id ? null : sol.id)}
                                    onKeyDown={(e) => onKeyToggle(e, () => setOpenSolution(openSolution === sol.id ? null : sol.id))}
                                    className={`group relative p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col overflow-hidden cursor-pointer border-b border-gridline last:border-b-0 ${openSolution === sol.id ? 'bg-lime' : 'bg-vanta'}`}
                                >
                                
                                    <div className="flex flex-row items-center justify-between gap-4 relative z-10 w-full">
                                        <div className="flex flex-col gap-4 w-full">
                                            <h3 className={`text-xl  font-bold transition-colors duration-500 shrink-0 ${openSolution === sol.id ? 'text-vanta' : 'text-white'}`}>
                                                {sol.title}
                                            </h3>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                {sol.badges.map(b => (
                                                    <span key={b} className={`border px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest transition-all duration-500 ${openSolution === sol.id ? 'border-vanta/30 bg-vanta text-lime' : 'border-lime/30 text-lime/70 bg-lime/5'}`}>
                                                        {b}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-end shrink-0 pl-2 mt-0.5">
                                            <svg aria-hidden="true" width="38" height="38" viewBox="0 0 40 40" className={`text-lime transition-transform duration-500 ${openSolution === sol.id ? 'rotate-45 !text-vanta' : ''}`}><path fill="currentColor" fillRule="evenodd" d="M20 1a19 19 0 1 0 0 38 19 19 0 0 0 0-38ZM18 10h4v8h8v4h-8v8h-4v-8h-8v-4h8Z" /></svg>
                                        </div>
                                    </div>

                                    <div id={`solution-${sol.id}`} inert={openSolution !== sol.id} className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${openSolution === sol.id ? 'grid-rows-[1fr] mt-6' : 'grid-rows-[0fr] mt-0'}`}>
                                        <div className="overflow-hidden relative z-10 w-full">
                                            <p className={`text-sm leading-relaxed font-light pt-4 border-t transition-all duration-500 ${openSolution === sol.id ? 'text-vanta/90 border-vanta/20 opacity-100' : 'text-vanta/0 border-transparent opacity-0'}`}>
                                                {sol.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                </section>

                {/* Anchor + ScrollTrigger marker: static zero-height element at the section's natural
                    position. Nav links and GSAP measure against this — the section itself is sticky
                    on mobile and therefore useless as a scroll target once it is anchored. */}
                <div id="prozess" className="scroll-mt-[65px]" />
                <section className="process-steps-section border-b border-gridline sticky top-[64px] -z-10 md:relative md:top-auto md:z-auto bg-white text-vanta flex justify-center overflow-hidden md:overflow-visible h-[calc(100dvh-64px)] md:h-auto shadow-[0_20px_0_0_#050505] md:shadow-none">
                    <div className="w-full max-w-[1440px] h-full md:h-auto">
                        
                        {/* Mobile view container */}
                        <div data-mobile-process-layout className="process-mobile-layout md:hidden">
                            <header className="process-mobile-intro">
                                <p className="font-mono text-xs uppercase tracking-widest"><span className="brutalist-marker text-vanta">Prozess</span></p>
                                <h2>Der Weg zu<br />Ihrer Lösung.</h2>
                                <p className="process-mobile-lead">Transparente Meilensteine von der Analyse bis zum Betrieb. Keine Blackbox.</p>
                                <div className="process-mobile-progress" aria-hidden="true">
                                    {prozessData.map((step, index) => <div key={step.n} data-active={index <= activeStep}>
                                        <span className="process-mobile-bar" /><span className="process-mobile-number">{step.n}</span><strong>{step.title}</strong>
                                    </div>)}
                                </div>
                            </header>
                            <div className="process-mobile-window">
                                <div className="process-mobile-track">
                                    {prozessData.map(step => <div className="mobile-prozess-card" key={step.n}>
                                        <div><span>{step.n}</span><h3>{step.title}</h3></div>
                                        <p>{step.text}</p>
                                    </div>)}
                                </div>
                            </div>
                            <div className="process-mobile-cta"><button onClick={openQuiz} className="btn-glitch bg-lime text-vanta font-mono font-bold uppercase border border-lime cursor-pointer">Potenzial kostenlos analysieren</button></div>
                        </div>

                        {/* Desktop: Pinned 2-column Slider */}
                        <div className="prozess-grid hidden md:grid md:grid-cols-[2fr_3fr] border-x border-gridline relative md:h-[calc(100vh_-_64px_+_1000px)]">
                            
                            {/* LEFT: Static Text Column (Headline, Copy, and Horizontal Progress Bars) */}
                            <div className="flex flex-col justify-start px-8 lg:px-10 py-12 border-r border-gridline bg-white select-none h-full relative">
                                <div className="w-full sticky top-[112px] z-20">
                                    <p className="font-mono text-xs uppercase mb-6 tracking-widest">
                                        <span className="brutalist-marker text-vanta">Prozess</span>
                                    </p>
                                    <h2 className="section-headline text-vanta mb-6">Der Weg zu<br />Ihrer Lösung.</h2>
                                    <p className="max-w-md text-mute text-sm leading-relaxed font-light mb-8">
                                        Transparente Meilensteine von der Analyse bis zum Betrieb. Keine Blackbox.
                                    </p>

                                    {/* Horizontal progress rail under copy */}
                                    <div className="flex flex-col w-full relative z-20">
                                        <div className="flex gap-2 w-full mb-3">
                                            {prozessData.map((s, i) => (
                                                <div 
                                                    key={s.n} 
                                                    className="flex-1 h-[2px] bg-gridline/30 relative overflow-hidden"
                                                >
                                                    <div 
                                                        ref={(el) => { desktopProgressFillsRef.current[i] = el; }} 
                                                        className="absolute inset-0 bg-lime origin-left scale-x-0"
                                                    ></div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between w-full">
                                            {prozessData.map((s, i) => (
                                                <div
                                                    key={s.n}
                                                    className="flex-1 text-left"
                                                >
                                                    <span className={`block w-fit font-mono text-[10px] tracking-widest px-1 -ml-1 transition-colors duration-300 ${activeStep >= i ? 'bg-lime text-vanta' : 'text-vanta/60'}`}>
                                                        {s.n}
                                                    </span>
                                                    <span className={`block text-[11px] uppercase font-bold tracking-tight transition-colors duration-300 mt-1 pr-1 truncate lg:whitespace-normal ${activeStep === i ? 'text-vanta' : 'text-vanta/60'}`}>
                                                        {s.title}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Desktop CTA Button */}
                                    <div className="mt-10 lg:mt-12">
                                        <button 
                                            onClick={openQuiz}
                                            className="btn-glitch inline-block bg-lime text-vanta font-mono font-bold uppercase py-3.5 px-6 border border-lime text-xs cursor-pointer"
                                        >
                                            Potenzial kostenlos analysieren
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: Card Slider — tall cell has NO overflow, so the sticky frame resolves against page scroll */}
                            <div className="relative bg-white h-full w-full">
                                {/* Sticky viewport-height frame: stays put for ~1000px while GSAP slides the cards in, then scrolls away natively */}
                                <div className="process-card-frame sticky top-[64px] h-[calc(100vh_-_64px)] overflow-hidden">
                                {prozessData.map((s, i) => {
                                    const isRevealed = activeStep >= i;
                                    const isActive = activeStep === i;
                                    
                                    const cardBgClass = "bg-white border-gridline";
                                    
                                    const numberColorClass = isActive
                                            ? "bg-lime text-vanta"
                                            : isRevealed
                                                ? "text-vanta/50"
                                                : "text-vanta/10";

                                    const titleColorClass = isActive
                                            ? "text-vanta"
                                            : isRevealed
                                                ? "text-vanta/60"
                                                : "text-vanta/20";

                                    const textColorClass = isActive
                                            ? "text-mute"
                                            : isRevealed
                                                ? "text-mute"
                                                : "text-vanta/20";
                                    
                                    const zIndexClass = i === 0 ? "z-40" : i === 1 ? "z-30" : i === 2 ? "z-20" : "z-10";
                                    const topOffset = `${i * 25}%`;

                                    return (
                                        <div
                                            key={s.n}
                                            style={{ 
                                                top: topOffset, 
                                                height: '25%' 
                                            }}
                                            className={`desktop-card-${i} absolute left-0 w-full px-8 lg:px-10 py-5 flex flex-col justify-center ${i === prozessData.length - 1 ? '' : 'border-b'} border-gridline ${zIndexClass} ${cardBgClass}`}
                                        >
                                            <div className="process-card-content">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className={`prozess-number font-mono text-2xl w-fit px-1.5 -ml-1.5 transition-colors duration-500 ${numberColorClass}`}>{s.n}</div>
                                                    <h3 className={`prozess-title text-xl font-bold transition-colors duration-500 ${titleColorClass}`}>{s.title}</h3>
                                                </div>
                                                <p className={`prozess-text text-sm leading-relaxed font-light max-w-md transition-colors duration-500 ${textColorClass}`}>{s.text}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                {/* Mobile scrub distance: the section stays anchored (sticky) while this transparent
                    spacer scrolls by; then #anwendungen slides over it. Height matches
                    the mobile ScrollTrigger end "+=1400". */}
                <div className="process-scroll-space h-[1400px] md:hidden pointer-events-none motion-reduce:hidden" aria-hidden="true" />

                <Applications onAnalyse={openQuiz} />

                <section id="warum-ich" className="border-b border-gridline bg-white text-vanta flex justify-center">
                    <div className="w-full max-w-[1440px]">
                        {/* Cards: Grid clipped at the bottom to prevent layout bleed */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-x border-gridline overflow-hidden relative z-10 bg-white">
                        <div className="px-6 py-6 md:px-8 md:py-12 lg:px-10 lg:py-20 border-b border-gridline col-span-1 md:col-span-2 lg:col-span-4 bg-white flex flex-col md:flex-row justify-between items-start md:items-end gap-8 reveal relative z-10">
                            <div>
                                <p className="font-mono text-xs uppercase mb-6 tracking-widest">
                                    <span className="brutalist-marker text-vanta">Warum ich</span>
                                </p>
                                <h2 className="section-headline text-vanta">Direkt mit mir.<br />Schritt für Schritt.</h2>
                            </div>
                            <p className="max-w-md text-vanta/80 text-sm leading-relaxed font-light relative z-10">Ich begleite Ihr Vorhaben von der ersten Frage bis zur Einführung. Sie wissen, was als Nächstes passiert, was es kostet und wer sich darum kümmert.</p>
                        </div>

                        {[
                            { title: "Klarer Rahmen", text: "Ziel, Umfang und Kosten werden vor dem Start vereinbart. Gemeinsam legen wir fest, woran Sie eine Verbesserung erkennen." },
                            { title: "Früh ausprobieren", text: "Ein überschaubarer Prototyp macht die Lösung greifbar. Rückmeldungen aus Ihrem Arbeitsalltag fließen in die Umsetzung ein." },
                            { title: "Daten bewusst behandeln", text: "Welche Daten werden gebraucht, wer darf sie sehen und wo werden sie verarbeitet? Diese Fragen gehören von Anfang an ins Konzept." },
                            { title: "Maßanzug statt Masse", text: "Ich biege nicht den Kunden für die Software. Jede Lösung wird individuell für Ihren Prozess entwickelt." }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className={`why-card group relative p-6 sm:p-8 lg:p-10 overflow-hidden transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#0a0a0a] hover:border-[#0a0a0a] reveal z-10 ${
                                    idx === 0
                                        ? 'border-b md:border-r lg:border-b-0 border-gridline'
                                        : idx === 1
                                        ? 'border-b md:border-r-0 lg:border-r lg:border-b-0 border-gridline'
                                        : idx === 2
                                        ? 'border-b md:border-b-0 md:border-r border-gridline'
                                        : ''
                                }`}
                                style={{ transitionDelay: `${idx * 80}ms` }}
                            >

                                {/* Title — stays fixed, color transitions */}
                                <h3 className="font-mono text-sm md:text-base text-vanta  font-bold mb-2 md:mb-4 group-hover:text-white transition-colors duration-500">{item.title}</h3>

                                {/* Text — read-first on mobile, slides up on hover for desktop */}
                                <div className="translate-y-0 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                    <p className="text-xs sm:text-sm text-vanta/70 group-hover:text-white/70 leading-relaxed font-light mt-2 md:mt-4 border-t border-vanta/20 group-hover:border-white/20 pt-2 md:pt-4 transition-colors duration-500">{item.text}</p>
                                </div>
                            </div>
                        ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 bg-vanta text-white lg:min-h-[600px]">
                            {/* Intro Column */}
                            <div className="lg:col-span-4 px-6 py-6 md:px-8 md:py-12 lg:px-10 lg:py-20 border-b lg:border-b-0 lg:border-r border-gridline flex flex-col gap-6 lg:gap-0 justify-between reveal">
                                <div>
                                <p className="font-mono text-xs uppercase mb-4">
                                    <span className="brutalist-marker text-vanta">Über mich</span>
                                </p>
                                <h2 className="text-3xl lg:text-4xl  font-bold mb-0 lg:mb-6 leading-tight">
                                    Erst zuhören.<br />Dann <span className="text-lime/90">vereinfachen.</span>
                                </h2>
                            </div>
                            <p className="text-bone/70 text-sm max-w-sm">Mich interessiert, wie Ihr Unternehmen arbeitet – und was Ihnen im Alltag tatsächlich helfen würde.</p>
                        </div>

                        <Profile />

                    </div>
                </div>
            </section>

                <section id="cta" className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-vanta text-white w-full">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                        <span className="text-[20vw] font-bold uppercase leading-none">Freiraum</span>
                    </div>

                    <div className="relative z-10 w-full max-w-2xl mx-auto reveal">
                        <h2 className="text-5xl md:text-7xl  font-bold mb-6">Bereit für echte<br /><span className="brutalist-marker">Freiräume?</span></h2>
                        <p className="text-bone/70 mb-12">Wo kostet Ihr Arbeitsalltag unnötig Zeit? Gemeinsam finden wir heraus, welche Abläufe sich vereinfachen lassen und welche Lösung zu Ihrem Betrieb passt.</p>

                        <button onClick={openQuiz} className="bg-lime text-vanta font-mono font-bold uppercase px-10 py-5 hover:bg-white hover:text-vanta transition-colors duration-300 btn-glitch border border-lime cursor-pointer text-lg">
                            Jetzt befreien
                        </button>
                        <p className="text-sm text-bone/70 mt-5">Im kostenlosen Erstgespräch klären wir die Möglichkeiten.</p>
                    </div>
                </section>

                <SiteFooter />
            </main>

            {/* Quiz Modal */}
            <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
        </div>
    );
}


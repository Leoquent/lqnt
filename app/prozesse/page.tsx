"use client";

import { useEffect, useRef, useState } from "react";
import QuizModal from "@/components/QuizModal";
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
    "unnötigem|Hin und Her"
];

const solutionsData = [
    { id: "01", title: "Abläufe verstehen", badges: ["Analyse", "Prioritäten", "Konzept"], text: "Von der Analyse bis zum Umsetzungskonzept: Ich kläre Engpässe, prüfe den Nutzen von Automatisierung und KI und plane mit Ihnen die nächsten Schritte. Daraus entsteht ein nachvollziehbarer Fahrplan." },
    { id: "02", title: "Routine automatisieren", badges: ["Anfragen", "Dokumente", "Freigaben"], text: "Zum Beispiel: eingehende Anfragen sortieren, Angaben aus Dokumenten übernehmen und einen Antwortentwurf vorbereiten. Sie legen fest, was automatisch laufen darf und wo Ihr Team prüft und freigibt." },
    { id: "03", title: "Passende Werkzeuge bauen", badges: ["Übersichten", "Planung", "Interne Anwendungen"], text: "Wenn Standardsoftware nicht ausreicht, entwickle ich passende Anwendungen: interne Portale, Übersichten, Planungstools oder individuelle Funktionen. Umfang und Anbindungen richten sich nach Ihrem Ablauf." },
    { id: "04", title: "Software verbinden", badges: ["Datenübertragung", "Schnittstellen", "Bestehende Systeme"], text: "Informationen einmal erfassen und dort verfügbar machen, wo sie gebraucht werden. Ich prüfe die Schnittstellen Ihrer vorhandenen Programme und verbinde geeignete Systeme. KI kommt dazu, wenn sie einen konkreten Nutzen bringt." }
];

const industriesData = [
    {
        "id": "construction",
        "name": "Handwerk",
        "subtitle": "Anfragen ordnen. Angebote vorbereiten.",
        "intro": "Ein möglicher Startpunkt: Anfragen aus dem Postfach in einen nachvollziehbaren Vorgang überführen. Bestehende Handwerkersoftware bleibt die Grundlage.",
        "cases": [
            {
                "title": "Anfragen zuordnen",
                "desc": "Leistung, Standort und Terminwunsch auslesen und für Ihr Team zusammenfassen."
            },
            {
                "title": "Fehlendes erkennen",
                "desc": "Ein Antwortentwurf fragt nach fehlenden Angaben oder Bildern. Ihr Team prüft und sendet."
            },
            {
                "title": "Angebote vorbereiten",
                "desc": "Angaben in eine vorhandene Vorlage übertragen, sofern Ihre Software eine geeignete Schnittstelle bietet."
            },
            {
                "title": "Offenes im Blick behalten",
                "desc": "Eine Übersicht zeigt offene Rückfragen und Zuständigkeiten. Preise und Zusagen gibt Ihr Betrieb frei."
            }
        ]
    },
    {
        "id": "property",
        "name": "Immobilienverwaltung",
        "subtitle": "Vom Postfach zum geklärten Vorgang.",
        "intro": "Beispiel: Eine Schadensmeldung kommt per E-Mail. Ein passender Ablauf ordnet sie einem Objekt zu, bereitet Rückfragen vor und hält den Bearbeitungsstand fest.",
        "cases": [
            {
                "title": "Objekt und Anliegen zuordnen",
                "desc": "Adresse, Einheit, Kontaktdaten und Fotos zusammenführen. Unklare Zuordnungen werden zur Prüfung markiert."
            },
            {
                "title": "Rückfragen vorbereiten",
                "desc": "Fehlende Angaben erkennen und einen passenden Antwortentwurf für die Verwaltung erstellen."
            },
            {
                "title": "Handwerker koordinieren",
                "desc": "Nach Freigabe eine Aufgabe mit Unterlagen und Terminvorschlägen vorbereiten. Die Verwaltung entscheidet über Beauftragung und Kosten."
            },
            {
                "title": "Status dokumentieren",
                "desc": "Offene Vorgänge und Rückmeldungen nachvollziehbar ablegen. Anbindungen richten sich nach den Schnittstellen der Verwaltungssoftware."
            }
        ]
    },
    {
        "id": "marketing",
        "name": "Agenturen & Marketing",
        "subtitle": "Mehr Zeit für Ideen. Weniger Übertragen.",
        "intro": "Hier bringe ich Erfahrung aus der Werbeagenturarbeit mit. Mögliche Anwendungen helfen zwischen Briefing, Abstimmung und Auswertung.",
        "cases": [
            {
                "title": "Briefings strukturieren",
                "desc": "Angaben aus freigegebenen Unterlagen bündeln und fehlende Informationen sichtbar machen."
            },
            {
                "title": "Varianten vorbereiten",
                "desc": "Textvarianten anhand Ihrer Tonalität und Formatvorgaben entwerfen. Auswahl und Freigabe bleiben beim Kreativteam."
            },
            {
                "title": "Freigaben nachhalten",
                "desc": "Versionen, Rückmeldungen und Zuständigkeiten in einem abgestimmten Ablauf zusammenführen."
            },
            {
                "title": "Berichte vorbereiten",
                "desc": "Freigegebene Kampagnendaten bündeln und Auffälligkeiten markieren. Das Team prüft die Interpretation und entscheidet."
            }
        ]
    },
    {
        "id": "healthcare",
        "name": "Praxisorganisation",
        "subtitle": "Weniger Verwaltungsaufwand im Praxisalltag.",
        "intro": "Ein möglicher Einstieg liegt in klar begrenzten organisatorischen Aufgaben. Datenarten, Zugriffsrechte und die vorhandene Praxissoftware bestimmen den Rahmen.",
        "cases": [
            {
                "title": "Organisatorische Anfragen ordnen",
                "desc": "Allgemeine Anliegen und Rückrufwünsche für das zuständige Team vorsortieren."
            },
            {
                "title": "Informationen bereitstellen",
                "desc": "Freigegebene organisatorische Antworten und Unterlagen auffindbar machen."
            },
            {
                "title": "Interne Aufgaben nachhalten",
                "desc": "Zuständigkeiten und Bearbeitungsstände übersichtlich abbilden."
            },
            {
                "title": "Den Rahmen vorher klären",
                "desc": "Zugriffe, Datenverarbeitung und Schnittstellen vor einer Umsetzung prüfen. Medizinische Entscheidungen sind kein Bestandteil dieser Beispiele."
            }
        ]
    }
];

const navLinks = [
    { name: "Status Quo", href: "#status-quo-section" },
    { name: "Leistungen", href: "#solutions" },
    { name: "Prozess", href: "#prozess" },
    { name: "Branchen", href: "#branchen" },
    { name: "Warum ich", href: "#warum-ich" },
    { name: "Webdesign", href: `${basePath}/webdesign/` }
];

const prozessData = [
    {
        n: "01",
        title: "Analyse",
        text: "Im unverbindlichen Erstgespräch klären wir, wo Zeit verloren geht und welcher Ablauf einen genaueren Blick verdient."
    },
    {
        n: "02",
        title: "Architektur",
        text: "Ich plane Datenwege, Freigaben und Schnittstellen. Umfang, Kosten und ein überprüfbares Ziel stehen vor dem Start fest."
    },
    {
        n: "03",
        title: "Entwicklung",
        text: "Ein erster Prototyp zeigt, wie der Ablauf funktioniert. Gemeinsam prüfen wir typische Fälle, Ausnahmen und Korrekturen."
    },
    {
        n: "04",
        title: "Betrieb",
        text: "Ich begleite Einführung und Übergabe. Betreuung, Hosting und Wartung vereinbaren wir passend zu Ihrer Lösung."
    }
];

export default function Page() {

    const [openIndustry, setOpenIndustry] = useState<string | null>(null);
    const [openSolution, setOpenSolution] = useState<string | null>(null);
    const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null);
    const [lockedIndustry, setLockedIndustry] = useState<string | null>("construction");
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [motionPaused, setMotionPaused] = useState(false);

    const typewriterRef = useRef<HTMLSpanElement>(null);
    const sqGeoCoreRef = useRef<HTMLDivElement>(null);
    const sqRingRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(-1);

    const desktopProgressFillsRef = useRef<(HTMLDivElement | null)[]>([]);
    const activeStepRef = useRef(-1);

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
        //     On mobile the hero simply stays put and content scrolls over it -- smooth by default. ---
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
            const cards = gsap.utils.toArray('.mobile-prozess-card') as HTMLElement[];
            const prozessWrapper = document.querySelector('#prozess');

            if (cards.length > 0 && prozessWrapper) {
                const tlMobile = gsap.timeline({
                    scrollTrigger: {
                        trigger: prozessWrapper,
                        start: "top 64px",
                        end: "+=1000",
                        // NO pin — the section is CSS-sticky and stays anchored while the
                        // 1000px spacer after it scrolls by (spacer height must match `end`).
                        // The next section then slides over the anchored one.
                        scrub: 0.6,
                        onUpdate: (self) => {
                            let step = -1;
                            if (self.progress >= 0.9) step = 3;
                            else if (self.progress >= 0.67) step = 2;
                            else if (self.progress >= 0.45) step = 1;
                            else if (self.progress >= 0.22) step = 0;

                            if (step !== activeStepRef.current) {
                                activeStepRef.current = step;
                                setActiveStep(step);
                            }
                        }
                    }
                });
                
                // All cards start hidden and pushed down
                gsap.set(cards, { opacity: 0, y: 50 });
                
                // Animate all cards in sequentially
                cards.forEach((card, idx) => {
                    tlMobile.to(card, {
                        opacity: 1,
                        y: 0,
                        duration: 0.25,
                        ease: "power2.out"
                    }, idx * 0.25);
                });
                
                // Add dead space (approx 100px / 1 scroll tick) so the 4th card finishes arriving just before unpinning
                tlMobile.set({}, {}, 1.10);
            }
        });

        // Remaining desktop animations
        mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
            // 5. BRANCHEN
            const branchenHeader = document.querySelector('#branchen > div > div:first-child') as HTMLElement;
            const branchenStrips = gsap.utils.toArray('#branchen .branchen-accordion-item') as HTMLElement[];
            
            const branchenTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#branchen',
                    start: "top 75%",
                    end: "center center",
                    scrub: 1,
                }
            });
            if (branchenHeader) branchenTl.fromTo(branchenHeader, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
            if (branchenStrips.length > 0) branchenTl.fromTo(branchenStrips, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 2, ease: "power2.out" }, "-=0.5");

            // 6. WARUM WIR
            const wwHeader = document.querySelector('#warum-ich > div > div:first-child') as HTMLElement;
            const wwCards = gsap.utils.toArray('#warum-ich .group') as HTMLElement[];
            
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
    }, { dependencies: [motionPaused], revertOnUpdate: true, scope: undefined });

    // --- 3D INTERACTION ---
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!sqGeoCoreRef.current) return;

        const coreRect = sqGeoCoreRef.current.getBoundingClientRect();
        const coreCenterX = coreRect.left + coreRect.width / 2;
        const coreCenterY = coreRect.top + coreRect.height / 2;

        let x = (e.clientX - coreCenterX) / (window.innerWidth / 2);
        let y = (e.clientY - coreCenterY) / (window.innerHeight / 2);

        x = Math.max(-2, Math.min(2, x));
        y = Math.max(-2, Math.min(2, y));

        const rotX = -y * 30;
        const rotY = (x * 40) - 15;

        sqGeoCoreRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

        if (sqRingRef.current) {
            sqRingRef.current.style.transform = `translateZ(20px) rotate(${12 + (x * 10)}deg)`;
        }
    };

    const handleMouseLeave = () => {
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
        const prefersReduced = typeof window !== 'undefined'
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced || motionPaused) {
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
    }, [motionPaused]);

    const openQuiz = () => setIsQuizOpen(true);

    return (
        <div className="bg-vanta text-bone font-sans antialiased relative w-full process-page" data-motion-paused={motionPaused} style={{ overflowX: 'clip' }}>
            <div className="noise-bg"></div>
            <a className="process-skip" href="#content-wrapper">Zum Inhalt</a>

            <SiteNav links={navLinks} onQuizOpen={openQuiz} homeHref="/" darkFrom="viewport" />

            {/* Hero – fixed in the background behind content */}
            <section className="fixed top-0 left-0 right-0 h-[100svh] flex flex-col bg-white z-0 overflow-hidden" id="hero-sticky-section">
                <div className="w-full flex-1 px-6 pt-24 pb-16 md:px-8 md:py-12 lg:px-10 lg:py-20 flex flex-col justify-start md:justify-center relative mx-auto max-w-[1440px]" style={{ perspective: '1200px', perspectiveOrigin: '50% 40%' }}>
                    <div className="font-mono mb-8 md:mb-8 uppercase text-sm font-medium tracking-wider md:tracking-widest hero-element">
                        <span className="brutalist-marker text-vanta">Prozesse & Automatisierung</span>
                    </div>

                    <h1 className="hero-headline text-vanta mb-6 md:mb-8" style={{ transformStyle: 'preserve-3d' }}>
                        <span className="hero-word inline-block">Systeme,</span><br />
                        <span className="hero-word inline-block">die</span>{" "}<span className="hero-word inline-block">Ihnen</span><br />
                        <span className="hero-word inline-block">Arbeit</span>{" "}<span className="hero-word inline-block brutalist-marker">abnehmen.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-mute leading-relaxed mb-10 md:mb-10 hero-element">
                        Anfragen sortieren, Daten übertragen, Vorgänge im Blick behalten.<br />
                        Ich verbinde Ihre Programme und automatisiere wiederkehrende Arbeit. Mit KI, wenn sie hilft.
                    </p>

                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6 hero-element">
                        <button onClick={openQuiz} className="btn-glitch inline-block bg-lime text-vanta font-mono font-bold uppercase py-4 px-8 border border-lime transition-all duration-75 cursor-pointer">
                            Potenzial Analysieren
                        </button>
                        <span className="font-mono text-xs text-mute uppercase block">Status: <br /><span className="text-vanta">unverbindlich</span></span>
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
                        <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[5%] pointer-events-none z-0 overflow-hidden opacity-20 lg:opacity-30 mix-blend-screen" style={{ perspective: '1200px' }}>
                        <div id="sq-geo-core" ref={sqGeoCoreRef} className="hidden lg:block relative w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] lg:w-[650px] lg:h-[650px] preserve-3d transition-transform duration-1000 ease-out" style={{ transform: "rotateX(0deg) rotateY(-15deg)" }}>
                            <div className="absolute inset-0 border border-gridline flex items-start p-4" style={{ transform: "translateZ(-100px)" }}>
                            </div>
                            <div id="sq-ring" ref={sqRingRef} className="absolute inset-8 border border-mute/30 rotate-12 transition-all duration-700" style={{ transform: "translateZ(20px)" }}></div>
                            <div className="absolute inset-20 border border-lime/10 -rotate-12" style={{ transform: "translateZ(80px)" }}></div>
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
                                Wenn Informationen zwischen Postfach, Tabellen und Software von Hand wandern, kostet das Zeit. Ich
                                entwickle <span className="bg-lime text-vanta px-1.5 py-0.5 font-normal">passende Abläufe und Werkzeuge</span>,
                                die Ihre vorhandene Arbeit sinnvoll unterstützen.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 pt-8 md:pt-12 border-t border-gridline/20 reveal" style={{ transitionDelay: '300ms' }}>
                            <p className="text-base md:text-lg text-bone/80 leading-relaxed">
                                <span className="text-lime">Der Ausgangspunkt</span> · Ein konkreter Ablauf, der Sie Zeit kostet. Gemeinsam klären wir Aufwand, Nutzen und die passende Umsetzung.
                            </p>
                            <p className="text-base md:text-lg text-bone/80 leading-relaxed">
                                <span className="text-lime">Das Ziel</span> · Weniger doppelte Arbeit und klare Zuständigkeiten. Ihr Team behält den Überblick und entscheidet, was freigegeben wird.
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
                                Ihr Alltag.<br />Einfacher organisiert.
                            </h2>
                        </div>
                        <p className="max-w-md text-bone/70 text-sm leading-relaxed font-light">
                            Egal ob bestehende Systeme intelligent vernetzen oder komplett neue Software entwickeln – ich baue
                            exakt die Lösung, die Ihr Problem löst.
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
                        <div className="md:hidden px-6 pt-6 border-x border-gridline bg-white flex flex-col justify-between h-full w-full gap-3">
                            <div className="flex flex-col gap-2">
                                <p className="font-mono text-xs uppercase tracking-widest">
                                    <span className="brutalist-marker text-vanta">Prozess</span>
                                </p>
                                <h2 className="text-2xl  font-bold leading-tight text-vanta">Der Weg zu<br />Ihrer Lösung.</h2>
                                <p className="text-mute text-xs leading-relaxed font-light">Transparente Meilensteine von der Analyse bis zum Betrieb. Keine Blackbox.</p>
                                
                                {/* Mobile Horizontal Progress bar */}
                                <div aria-hidden="true" className="flex flex-col w-full relative z-20 mt-3 mb-2">
                                    <div className="flex gap-1.5 w-full mb-2">
                                        {prozessData.map((s, i) => (
                                            <span key={s.n} className={`h-[2px] flex-1 transition-colors duration-500 ${i <= activeStep ? 'bg-lime' : 'bg-vanta/15'}`} />
                                        ))}
                                    </div>
                                    <div className="flex justify-between w-full">
                                        {prozessData.map((s, i) => (
                                            <div key={s.n} className="flex-1 text-left pr-1">
                                                <span className={`block w-fit font-mono text-[9px] tracking-widest px-1 -ml-1 transition-colors duration-300 ${activeStep >= i ? 'bg-lime text-vanta' : 'text-vanta/60'}`}>
                                                    {s.n}
                                                </span>
                                                <span className={`block text-[9px] sm:text-[10px] uppercase font-bold tracking-tight transition-colors duration-300 mt-0.5 ${activeStep === i ? 'text-vanta' : 'text-vanta/60'} truncate sm:whitespace-normal`}>
                                                    {s.title}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Mobile sequential cards under each other */}
                            <div className="flex flex-col flex-1 w-[calc(100%+3rem)] -mx-6">
                                {prozessData.map((s, i) => (
                                    <div
                                        key={s.n}
                                        className="mobile-prozess-card border-t border-gridline px-6 py-3 sm:py-4 bg-white flex flex-col justify-center flex-1 will-change-transform"
                                    >
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-mono bg-lime text-vanta px-1 text-base font-bold">{s.n}</span>
                                            <h3 className="text-sm  font-bold text-vanta">{s.title}</h3>
                                        </div>
                                        <p className="text-mute text-[11px] sm:text-xs leading-normal font-light">{s.text}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Mobile CTA Button — 5th tile */}
                            <div className="mt-auto w-[calc(100%+3rem)] -mx-6 border-t border-gridline px-6 py-5 bg-white">
                                <button 
                                    onClick={openQuiz}
                                    className="w-full btn-glitch bg-lime text-vanta font-mono font-bold uppercase py-3 px-5 border border-lime text-xs text-center cursor-pointer"
                                >
                                    Potenzial kostenlos analysieren
                                </button>
                            </div>
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
                                            className={`desktop-card-${i} absolute left-0 w-full p-8 lg:p-10 flex flex-col justify-center ${i === prozessData.length - 1 ? '' : 'border-b'} border-gridline ${zIndexClass} ${cardBgClass}`}
                                        >
                                            <div className={`prozess-number font-mono mb-4 text-2xl w-fit px-1.5 -ml-1.5 transition-colors duration-500 ${numberColorClass}`}>{s.n}</div>
                                            <h3 className={`prozess-title text-xl  font-bold mb-3 transition-colors duration-500 ${titleColorClass}`}>{s.title}</h3>
                                            <p className={`prozess-text text-sm leading-relaxed font-light max-w-md transition-colors duration-500 ${textColorClass}`}>{s.text}</p>
                                        </div>
                                    );
                                })}
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                {/* Mobile scrub distance: the section stays anchored (sticky) while this transparent
                    spacer scrolls by; then #branchen slides over it. Height must stay in sync with
                    the mobile ScrollTrigger end "+=1000". */}
                <div className="process-scroll-space h-[1000px] md:hidden pointer-events-none motion-reduce:hidden" aria-hidden="true" />

                <section id="branchen" className="border-b border-gridline bg-vanta text-white flex justify-center">
                    <div className="w-full max-w-[1440px]">
                        <div className="px-6 py-6 md:px-8 md:py-12 lg:px-10 lg:py-20 border-x border-gridline flex flex-col md:flex-row justify-between items-start md:items-end gap-8 reveal">
                        <div>
                            <p className="font-mono text-xs uppercase mb-6 tracking-widest">
                                <span className="brutalist-marker text-vanta">Mögliche Anwendungen</span>
                            </p>
                            <h2 className="section-headline">Wo sich Arbeit<br />vereinfachen lässt.</h2><p className="mt-6 max-w-xl text-base leading-relaxed text-bone/80">Die folgenden Beispiele zeigen mögliche Anwendungen. Welche davon für Ihren Betrieb sinnvoll und technisch möglich sind, klären wir anhand Ihrer Systeme und Abläufe.</p>
                        </div>
                        <p className="max-w-md md:text-right text-bone/70 text-sm leading-relaxed font-light">
                            Der passende Einstieg ist ein klar begrenzter Ablauf. Ich prüfe zuerst, was Ihre vorhandene Software bereits kann und wo eine Ergänzung hilft.
                        </p>
                    </div>

                    {/* Desktop: Split View (Master-Detail) */}
                    {(() => {
                        const activeId = hoveredIndustry || lockedIndustry;
                        const activeIndustry = industriesData.find(ind => ind.id === activeId);
                        return (
                    <div className="hidden md:flex w-full border-x border-t border-gridline bg-vanta relative z-10">
                        {/* Master List (Left Column) */}
                        <div className="w-1/3 lg:w-1/4 flex flex-col shrink-0 border-r border-gridline">
                            {industriesData.map((ind) => {
                                const isActive = ind.id === activeId;
                                return (
                                <div
                                    key={ind.id}
                                    role="button"
                                    tabIndex={0}
                                    aria-pressed={isActive}
                                    className={`flex-1 flex items-center px-6 lg:px-8 border-b border-gridline last:border-b-0 transition-colors duration-300 cursor-pointer branchen-accordion-item ${
                                        isActive ? 'bg-lime' : 'hover:bg-lime/10'
                                    }`}
                                    onMouseEnter={() => setHoveredIndustry(ind.id)}
                                    onMouseLeave={() => setHoveredIndustry(null)}
                                    onClick={() => setLockedIndustry(lockedIndustry === ind.id ? null : ind.id)}
                                    onKeyDown={(e) => onKeyToggle(e, () => setLockedIndustry(lockedIndustry === ind.id ? null : ind.id))}
                                >
                                    <h3 className={`text-sm lg:text-base  font-bold transition-colors ${
                                        isActive ? 'text-vanta' : 'text-white/75 hover:text-white'
                                    }`}>
                                        {ind.name}
                                    </h3>
                                </div>
                                );
                            })}
                        </div>

                        {/* Detail View (Right Column) */}
                        <div className="flex-1 flex items-start justify-center min-h-[450px] relative">
                            {!activeIndustry ? (
                                <div className="opacity-20 flex flex-col items-center">
                                    <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mb-6">
                                        <div className="w-2 h-2 bg-lime rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="font-mono text-xs uppercase tracking-widest text-white/80">
                                        [ Branche wählen ]
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-full flex flex-col justify-start p-8 lg:p-12 animate-fadeIn" key={activeIndustry.id}>
                                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start w-full">
                                        {/* Linke Spalte: Überschriften & Intro */}
                                        <div className="flex-1 flex flex-col justify-start">
                                            <div className="font-mono text-[10px] uppercase text-lime mb-3 tracking-widest">
                                                Beispiel · {activeIndustry.name}
                                            </div>
                                            <h3 className="text-3xl lg:text-4xl  font-black text-white mb-2 tracking-tight">
                                                {activeIndustry.name}
                                            </h3>
                                            {activeIndustry.subtitle && (
                                                <p className="text-sm lg:text-base font-bold text-lime mb-6 uppercase tracking-tight leading-snug">
                                                    {activeIndustry.subtitle}
                                                </p>
                                            )}
                                            <p className="text-white/80 text-sm leading-relaxed font-light border-l border-lime/50 pl-4 mt-2">
                                                {activeIndustry.intro}
                                            </p>
                                        </div>

                                        {/* Rechte Spalte: Die 4 Cases untereinander */}
                                        <div className="flex-[1.2] flex flex-col pt-6 lg:pt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-gridline/15 w-full justify-between">
                                            {activeIndustry.cases.map((c, i) => (
                                                <div key={i} className="relative border-b border-gridline/10 py-2.5 first:pt-0 last:pb-0 last:border-b-0">
                                                    <h4 className="text-[11px] lg:text-xs uppercase font-bold text-lime mb-0.5 tracking-wider">{c.title}</h4>
                                                    <p className="text-white/75 text-sm leading-relaxed font-light">{c.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                        );
                    })()}

                    {/* Mobile: Stacked Rows */}
                    <div className="md:hidden border-x border-gridline">
                        {industriesData.map((ind) => (
                            <div
                                key={ind.id}
                                role="button"
                                tabIndex={0}
                                aria-expanded={openIndustry === ind.id}
                                onClick={() => setOpenIndustry(openIndustry === ind.id ? null : ind.id)}
                                onKeyDown={(e) => onKeyToggle(e, () => setOpenIndustry(openIndustry === ind.id ? null : ind.id))}
                                className={`group border-b border-gridline last:border-b-0 px-6 py-5 transition-all duration-300 cursor-pointer ${openIndustry === ind.id ? 'bg-lime' : ''}`}
                            >
                                <h3 className={`text-lg  font-bold transition-colors ${openIndustry === ind.id ? 'text-vanta' : 'text-white/75'}`}>{ind.name}</h3>
                                <div className={`grid transition-all duration-500 ${openIndustry === ind.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                    <div className="overflow-hidden">
                                        <div className="flex flex-col gap-4 pt-4">
                                            {ind.subtitle && (
                                                <p className="text-vanta font-bold uppercase tracking-tight text-xs leading-snug">{ind.subtitle}</p>
                                            )}
                                            {ind.intro && (
                                                <p className="text-vanta/80 text-xs leading-relaxed border-b border-vanta/10 pb-4">{ind.intro}</p>
                                            )}
                                            <div className="space-y-4">
                                                {ind.cases.map((c, i) => (
                                                    <div key={i}>
                                                        <h4 className="text-xs uppercase font-bold text-vanta/90 mb-1">{c.title}</h4>
                                                        <p className="text-vanta/80 text-sm">{c.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                </section>

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
                                className={`group relative p-6 sm:p-8 lg:p-10 overflow-hidden transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#0a0a0a] hover:border-[#0a0a0a] reveal z-10 ${
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
                            <p className="text-bone/70 text-sm max-w-sm">Ich bin Leo. Mich interessiert, wie Ihr Unternehmen arbeitet – und was Ihnen im Alltag tatsächlich helfen würde.</p>
                        </div>

                        <article className="lg:col-span-8 bg-[#0a0a0a] process-profile">
                            <img src={`${basePath}/FOTOS/leonid_cropped_2.webp`} alt="Leonid Ryazanskiy, Ihr Ansprechpartner bei leoquent" width="720" height="900" loading="lazy" className="process-portrait" />
                            <div className="p-6 md:p-10">
                                <h3 className="text-3xl font-bold mb-5">Leonid Ryazanskiy.<br /><span className="text-lime">Einfach Leo.</span></h3>
                                <p className="text-base leading-relaxed text-white/80 mb-5">Seit über einem Jahrzehnt arbeite ich als Copywriter und Konzeptioner für Marken. In Agenturen wie Scholz &amp; Friends, Serviceplan und Havas habe ich gelernt, komplexe Aufgaben zu verstehen, die entscheidenden Fragen zu stellen und daraus klare Konzepte zu entwickeln.</p>
                                <p className="text-base leading-relaxed text-white/80 mb-5">Diese Arbeit verbindet Strategie und Kreativität. Ein gutes Konzept muss zu den Menschen passen, die damit arbeiten – und sich im Alltag bewähren. Genau diesen Blick bringe ich in Ihre Prozesse ein: Was braucht Ihr Team? Wo stockt die Arbeit? Und welche Verbindung oder welches Werkzeug würde wirklich helfen?</p>
                                <p className="text-base leading-relaxed text-white/80 mb-5">In KI-Workshops habe ich Creative Teams an neue Arbeitsweisen herangeführt. Heute entwickle ich selbst passende Anwendungen und Automatisierungen. Dabei übersetze ich Anforderungen in klare Abläufe, Datenwege und Regeln für die Zusammenarbeit zwischen Mensch und Software.</p>
                                <p className="text-base leading-relaxed text-white/80 mb-5">Sie sprechen direkt mit mir – von der ersten Frage über den Prototyp bis zur Einführung. Ich mache Zusammenhänge verständlich und halte Ziele, Grenzen und nächste Schritte fest. Je nach Aufgabe ergänze ich meine Arbeit durch mein Netzwerk aus Entwicklung und Gestaltung.</p>
                                <p className="text-sm leading-relaxed text-white/70 border-t border-gridline pt-5">Arbeiten aus meiner Werbelaufbahn wurden unter anderem bei Cannes Lions, ADC, New York Festivals und The One Show ausgezeichnet. Diese Erfahrung prägt meinen Blick auf Qualität und verständliche Kommunikation.</p>
                            </div>
                        </article>

                    </div>
                </div>
            </section>

                <section id="cta" className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-vanta text-white w-full">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                        <span className="text-[20vw] font-bold uppercase leading-none">Freiraum</span>
                    </div>

                    <div className="relative z-10 w-full max-w-2xl mx-auto reveal">
                        <h2 className="text-5xl md:text-7xl  font-bold mb-6">Bereit für echte<br /><span className="brutalist-marker">Freiräume?</span></h2>
                        <p className="text-bone/70 mb-12">Erzählen Sie mir von einem Ablauf, der Sie im Alltag aufhält. Im unverbindlichen Erstgespräch klären wir, ob und wie ich Ihnen helfen kann.</p>

                        <button onClick={openQuiz} className="bg-lime text-vanta font-mono font-bold uppercase px-10 py-5 hover:bg-white hover:text-vanta transition-colors duration-300 btn-glitch border border-lime cursor-pointer text-lg">
                            Ablauf besprechen
                        </button>
                    </div>
                </section>

                <SiteFooter />
            </main>

            {/* Quiz Modal */}
            <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
        </div>
    );
}


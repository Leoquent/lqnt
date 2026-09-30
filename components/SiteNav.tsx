"use client";

import { useEffect, useState, useRef } from "react";
import LqntMark from "@/components/LqntMark";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export type NavLink = { name: string; href: string };

interface SiteNavProps {
    links: NavLink[];
    /** Öffnet den Funnel. Ohne Callback wird der CTA zur Telefonnummer. */
    onQuizOpen?: () => void;
    /** Ziel der Wortmarke. Auf der Startseite "#" (scrollt nach oben), sonst "/". */
    homeHref?: string;
    /**
     * Ab wann die Leiste von hell auf dunkel kippt. Die Startseite und /prozesse haben
     * einen bildschirmhohen hellen Hero, deshalb der Standard `viewport`. Seiten mit
     * kurzem Hero setzen `short` — dort kippt die Leiste schon nach 120 px.
     */
    darkFrom?: "viewport" | "short";
}

export default function SiteNav({ links, onQuizOpen, homeHref = "/", darkFrom = "viewport" }: SiteNavProps) {
    const [navScrolled, setNavScrolled] = useState(false);
    const [pastHero, setPastHero] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuButton = useRef<HTMLButtonElement>(null);
    const overlay = useRef<HTMLDivElement>(null);

    // rAF-gekoppelt: höchstens ein State-Abgleich pro Frame, blockiert das Scrollen nie
    useEffect(() => {
        let ticking = false;
        const update = () => {
            ticking = false;
            const y = window.scrollY;
            setNavScrolled(y > 50);
            setPastHero(darkFrom === "short" ? y > 120 : y > window.innerHeight - 100);
        };
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        update();
        return () => window.removeEventListener("scroll", onScroll);
    }, [darkFrom]);

    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") { setIsMobileMenuOpen(false); menuButton.current?.focus(); }
            if (event.key === "Tab") {
                const targets = [menuButton.current, ...Array.from(overlay.current?.querySelectorAll<HTMLElement>("a,button") || [])].filter(Boolean) as HTMLElement[];
                const index = targets.indexOf(document.activeElement as HTMLElement);
                event.preventDefault();
                targets[(index + (event.shiftKey ? targets.length - 1 : 1)) % targets.length]?.focus();
            }
        };
        const closeOnDesktop = () => { if (window.innerWidth >= 1024) setIsMobileMenuOpen(false); };
        window.addEventListener("keydown", onKey);
        window.addEventListener("resize", closeOnDesktop);
        return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); window.removeEventListener("resize", closeOnDesktop); };
    }, [isMobileMenuOpen]);

    const closeMenu = () => setIsMobileMenuOpen(false);

    const handleHome = (e: React.MouseEvent) => {
        closeMenu();
        if (homeHref === "#") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const dark = pastHero || isMobileMenuOpen;

    const cta = onQuizOpen ? (
        <button
            onClick={() => {
                onQuizOpen();
                closeMenu();
            }}
            className={`font-mono text-[11px] sm:text-sm border px-3.5 py-2.5 sm:px-4 sm:py-2 uppercase transition-all duration-500 ease-in-out cursor-pointer ${
                dark ? "bg-lime text-vanta border-lime btn-glitch" : "border-gridline hover:border-lime hover:text-lime bg-vanta text-white"
            } ${isMobileMenuOpen ? "opacity-0 pointer-events-none translate-x-2" : "opacity-100 translate-x-0"}`}
        >
            <span className="sm:hidden">ANALYSE</span>
            <span className="hidden sm:inline">Potenzial analysieren</span>
        </button>
    ) : null;

    return (
        <nav
            id="main-nav"
            className={`fixed top-0 w-full z-50 border-b transition-colors duration-300 flex justify-center ${navScrolled ? "shadow-2xl" : ""} ${
                dark ? "bg-vanta text-white border-gridline" : "bg-white text-vanta border-black/5"
            }`}
        >
            <div
                className={`w-full max-w-[1440px] flex justify-between items-center px-6 md:px-8 lg:px-10 py-4 lg:transition-[padding] lg:duration-300 ${
                    navScrolled ? "lg:py-3" : "lg:py-6"
                }`}
            >
                {/* Header führt bewusst kein Lockup, sondern Bildmarke + lebenden HTML-Text
                    (brand/LOGO.md). Farbregel: Lime auf Dunkel, Vanta auf Hell. */}
                <a
                    href={homeHref === "#" ? "#" : `${basePath}${homeHref}`}
                    onClick={handleHome}
                    className="flex items-center gap-2 sm:gap-3 shrink-0 hover:opacity-80 transition-opacity cursor-pointer z-50"
                >
                    <LqntMark className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 transition-colors duration-300 ${dark ? "text-lime" : "text-vanta"}`} />
                    <span className="font-sans font-bold text-lg sm:text-xl lowercase tracking-[-0.035em] leading-none mt-[-1px]">leoquent</span>
                </a>

                <div className={`hidden lg:flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest ${dark ? "text-bone/70" : "text-mute"}`}>
                    {links.map((link) => (
                        <a key={link.name} href={link.href} className={`transition-colors ${dark ? "hover:text-lime" : "hover:text-vanta"}`}>
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 shrink-0">
                    <a href="/" className={`hidden sm:flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-colors ${dark ? "text-bone hover:text-lime" : "text-mute hover:text-vanta"}`}>
                        Alle Leistungen
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 11L11 1M11 1H3.5M11 1V8.5" /></svg>
                    </a>
                    {cta}
                    <button
                        ref={menuButton}
                        aria-controls="process-mobile-menu"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden flex flex-col justify-center items-center w-11 h-11 -m-1.5 z-50 relative ${isMobileMenuOpen ? "menu-open" : ""}`}
                        aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className={`hamburger-line line-top w-6 h-0.5 mb-1.5 ${dark ? "bg-white" : "bg-vanta"}`} />
                        <span className={`hamburger-line line-middle w-6 h-0.5 mb-1.5 ${dark ? "bg-white" : "bg-vanta"}`} />
                        <span className={`hamburger-line line-bottom w-6 h-0.5 ${dark ? "bg-white" : "bg-vanta"}`} />
                    </button>
                </div>
            </div>

            <div
                ref={overlay}
                id="process-mobile-menu"
                inert={!isMobileMenuOpen}
                className={`fixed inset-0 bg-vanta z-40 mobile-menu-overlay flex flex-col justify-center items-center lg:hidden ${
                    isMobileMenuOpen ? "opacity-100 visible mobile-menu-open" : "opacity-0 invisible pointer-events-none"
                }`}
            >
                <div className="flex flex-col gap-8 text-center px-10">
                    <a href="/" onClick={closeMenu} className="mobile-menu-link text-xl font-bold uppercase tracking-widest text-lime hover:text-white transition-colors" style={{ transitionDelay: "0ms" }}>
                        Alle Leistungen
                    </a>
                    {links.map((link, i) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={closeMenu}
                            className="mobile-menu-link text-3xl font-bold uppercase tracking-tighter text-white hover:text-lime transition-colors"
                            style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                        >
                            {link.name}
                        </a>
                    ))}
                    {onQuizOpen && (
                        <button
                            onClick={() => {
                                onQuizOpen();
                                closeMenu();
                            }}
                            className="mobile-menu-link mt-4 inline-block bg-lime text-vanta font-mono font-bold uppercase py-4 px-8 border border-lime cursor-pointer"
                            style={{ transitionDelay: "500ms" }}
                        >
                            Potenzial Analysieren
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

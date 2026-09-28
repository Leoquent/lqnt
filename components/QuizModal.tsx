"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Beim Build statisch eingesetzt: Next.js ersetzt process.env.NEXT_PUBLIC_* durch den Wert.
// Fehlt der Key, senden wir gar nicht erst los — dann greift sofort der sichtbare Ausweichweg
// mit Mail und Telefon unten, statt den Besucher erst in einen Fehlversuch laufen zu lassen.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

// ─── QUIZ DATA ───────────────────────────────────────────────

const STEPS = [
    {
        id: "goal",
        label: "Schritt 1 von 5",
        headline: "Was ist Ihr primäres Ziel?",
        subline: "Wählen Sie die Option, die am besten zu Ihrem Vorhaben passt.",
        type: "single-choice" as const,
        options: [
            "Prozesse & Administration automatisieren",
            "Mehr Leads / Kundenanfragen generieren",
            "Bestehende Software intelligent vernetzen",
            "Neue Website / Digitales Rebranding",
        ],
        hasOther: true,
    },
    {
        id: "painpoint",
        label: "Schritt 2 von 5",
        headline: "Wo verliert Ihr Team am meisten Zeit?",
        subline: "Identifizieren Sie den größten Flaschenhals.",
        type: "single-choice-with-dropdown" as const,
        options: [
            "Manuelle Datenpflege & Dokumentation",
            "Beantwortung von Standard-Kundenanfragen",
            "Koordination & interne Abstimmung",
            "Veraltete, unübersichtliche Software",
        ],
        hasOther: true,
        dropdown: {
            label: "Teamgröße",
            placeholder: "Mitarbeiteranzahl wählen",
            options: [
                "1 – 5 Mitarbeiter",
                "6 – 20 Mitarbeiter",
                "21 – 50 Mitarbeiter",
                "51 – 200 Mitarbeiter",
                "200+ Mitarbeiter",
            ],
        },
    },
    {
        id: "timeline",
        label: "Schritt 3 von 5",
        headline: "Wie schnell soll die Lösung stehen?",
        subline: "Das hilft uns, Ihr Projekt richtig einzuplanen.",
        type: "single-choice" as const,
        options: [
            "So schnell wie möglich (akuter Bedarf)",
            "In den nächsten 1 – 3 Monaten",
            "In den nächsten 3 – 6 Monaten",
            "Ich orientiere mich erstmal",
        ],
        hasOther: false,
    },
    {
        id: "maturity",
        label: "Schritt 4 von 5",
        headline: "Nutzen Sie bereits KI-Tools oder Automatisierung?",
        subline: "Damit wir genau wissen, wo wir ansetzen können.",
        type: "single-choice" as const,
        options: [
            "Nein, noch gar nicht",
            "Ja, einzelne Tools (z. B. ChatGPT, Zapier)",
            "Ja, wir haben bereits eigene Automationen",
            "Wir sind unsicher, was möglich ist",
        ],
        hasOther: false,
    },
    {
        id: "contact",
        label: "Schritt 5 von 5",
        headline: "Fast geschafft – wie erreichen wir Sie?",
        subline: "100% kostenlos & unverbindlich. Ihre Daten werden vertraulich behandelt und dienen uns zur Vorbereitung auf unser Gespräch.",
        type: "contact" as const,
    },
];

// ─── TYPES ───────────────────────────────────────────────────

interface QuizAnswers {
    goal: string;
    goalOther: string;
    painpoint: string;
    painpointOther: string;
    teamSize: string;
    timeline: string;
    maturity: string;
    name: string;
    email: string;
    phone: string;
    website: string;
}

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// ─── COMPONENT ───────────────────────────────────────────────

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState<"forward" | "backward">("forward");
    const [isAnimating, setIsAnimating] = useState(false);
    const [answers, setAnswers] = useState<QuizAnswers>({
        goal: "",
        goalOther: "",
        painpoint: "",
        painpointOther: "",
        teamSize: "",
        timeline: "",
        maturity: "",
        name: "",
        email: "",
        phone: "",
        website: "",
    });
    const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");

    const containerRef = useRef<HTMLDivElement>(null);
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    // Focus management: remember the trigger element, restore focus on close
    useEffect(() => {
        if (!isOpen) return;
        lastFocusedRef.current = document.activeElement as HTMLElement | null;
        return () => lastFocusedRef.current?.focus();
    }, [isOpen]);

    // Move focus into the dialog on open and when switching to the success screen
    useEffect(() => {
        if (isOpen) containerRef.current?.focus();
    }, [isOpen, submitState]);

    // Reset when modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentStep(0);
            setDirection("forward");
            setAnswers({
                goal: "", goalOther: "", painpoint: "", painpointOther: "",
                teamSize: "", timeline: "", maturity: "",
                name: "", email: "", phone: "", website: "",
            });
            setSubmitState("idle");
        }
    }, [isOpen]);

    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // ESC closes, Tab is trapped inside the dialog
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
            return;
        }
        if (e.key === "Tab" && containerRef.current) {
            const focusables = containerRef.current.querySelectorAll<HTMLElement>(
                'button:not([disabled]), [href], input, select, textarea'
            );
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const active = document.activeElement as HTMLElement | null;
            if (e.shiftKey && (active === first || !containerRef.current.contains(active))) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen, handleKeyDown]);

    // ─── NAVIGATION ──────────────────────────────────────────

    const goNext = () => {
        if (currentStep < STEPS.length - 1 && !isAnimating) {
            setDirection("forward");
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep((s) => s + 1);
                setIsAnimating(false);
            }, 300);
        }
    };

    const goBack = () => {
        if (currentStep > 0 && !isAnimating) {
            setDirection("backward");
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep((s) => s - 1);
                setIsAnimating(false);
            }, 300);
        }
    };

    // ─── VALIDATION ──────────────────────────────────────────

    const isStepValid = (): boolean => {
        const step = STEPS[currentStep];
        switch (step.id) {
            case "goal":
                return answers.goal !== "" && (answers.goal !== "__other__" || answers.goalOther.trim() !== "");
            case "painpoint":
                return answers.painpoint !== "" && (answers.painpoint !== "__other__" || answers.painpointOther.trim() !== "") && answers.teamSize !== "";
            case "timeline":
                return answers.timeline !== "";
            case "maturity":
                return answers.maturity !== "";
            case "contact":
                return answers.name.trim() !== "" && answers.email.trim() !== "" && answers.phone.trim() !== "";
            default:
                return false;
        }
    };

    // ─── CHOICE SELECTION ────────────────────────────────────

    const handleSelect = (field: keyof QuizAnswers, value: string) => {
        setAnswers((prev) => ({ ...prev, [field]: value }));
    };

    const handleInput = (field: keyof QuizAnswers, value: string) => {
        setAnswers((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setSubmitState("sending");
        setIsAnimating(true);

        if (!WEB3FORMS_KEY) {
            console.error(
                "NEXT_PUBLIC_WEB3FORMS_KEY ist beim Build nicht gesetzt — Anfrage nicht gesendet. " +
                "Der Besucher sieht den Ausweichweg mit Mail und Telefon."
            );
            setSubmitState("error");
            setIsAnimating(false);
            return;
        }

        const goal = answers.goal === "__other__" ? answers.goalOther : answers.goal;
        const painpoint = answers.painpoint === "__other__" ? answers.painpointOther : answers.painpoint;

        try {
            const res = await fetch(WEB3FORMS_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject: `Neue Potenzialanalyse-Anfrage – ${answers.name || "Website-Lead"}`,
                    from_name: "Leoquent Website",
                    replyto: answers.email,
                    Name: answers.name,
                    "E-Mail": answers.email,
                    Telefon: answers.phone,
                    Website: answers.website || "—",
                    Ziel: goal || "—",
                    Flaschenhals: painpoint || "—",
                    "Teamgröße": answers.teamSize || "—",
                    Zeitrahmen: answers.timeline || "—",
                    "KI-Reife": answers.maturity || "—",
                    botcheck: "",
                }),
            });
            const json = await res.json();
            if (res.ok && json.success) {
                setSubmitState("success");
            } else {
                console.error("Web3Forms error", json);
                setSubmitState("error");
            }
        } catch (err) {
            console.error("Failed to submit lead", err);
            setSubmitState("error");
        } finally {
            setIsAnimating(false);
        }
    };

    // ─── PROGRESS ────────────────────────────────────────────

    const progress = ((currentStep + 1) / STEPS.length) * 100;

    if (!isOpen) return null;

    // ─── SUCCESS SCREEN ──────────────────────────────────────
    if (submitState === "success") {
        return (
            <div ref={containerRef} tabIndex={-1} className="fixed inset-0 z-[9998] flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Anfrage gesendet">
                <div className="absolute inset-0 bg-vanta/90 backdrop-blur-md quiz-backdrop-enter" onClick={onClose} />
                <div className="relative z-10 w-full max-w-lg mx-4 sm:mx-6 quiz-modal-enter bg-[#0a0a0a] border border-gridline">
                    <button onClick={onClose} className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center text-white/50 hover:text-lime transition-colors" aria-label="Schließen">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeWidth={2} d="M6 6l12 12M6 18L18 6" /></svg>
                    </button>
                    <div className="h-1 bg-lime w-full" />
                    <div className="px-6 py-10 sm:px-10 sm:py-14 text-center">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-lime/70 mb-4">Anfrage erhalten</div>
                        <h2 className="text-2xl sm:text-3xl uppercase font-bold text-white mb-3 tracking-tight">Danke, wir melden uns.</h2>
                        <p className="text-sm text-bone/60 font-light mb-8 leading-relaxed">
                            Ihre Angaben sind eingegangen. Wir melden uns. Wenn es schneller gehen soll, schreiben Sie direkt.
                        </p>
                        {/* Der frühere Button führte auf einen fremden Calendly-Account
                            (calendly.com/ofxffm) und ist deshalb entfernt. Sobald ein eigener
                            Account steht, kommt der Termin-Button hier zurück — siehe PLAN.md A4.
                            Telefonnummer ergänzen, sobald sie feststeht. */}
                        <a href="mailto:hi@lqnt.de" className="inline-block bg-lime text-vanta font-mono font-bold uppercase px-8 py-4 border border-lime btn-glitch text-sm">
                            hi@lqnt.de
                        </a>
                        <button onClick={onClose} className="block mx-auto mt-6 font-mono text-xs uppercase tracking-widest text-bone/60 hover:text-white transition-colors">
                            Schließen
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const step = STEPS[currentStep];

    // ─── RENDER ──────────────────────────────────────────────

    return (
        <div
            ref={containerRef}
            tabIndex={-1}
            className="fixed inset-0 z-[9998] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Potenzialanalyse Quiz"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-vanta/90 backdrop-blur-md quiz-backdrop-enter"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative z-10 w-full max-w-2xl mx-4 sm:mx-6 max-h-[90vh] flex flex-col quiz-modal-enter">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 flex items-center justify-center text-white/50 hover:text-lime transition-colors group"
                    aria-label="Schließen"
                >
                    <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeWidth={2} d="M6 6l12 12M6 18L18 6" />
                    </svg>
                </button>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-gridline shrink-0 overflow-hidden">
                    <div
                        className="h-full bg-lime transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto bg-[#0a0a0a] border border-gridline border-t-0">
                    <div className="px-6 py-8 sm:px-10 sm:py-12">

                        {/* Step Label */}
                        <div className="font-mono text-[10px] uppercase tracking-widest text-lime/70 mb-2">
                            {step.label}
                        </div>

                        {/* Headline */}
                        <h2
                            className={`text-2xl sm:text-3xl uppercase font-bold text-white mb-2 tracking-tight quiz-step-content ${isAnimating ? (direction === "forward" ? "quiz-exit-left" : "quiz-exit-right") : "quiz-enter"}`}
                        >
                            {step.headline}
                        </h2>

                        {/* Subline */}
                        <p
                            className={`text-sm text-bone/60 font-light mb-8 sm:mb-10 quiz-step-content ${isAnimating ? (direction === "forward" ? "quiz-exit-left" : "quiz-exit-right") : "quiz-enter"}`}
                        >
                            {step.subline}
                        </p>

                        {/* ─── STEP BODY ───────────────────────── */}
                        <div className={`quiz-step-content ${isAnimating ? (direction === "forward" ? "quiz-exit-left" : "quiz-exit-right") : "quiz-enter"}`}>

                            {/* Single Choice Steps (1, 3, 4) */}
                            {(step.type === "single-choice") && (
                                <div className="flex flex-col gap-3">
                                    {step.options?.map((option) => {
                                        const field = step.id as keyof QuizAnswers;
                                        const isSelected = answers[field] === option;
                                        return (
                                            <button
                                                key={option}
                                                onClick={() => handleSelect(field, option)}
                                                aria-pressed={isSelected}
                                                className={`w-full text-left px-5 py-4 border font-mono text-sm transition-all duration-300 ${
                                                    isSelected
                                                        ? "bg-lime text-vanta border-lime"
                                                        : "bg-transparent text-white/80 border-gridline hover:border-lime/50 hover:text-white"
                                                }`}
                                            >
                                                {option}
                                            </button>
                                        );
                                    })}

                                    {/* "Sonstiges" option with text field */}
                                    {step.hasOther && (
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => handleSelect(step.id as keyof QuizAnswers, "__other__")}
                                                aria-pressed={answers[step.id as keyof QuizAnswers] === "__other__"}
                                                className={`w-full text-left px-5 py-4 border font-mono text-sm transition-all duration-300 ${
                                                    answers[step.id as keyof QuizAnswers] === "__other__"
                                                        ? "bg-lime text-vanta border-lime"
                                                        : "bg-transparent text-white/80 border-gridline hover:border-lime/50 hover:text-white"
                                                }`}
                                            >
                                                Sonstiges
                                            </button>
                                            {answers[step.id as keyof QuizAnswers] === "__other__" && (
                                                <input
                                                    type="text"
                                                    placeholder="Bitte beschreiben Sie Ihr Anliegen..."
                                                    aria-label="Sonstiges Anliegen beschreiben"
                                                    value={answers[`${step.id}Other` as keyof QuizAnswers] || ""}
                                                    onChange={(e) => handleInput(`${step.id}Other` as keyof QuizAnswers, e.target.value)}
                                                    className="w-full bg-transparent border border-lime/30 text-white px-5 py-4 font-mono text-sm focus:outline-none focus:border-lime transition-colors placeholder:text-white/50 rounded-none quiz-field-enter"
                                                    autoFocus
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 2: Single Choice + Dropdown */}
                            {step.type === "single-choice-with-dropdown" && (
                                <div className="flex flex-col gap-6">
                                    {/* Choices */}
                                    <div className="flex flex-col gap-3">
                                        {step.options?.map((option) => {
                                            const isSelected = answers.painpoint === option;
                                            return (
                                                <button
                                                    key={option}
                                                    onClick={() => handleSelect("painpoint", option)}
                                                    aria-pressed={isSelected}
                                                    className={`w-full text-left px-5 py-4 border font-mono text-sm transition-all duration-300 ${
                                                        isSelected
                                                            ? "bg-lime text-vanta border-lime"
                                                            : "bg-transparent text-white/80 border-gridline hover:border-lime/50 hover:text-white"
                                                    }`}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}

                                        {/* "Sonstiges" option */}
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => handleSelect("painpoint", "__other__")}
                                                aria-pressed={answers.painpoint === "__other__"}
                                                className={`w-full text-left px-5 py-4 border font-mono text-sm transition-all duration-300 ${
                                                    answers.painpoint === "__other__"
                                                        ? "bg-lime text-vanta border-lime"
                                                        : "bg-transparent text-white/80 border-gridline hover:border-lime/50 hover:text-white"
                                                }`}
                                            >
                                                Sonstiges
                                            </button>
                                            {answers.painpoint === "__other__" && (
                                                <input
                                                    type="text"
                                                    placeholder="Bitte beschreiben Sie Ihren Flaschenhals..."
                                                    aria-label="Sonstigen Flaschenhals beschreiben"
                                                    value={answers.painpointOther}
                                                    onChange={(e) => handleInput("painpointOther", e.target.value)}
                                                    className="w-full bg-transparent border border-lime/30 text-white px-5 py-4 font-mono text-sm focus:outline-none focus:border-lime transition-colors placeholder:text-white/50 rounded-none quiz-field-enter"
                                                    autoFocus
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Team Size Dropdown */}
                                    <div className="border-t border-gridline pt-6">
                                        <label htmlFor="quiz-teamsize" className="font-mono text-[10px] uppercase tracking-widest text-lime/70 block mb-3">
                                            {step.dropdown?.label}
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="quiz-teamsize"
                                                value={answers.teamSize}
                                                onChange={(e) => handleInput("teamSize", e.target.value)}
                                                className="w-full bg-[#0a0a0a] border border-gridline text-white px-5 py-4 font-mono text-sm focus:outline-none focus:border-lime transition-colors appearance-none cursor-pointer rounded-none hover:border-lime/50"
                                            >
                                                <option value="" disabled className="text-mute">
                                                    {step.dropdown?.placeholder}
                                                </option>
                                                {step.dropdown?.options.map((opt) => (
                                                    <option key={opt} value={opt} className="bg-vanta text-white">
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* Custom dropdown arrow */}
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg className="w-4 h-4 text-lime/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="square" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 5: Contact Form */}
                            {step.type === "contact" && (
                                <div className="flex flex-col gap-5">
                                    <div>
                                        <label htmlFor="quiz-name" className="font-mono text-[10px] uppercase tracking-widest text-lime/70 block mb-2">Name *</label>
                                        <input
                                            id="quiz-name"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Max Mustermann"
                                            value={answers.name}
                                            onChange={(e) => handleInput("name", e.target.value)}
                                            className="w-full bg-transparent border border-gridline text-white px-5 py-4 font-mono text-sm focus:outline-none focus:border-lime transition-colors placeholder:text-white/50 rounded-none"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="quiz-email" className="font-mono text-[10px] uppercase tracking-widest text-lime/70 block mb-2">E-Mail *</label>
                                        <input
                                            id="quiz-email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="ihre@email.com"
                                            value={answers.email}
                                            onChange={(e) => handleInput("email", e.target.value)}
                                            className="w-full bg-transparent border border-gridline text-white px-5 py-4 font-mono text-sm focus:outline-none focus:border-lime transition-colors placeholder:text-white/50 rounded-none"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="quiz-phone" className="font-mono text-[10px] uppercase tracking-widest text-lime/70 block mb-2">Telefonnummer *</label>
                                        <input
                                            id="quiz-phone"
                                            type="tel"
                                            autoComplete="tel"
                                            placeholder="+49 123 456 7890"
                                            value={answers.phone}
                                            onChange={(e) => handleInput("phone", e.target.value)}
                                            className="w-full bg-transparent border border-gridline text-white px-5 py-4 font-mono text-sm focus:outline-none focus:border-lime transition-colors placeholder:text-white/50 rounded-none"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="quiz-website" className="font-mono text-[10px] uppercase tracking-widest text-lime/70 block mb-2">Website <span className="text-bone/60">(Optional)</span></label>
                                        <input
                                            id="quiz-website"
                                            type="url"
                                            autoComplete="url"
                                            placeholder="https://ihre-website.de"
                                            value={answers.website}
                                            onChange={(e) => handleInput("website", e.target.value)}
                                            className="w-full bg-transparent border border-gridline text-white px-5 py-4 font-mono text-sm focus:outline-none focus:border-lime transition-colors placeholder:text-white/50 rounded-none"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer: Navigation Buttons */}
                <div className="bg-[#0a0a0a] border border-gridline border-t-0 px-6 py-5 sm:px-10 flex items-center justify-between shrink-0">
                    {/* Back */}
                    {currentStep > 0 ? (
                        <button
                            onClick={goBack}
                            className="font-mono text-xs uppercase tracking-widest text-bone/60 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="square" strokeWidth={2} d="M19 12H5m7-7l-7 7 7 7" />
                            </svg>
                            Zurück
                        </button>
                    ) : (
                        <div />
                    )}

                    {/* Next / Submit */}
                    {currentStep < STEPS.length - 1 ? (
                        <button
                            onClick={goNext}
                            disabled={!isStepValid()}
                            className={`font-mono text-sm uppercase tracking-wider px-6 py-3 border transition-all duration-300 flex items-center gap-2 ${
                                isStepValid()
                                    ? "bg-lime text-vanta border-lime hover:bg-white hover:text-vanta hover:border-white btn-glitch"
                                    : "bg-transparent text-mute/40 border-gridline/50 cursor-not-allowed"
                            }`}
                        >
                            Weiter
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="square" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                            </svg>
                        </button>
                    ) : (
                        <div className="flex flex-col items-end gap-2">
                            {/* Sichtbarer Ausweichweg statt stillem Lead-Verlust: wenn der Versand
                                scheitert (fehlender Key, Netzfehler, Web3Forms down), muss der
                                Interessent uns trotzdem erreichen können. Siehe PLAN.md D4. */}
                            {submitState === "error" && (
                                <div role="alert" className="text-right font-mono text-[10px] uppercase tracking-wider">
                                    <span className="text-red-400 block mb-1">Senden fehlgeschlagen.</span>
                                    <span className="text-bone/60 block normal-case tracking-normal">
                                        Bitte erneut versuchen — oder direkt:{" "}
                                        <a href="mailto:hi@lqnt.de" className="text-lime hover:underline">hi@lqnt.de</a>
                                        {" · "}
                                        <a href="tel:+4917647177623" className="text-lime hover:underline">+49 176 47 177 623</a>
                                    </span>
                                </div>
                            )}
                            {submitState !== "sending" && (
                                <span className="font-mono text-[9px] uppercase tracking-widest text-lime/80 select-none mb-1">
                                    [ 100% kostenlos & unverbindlich ]
                                </span>
                            )}
                            <button
                                onClick={handleSubmit}
                                disabled={!isStepValid() || submitState === "sending"}
                                className={`font-mono text-sm uppercase tracking-wider px-6 py-3 border transition-all duration-300 ${
                                    isStepValid() && submitState !== "sending"
                                        ? "bg-lime text-vanta border-lime hover:bg-white hover:text-vanta hover:border-white btn-glitch"
                                        : "bg-transparent text-mute/40 border-gridline/50 cursor-not-allowed"
                                }`}
                            >
                                {submitState === "sending" ? "Wird gesendet…" : "Jetzt Termin vereinbaren"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

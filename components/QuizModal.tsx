"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { createQuizAnswers, createLeadPayload, getQuizSteps, getQuizSummary, isQuizStepValid, isWebsiteQuiz, optionLabel, optionValue, updateQuizAnswer, type QuizAnswers } from "@/lib/quiz-flow";

// Ziel für die Quiz-Anfragen: eigener Endpunkt auf dem VPS (Container lqnt-api).
// Er nimmt entgegen, legt ab und mailt an hi@lqnt.de. Beim Build statisch eingesetzt.
// Fällt der Dienst aus, greift der sichtbare Ausweichweg mit Mail und Telefon unten.
const LEAD_URL = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "https://api.lqnt.de/lead";

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode?: "prozesse" | "webdesign";
}

// ─── COMPONENT ───────────────────────────────────────────────

export default function QuizModal({ isOpen, onClose, mode = "prozesse" }: QuizModalProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState<"forward" | "backward">("forward");
    const [isAnimating, setIsAnimating] = useState(false);
    const [answers, setAnswers] = useState<QuizAnswers>(createQuizAnswers);
    const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");
    const isWebsite = isWebsiteQuiz(mode, answers);
    const steps = getQuizSteps(mode, answers);
    const summary = getQuizSummary(mode, answers);
    const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const sessionRef = useRef(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    // Focus management: remember the trigger element, restore focus on close
    useEffect(() => {
        if (!isOpen) return;
        lastFocusedRef.current = document.activeElement as HTMLElement | null;
        return () => queueMicrotask(() => lastFocusedRef.current?.focus());
    }, [isOpen]);

    // Move focus into the dialog on open and when switching to the success screen
    useEffect(() => {
        if (isOpen) containerRef.current?.focus();
    }, [isOpen, submitState]);

    useEffect(() => {
        if (isOpen) {
            if (scrollRef.current) scrollRef.current.scrollTop = 0;
            containerRef.current?.querySelector<HTMLElement>("[data-quiz-heading]")?.focus({ preventScroll: true });
        }
    }, [currentStep, isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const siblings = Array.from(document.body.children).filter((el): el is HTMLElement => el instanceof HTMLElement && el !== containerRef.current);
        const before = siblings.map(el => el.inert);
        siblings.forEach(el => { el.inert = true; });
        return () => siblings.forEach((el, i) => { el.inert = before[i]; });
    }, [isOpen]);

    // Closing during a transition must not advance a freshly reopened quiz.
    useEffect(() => {
        sessionRef.current += 1;
        if (isOpen) {
            setCurrentStep(0);
            setDirection("forward");
            setIsAnimating(false);
            setAnswers(createQuizAnswers());
            setSubmitState("idle");
        }
        return () => {
            sessionRef.current += 1;
            if (navigationTimer.current) clearTimeout(navigationTimer.current);
        };
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
            const focusables = Array.from(containerRef.current.querySelectorAll<HTMLElement>(
                'button:not([disabled]), [href], input, select, textarea, summary'
            )).filter(element => element.getClientRects().length > 0);
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const active = document.activeElement as HTMLElement | null;
            if (e.shiftKey && (active === first || active === containerRef.current || !containerRef.current.contains(active))) {
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

    const navigateTo = (index: number) => {
        if (isAnimating || submitState === "sending" || index < 0 || index >= steps.length) return;
        setDirection(index > currentStep ? "forward" : "backward");
        setIsAnimating(true);
        navigationTimer.current = setTimeout(() => {
            setCurrentStep(index);
            setIsAnimating(false);
            navigationTimer.current = null;
        }, 300);
    };
    const goNext = () => { if (isStepValid()) navigateTo(currentStep + 1); };
    const goBack = () => navigateTo(currentStep - 1);
    const isStepValid = () => isQuizStepValid(steps[currentStep], answers);

    const handleSelect = (field: keyof QuizAnswers, value: string) => {
        if (isAnimating || submitState === "sending") return;
        setAnswers(previous => updateQuizAnswer(previous, field, value));
    };
    const handleInput = (field: keyof QuizAnswers, value: string) => {
        setAnswers(previous => ({ ...previous, [field]: value }));
    };

    const handleSubmit = async () => {
        if (isAnimating || currentStep !== steps.length - 1 || !steps.every(step => isQuizStepValid(step, answers)) || submitState === "sending") return;
        const session = sessionRef.current;
        setSubmitState("sending");
        setIsAnimating(true);

        try {
            const res = await fetch(LEAD_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(createLeadPayload(mode, answers)),
            });
            const json = await res.json();
            if (session !== sessionRef.current) return;
            if (res.ok && json.ok) {
                setSubmitState("success");
            } else {
                console.error("Der Lead-Endpunkt meldete einen Fehler", json);
                setSubmitState("error");
            }
        } catch (err) {
            if (session !== sessionRef.current) return;
            console.error("Failed to submit lead", err);
            setSubmitState("error");
        } finally {
            if (session === sessionRef.current) setIsAnimating(false);
        }
    };

    // ─── PROGRESS ────────────────────────────────────────────

    const progress = ((currentStep + 1) / steps.length) * 100;

    if (!isOpen) return null;

    // ─── SUCCESS SCREEN ──────────────────────────────────────
    if (submitState === "success") {
        return createPortal(
            <div ref={containerRef} tabIndex={-1} className="fixed inset-0 z-[9998] flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Anfrage gesendet">
                <div className="absolute inset-0 bg-vanta/90 backdrop-blur-md quiz-backdrop-enter" onClick={onClose} />
                <div className="relative z-10 w-full max-w-lg mx-4 sm:mx-6 quiz-modal-enter bg-[#0a0a0a] border border-gridline">
                    <button onClick={onClose} className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center text-white/50 hover:text-lime transition-colors" aria-label="Schließen">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeWidth={2} d="M6 6l12 12M6 18L18 6" /></svg>
                    </button>
                    <div className="h-1 bg-lime w-full" />
                    <div className="px-6 py-10 sm:px-10 sm:py-14 text-center">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-lime/90 mb-4">Anfrage erhalten</div>
                        <h2 className="text-2xl sm:text-3xl uppercase font-bold text-white mb-3 tracking-tight">Danke, ich melde mich.</h2>
                        <p className="text-sm text-bone/80 font-light mb-8 leading-relaxed">
                            Ihre Angaben sind eingegangen. Ich melde mich. Wenn es schneller gehen soll, schreiben Sie direkt.
                        </p>
                        {/* Der frühere Button führte auf einen fremden Calendly-Account
                            (calendly.com/ofxffm) und ist deshalb entfernt. Sobald ein eigener
                            Account steht, kommt der Termin-Button hier zurück — siehe PLAN.md A4.
                            Telefonnummer ergänzen, sobald sie feststeht. */}
                        <a href="mailto:hi@lqnt.de" className="inline-block bg-lime text-vanta font-mono font-bold uppercase px-8 py-4 border border-lime btn-glitch text-sm">
                            hi@lqnt.de
                        </a>
                        <button onClick={onClose} className="block mx-auto mt-6 font-mono text-xs uppercase tracking-widest text-bone/80 hover:text-white transition-colors">
                            Schließen
                        </button>
                    </div>
                </div>
            </div>, document.body
        );
    }

    const step = steps[currentStep];

    // ─── RENDER ──────────────────────────────────────────────

    return createPortal(
        <div
            ref={containerRef}
            tabIndex={-1}
            className="fixed inset-0 z-[9998] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={isWebsite ? "Website-Projekt besprechen" : "Potenzialanalyse Quiz"}
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
                <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#0a0a0a] border border-gridline border-t-0">
                    <div className="px-6 py-8 sm:px-10 sm:py-12">

                        {/* Step Label */}
                        <div className="font-mono text-[10px] uppercase tracking-widest text-lime/90 mb-2">
                            {isWebsite && currentStep === 0 ? "Ihr Vorhaben" : `Schritt ${currentStep + 1} von ${steps.length}`}
                        </div>

                        {/* Headline */}
                        <h2 data-quiz-heading tabIndex={-1}
                            className={`text-2xl sm:text-3xl ${isWebsite ? "font-semibold" : "uppercase font-bold"} text-white mb-2 tracking-tight quiz-step-content ${isAnimating ? (direction === "forward" ? "quiz-exit-left" : "quiz-exit-right") : "quiz-enter"}`}
                        >
                            {step.headline}
                        </h2>

                        {/* Subline */}
                        <p
                            className={`text-sm text-bone/80 font-light mb-8 sm:mb-10 quiz-step-content ${isAnimating ? (direction === "forward" ? "quiz-exit-left" : "quiz-exit-right") : "quiz-enter"}`}
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
                                        const isSelected = answers[field] === optionValue(option);
                                        return (
                                            <button
                                                key={optionValue(option)}
                                                onClick={() => handleSelect(field, optionValue(option))}
                                                aria-pressed={isSelected}
                                                className={`w-full text-left px-5 py-4 border font-mono text-sm transition-all duration-300 ${
                                                    isSelected
                                                        ? "bg-lime text-vanta border-lime"
                                                        : "bg-transparent text-white/80 border-gridline hover:border-lime/50 hover:text-white"
                                                }`}
                                            >
                                                {optionLabel(option)}
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
                                            const isSelected = answers.painpoint === optionValue(option);
                                            return (
                                                <button
                                                    key={optionValue(option)}
                                                    onClick={() => handleSelect("painpoint", optionValue(option))}
                                                    aria-pressed={isSelected}
                                                    className={`w-full text-left px-5 py-4 border font-mono text-sm transition-all duration-300 ${
                                                        isSelected
                                                            ? "bg-lime text-vanta border-lime"
                                                            : "bg-transparent text-white/80 border-gridline hover:border-lime/50 hover:text-white"
                                                    }`}
                                                >
                                                    {optionLabel(option)}
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
                                        <label htmlFor="quiz-teamsize" className="font-mono text-[10px] uppercase tracking-widest text-lime/90 block mb-3">
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
                                    <details className="border border-gridline px-4 text-sm text-bone/80 leading-relaxed">
                                        <summary className="py-3 min-h-11 cursor-pointer font-semibold text-white">Ihre Angaben prüfen</summary>
                                        <dl className="divide-y divide-white/10">
                                            {summary.map(row => <div key={row.id} className="flex items-start justify-between gap-3 py-2">
                                                <div><dt className="text-xs text-bone/60">{row.label}</dt><dd>{row.value}</dd></div>
                                                <button type="button" onClick={() => navigateTo(row.index)} disabled={isAnimating || submitState === "sending"} aria-label={`${row.label} ändern`} className="min-h-11 shrink-0 text-lime underline underline-offset-4 disabled:opacity-40">Ändern</button>
                                            </div>)}
                                        </dl>
                                    </details>

                                    <div>
                                        <label htmlFor="quiz-name" className="font-mono text-[10px] uppercase tracking-widest text-lime/90 block mb-2">Name *</label>
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
                                        <label htmlFor="quiz-email" className="font-mono text-[10px] uppercase tracking-widest text-lime/90 block mb-2">E-Mail *</label>
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
                                        <label htmlFor="quiz-phone" className="font-mono text-[10px] uppercase tracking-widest text-lime/90 block mb-2">Telefonnummer *</label>
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
                                        <label htmlFor="quiz-website" className="font-mono text-[10px] uppercase tracking-widest text-lime/90 block mb-2">Website <span className="text-bone/80">(Optional)</span></label>
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
                                    {isWebsite && <div>
                                        <label htmlFor="quiz-notes" className="text-sm text-bone block mb-2">Was ist Ihnen noch wichtig? <span className="text-bone/60">(optional)</span></label>
                                        <textarea id="quiz-notes" rows={3} maxLength={1000} value={answers.notes} onChange={e => handleInput("notes", e.target.value)} placeholder="Ihr Unternehmen, besondere Wünsche oder eine Frage an mich …" className="w-full resize-y bg-transparent border border-gridline text-white px-4 py-3 text-sm focus:outline-none focus:border-lime transition-colors placeholder:text-white/50 rounded-none" />
                                    </div>}
                                    <p className="text-sm text-bone/80">Mit dem Absenden fragen Sie ein unverbindliches Gespräch an. Informationen zur Verarbeitung Ihrer Angaben finden Sie in der <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/datenschutz/`} className="text-lime underline" target="_blank" rel="noreferrer">Datenschutzerklärung</a>.</p>
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
                            disabled={isAnimating || submitState === "sending"}
                            className="font-mono text-xs uppercase tracking-widest text-bone/80 hover:text-white transition-colors flex items-center gap-2 min-h-11 disabled:opacity-40"
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
                    {currentStep < steps.length - 1 ? (
                        <button
                            onClick={goNext}
                            disabled={!isStepValid() || isAnimating}
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
                                    <span className="text-bone/80 block normal-case tracking-normal">
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
                                disabled={!isStepValid() || isAnimating || submitState === "sending"}
                                className={`font-mono text-sm uppercase tracking-wider px-6 py-3 border transition-all duration-300 flex items-center justify-center gap-2 ${
                                    isStepValid() && submitState !== "sending"
                                        ? "bg-lime text-vanta border-lime hover:bg-white hover:text-vanta hover:border-white btn-glitch"
                                        : "bg-transparent text-mute/40 border-gridline/50 cursor-not-allowed"
                                }`}
                            >
                                {submitState === "sending" && (
                                    <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                <span>{submitState === "sending" ? "Wird gesendet…" : "Anfrage senden"}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>, document.body
    );
}

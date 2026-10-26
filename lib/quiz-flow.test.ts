import { describe, it, expect } from "vitest";
import { getQuizSummary, QuizAnswers } from "./quiz-flow";

const defaultAnswers: QuizAnswers = {
    goal: "",
    goalOther: "",
    painpoint: "",
    painpointOther: "",
    teamSize: "",
    timeline: "",
    maturity: "",
    priority: "",
    scope: "",
    brandStatus: "",
    notes: "",
    name: "John Doe",
    email: "john@example.com",
    phone: "123456789",
    website: "https://example.com",
};

describe("getQuizSummary", () => {
    it("should return correct summary for 'prozesse' mode with standard answers", () => {
        const answers: QuizAnswers = {
            ...defaultAnswers,
            goal: "Prozesse & Administration automatisieren",
            painpoint: "Manuelle Datenpflege & Dokumentation",
            timeline: "In den nächsten 1 – 3 Monaten",
            maturity: "Nein, noch gar nicht",
        };

        const summary = getQuizSummary("prozesse", answers);

        expect(summary).toEqual([
            { id: "goal", label: "Vorhaben", value: "Prozesse & Administration automatisieren", index: 0 },
            { id: "painpoint", label: "Engpass", value: "Manuelle Datenpflege & Dokumentation", index: 1 },
            { id: "timeline", label: "Zeitrahmen", value: "In den nächsten 1 – 3 Monaten", index: 2 },
            { id: "maturity", label: "KI-Nutzung", value: "Nein, noch gar nicht", index: 3 },
        ]);
    });

    it("should handle '__other__' custom answers correctly", () => {
        const answers: QuizAnswers = {
            ...defaultAnswers,
            goal: "__other__",
            goalOther: "Something completely different",
            painpoint: "Manuelle Datenpflege & Dokumentation",
            timeline: "In den nächsten 1 – 3 Monaten",
            maturity: "Nein, noch gar nicht",
        };

        const summary = getQuizSummary("prozesse", answers);

        expect(summary[0]).toEqual({
            id: "goal",
            label: "Vorhaben",
            value: "Something completely different",
            index: 0
        });
    });

    it("should exclude the 'contact' step from the summary", () => {
        const answers: QuizAnswers = {
            ...defaultAnswers,
            goal: "Prozesse & Administration automatisieren",
            painpoint: "Manuelle Datenpflege & Dokumentation",
            timeline: "In den nächsten 1 – 3 Monaten",
            maturity: "Nein, noch gar nicht",
        };

        const summary = getQuizSummary("prozesse", answers);
        const contactStep = summary.find(s => s.id === "contact");

        expect(contactStep).toBeUndefined();
        expect(summary.length).toBe(4);
    });

    it("should return correct summary for 'webdesign' mode with 'improve-website' goal", () => {
        const answers: QuizAnswers = {
            ...defaultAnswers,
            goal: "improve-website",
            priority: "appearance", // Note: websiteImprovement step has id 'priority'
            timeline: "soon",
        };

        const summary = getQuizSummary("webdesign", answers);

        expect(summary).toEqual([
            { id: "goal", label: "Vorhaben", value: "Meine bestehende Website verbessern", index: 0 },
            { id: "priority", label: "Verbesserungsbedarf", value: "Gestaltung und erster Eindruck", index: 1 },
            { id: "timeline", label: "Gewünschter Start", value: "Möglichst bald", index: 2 },
        ]);
    });

    it("should return correct summary for 'webdesign' mode with 'branding' goal", () => {
        const answers: QuizAnswers = {
            ...defaultAnswers,
            goal: "branding",
            brandStatus: "new",
            timeline: "1-3-months",
        };

        const summary = getQuizSummary("webdesign", answers);

        expect(summary).toEqual([
            { id: "goal", label: "Vorhaben", value: "Logo und Markenauftritt entwickeln", index: 0 },
            { id: "brandStatus", label: "Ausgangspunkt", value: "Ich starte mit einer neuen Marke", index: 1 },
            { id: "timeline", label: "Gewünschter Start", value: "In den nächsten 1–3 Monaten", index: 2 },
        ]);
    });

    it("should return correct summary for 'webdesign' default/new-website route", () => {
        const answers: QuizAnswers = {
            ...defaultAnswers,
            goal: "new-website",
            priority: "enquiries",
            scope: "compact",
            timeline: "later",
        };

        const summary = getQuizSummary("webdesign", answers);

        expect(summary).toEqual([
            { id: "goal", label: "Vorhaben", value: "Eine neue Website erstellen", index: 0 },
            { id: "priority", label: "Wichtigstes Ziel", value: "Mehr passende Anfragen erhalten", index: 1 },
            { id: "scope", label: "Umfang", value: "Mein Angebot kompakt auf einer Seite zeigen", index: 2 },
            { id: "timeline", label: "Gewünschter Start", value: "Später – ich plane voraus", index: 3 },
        ]);
    });

    it("should return correct summary for 'webdesign' mode with 'orientation' goal", () => {
        const answers: QuizAnswers = {
            ...defaultAnswers,
            goal: "orientation",
        };

        const summary = getQuizSummary("webdesign", answers);

        expect(summary).toEqual([
            { id: "goal", label: "Vorhaben", value: "Ich brauche erst Orientierung", index: 0 },
        ]);
    });
});

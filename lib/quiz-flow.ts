export type QuizMode = "prozesse" | "webdesign";
export type QuizOption = string | { value: string; label: string };

export interface QuizAnswers {
    goal: string;
    goalOther: string;
    painpoint: string;
    painpointOther: string;
    teamSize: string;
    timeline: string;
    maturity: string;
    priority: string;
    scope: string;
    brandStatus: string;
    notes: string;
    name: string;
    email: string;
    phone: string;
    website: string;
}

export interface QuizStep {
    id: keyof QuizAnswers | "contact";
    headline: string;
    subline: string;
    summaryLabel?: string;
    type: "single-choice" | "single-choice-with-dropdown" | "contact";
    options?: QuizOption[];
    hasOther?: boolean;
    dropdown?: { label: string; placeholder: string; options: string[] };
}

export const optionValue = (option: QuizOption) => typeof option === "string" ? option : option.value;
export const optionLabel = (option: QuizOption) => typeof option === "string" ? option : option.label;

export function createQuizAnswers(): QuizAnswers {
    return {
        goal: "", goalOther: "", painpoint: "", painpointOther: "", teamSize: "",
        timeline: "", maturity: "", priority: "", scope: "", brandStatus: "", notes: "",
        name: "", email: "", phone: "", website: "",
    };
}

// The processes questionnaire keeps its existing wording and endpoint values.
export const PROCESS_STEPS: QuizStep[] = [
    {
        id: "goal", summaryLabel: "Vorhaben",
        headline: "Was ist Ihr primäres Ziel?",
        subline: "Wählen Sie die Option, die am besten zu Ihrem Vorhaben passt.",
        type: "single-choice",
        options: ["KI-Beratung / passende Werkzeuge einführen", "Prozesse & Administration automatisieren", "Individuelle Software / eigenes Tool entwickeln", "Bestehende Software intelligent vernetzen", "Neue Website / Digitales Rebranding"],
        hasOther: true,
    },
    {
        id: "painpoint", summaryLabel: "Engpass",
        headline: "Wo geht in Ihrem Arbeitsalltag Zeit verloren?",
        subline: "Eine erste Einschätzung genügt. Wir können das auch gemeinsam herausfinden.",
        type: "single-choice-with-dropdown",
        options: ["Manuelle Datenpflege & Dokumentation", "Beantwortung von Standard-Kundenanfragen", "Koordination & interne Abstimmung", "Veraltete, unübersichtliche Software", "Das möchte ich gemeinsam herausfinden"],
        hasOther: true,
        dropdown: {
            label: "Teamgröße", placeholder: "Mitarbeiteranzahl wählen",
            options: ["Ich arbeite allein", "1 – 5 Mitarbeiter", "6 – 20 Mitarbeiter", "21 – 50 Mitarbeiter", "51 – 200 Mitarbeiter", "200+ Mitarbeiter"],
        },
    },
    {
        id: "timeline", summaryLabel: "Zeitrahmen",
        headline: "Wie schnell soll die Lösung stehen?",
        subline: "Das hilft mir, Ihr Projekt richtig einzuplanen.",
        type: "single-choice",
        options: ["So schnell wie möglich (akuter Bedarf)", "In den nächsten 1 – 3 Monaten", "In den nächsten 3 – 6 Monaten", "Ich orientiere mich erstmal"],
    },
    {
        id: "maturity", summaryLabel: "KI-Nutzung",
        headline: "Nutzen Sie bereits KI-Tools oder Automatisierung?",
        subline: "Damit ich weiß, worauf ich aufbauen kann.",
        type: "single-choice",
        options: ["Nein, noch gar nicht", "Ja, einzelne Tools (z. B. ChatGPT, Zapier)", "Ja, wir haben bereits eigene Automationen", "Wir sind unsicher, was möglich ist"],
    },
    {
        id: "contact", headline: "Fast geschafft – wie erreiche ich Sie?",
        subline: "Die erste Potenzialanalyse ist kostenlos und unverbindlich. Ich nutze Ihre Angaben, um unser Gespräch vorzubereiten.",
        type: "contact",
    },
];

const websiteGoal: QuizStep = {
    id: "goal", summaryLabel: "Vorhaben", type: "single-choice", hasOther: true,
    headline: "Was haben Sie vor?",
    subline: "Ich stelle Ihnen nur die Fragen, die zu Ihrem Vorhaben passen.",
    options: [
        { value: "new-website", label: "Eine neue Website erstellen" },
        { value: "improve-website", label: "Meine bestehende Website verbessern" },
        { value: "branding", label: "Logo und Markenauftritt entwickeln" },
        { value: "orientation", label: "Ich brauche erst Orientierung" },
    ],
};

const websitePriority: QuizStep = {
    id: "priority", summaryLabel: "Wichtigstes Ziel", type: "single-choice",
    headline: "Was soll die Website für Sie erreichen?",
    subline: "Was ist Ihnen am wichtigsten? Weitere Wünsche können wir im Gespräch ergänzen.",
    options: [
        { value: "enquiries", label: "Mehr passende Anfragen erhalten" },
        { value: "explain", label: "Mein Angebot verständlich vorstellen" },
        { value: "recruit", label: "Neue Mitarbeitende gewinnen" },
        { value: "service", label: "Buchungen oder Abläufe online erleichtern" },
        { value: "discuss", label: "Das möchte ich gemeinsam klären" },
    ],
};

const websiteImprovement: QuizStep = {
    id: "priority", summaryLabel: "Verbesserungsbedarf", type: "single-choice",
    headline: "Was soll besser werden?",
    subline: "Wählen Sie den wichtigsten Punkt. Ihre Website-Adresse können Sie am Ende ergänzen.",
    options: [
        { value: "appearance", label: "Gestaltung und erster Eindruck" },
        { value: "content", label: "Texte und Übersichtlichkeit" },
        { value: "enquiries", label: "Der Weg zur Anfrage oder Buchung" },
        { value: "rebuild", label: "Die Website insgesamt erneuern" },
        { value: "discuss", label: "Das möchte ich gemeinsam herausfinden" },
    ],
};

const websiteScope: QuizStep = {
    id: "scope", summaryLabel: "Umfang", type: "single-choice",
    headline: "Wie viel haben Sie vor?",
    subline: "Eine grobe Richtung genügt. Den passenden Aufbau und Festpreis klären wir im Gespräch.",
    options: [
        { value: "compact", label: "Mein Angebot kompakt auf einer Seite zeigen" },
        { value: "detailed", label: "Mehrere Leistungen ausführlich vorstellen" },
        { value: "functions", label: "Zusätzliche Funktionen oder Anbindungen einbauen" },
        { value: "discuss", label: "Das möchte ich gemeinsam einschätzen" },
    ],
};

const brandStartingPoint: QuizStep = {
    id: "brandStatus", summaryLabel: "Ausgangspunkt", type: "single-choice",
    headline: "Wo stehen Sie mit Ihrer Marke?",
    subline: "Damit ich weiß, was schon da ist und wo ich ansetzen kann.",
    options: [
        { value: "new", label: "Ich starte mit einer neuen Marke" },
        { value: "extend", label: "Ein Logo ist da, die Gestaltung soll ergänzt werden" },
        { value: "refresh", label: "Der bestehende Auftritt soll modernisiert werden" },
        { value: "discuss", label: "Das möchte ich gemeinsam einschätzen" },
    ],
};

const websiteTimeline: QuizStep = {
    id: "timeline", summaryLabel: "Gewünschter Start", type: "single-choice",
    headline: "Wann möchten Sie starten?",
    subline: "Es geht um den Projektstart. Den genauen Zeitplan stimmen wir gemeinsam ab.",
    options: [
        { value: "soon", label: "Möglichst bald" },
        { value: "1-3-months", label: "In den nächsten 1–3 Monaten" },
        { value: "later", label: "Später – ich plane voraus" },
        { value: "open", label: "Der Zeitpunkt ist noch offen" },
    ],
};

const websiteContact: QuizStep = {
    id: "contact", type: "contact", headline: "Wie erreiche ich Sie?",
    subline: "Das Erstgespräch ist kostenlos und unverbindlich. Ich nutze Ihre Angaben, um auf Ihr Vorhaben einzugehen.",
};

const LEGACY_WEBSITE_GOAL = "Neue Website / Digitales Rebranding";

export function isWebsiteQuiz(mode: QuizMode, answers: QuizAnswers) {
    return mode === "webdesign" || answers.goal === LEGACY_WEBSITE_GOAL;
}

export function getQuizSteps(mode: QuizMode, answers: QuizAnswers): QuizStep[] {
    if (!isWebsiteQuiz(mode, answers)) return PROCESS_STEPS;
    const first = mode === "prozesse" ? PROCESS_STEPS[0] : websiteGoal;
    switch (answers.goal) {
        case "branding":
            return [first, brandStartingPoint, websiteTimeline, websiteContact];
        case "improve-website":
            return [first, websiteImprovement, websiteTimeline, websiteContact];
        case "orientation":
        case "__other__":
            return [first, { ...websiteContact, headline: "Lassen Sie uns gemeinsam draufschauen.", subline: "Sie müssen noch keinen fertigen Plan haben. Ein paar Worte zu Ihrem Anliegen helfen mir, mich vorzubereiten." }];
        default:
            return [first, websitePriority, websiteScope, websiteTimeline, websiteContact];
    }
}

export function updateQuizAnswer(answers: QuizAnswers, field: keyof QuizAnswers, value: string): QuizAnswers {
    if (field === "goal" && value !== answers.goal) {
        // Keep contact details; discard answers that belong to the previous route.
        return { ...answers, goal: value, goalOther: "", painpoint: "", painpointOther: "", teamSize: "", timeline: "", maturity: "", priority: "", scope: "", brandStatus: "" };
    }
    return { ...answers, [field]: value };
}

export function isQuizStepValid(step: QuizStep, answers: QuizAnswers): boolean {
    if (step.id === "contact") {
        return answers.name.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim()) && answers.phone.trim() !== "";
    }
    const value = answers[step.id];
    const validChoice = value === "__other__"
        ? Boolean(step.hasOther && answers[`${step.id}Other` as keyof QuizAnswers]?.trim())
        : Boolean(step.options?.some(option => optionValue(option) === value));
    return validChoice && (step.type !== "single-choice-with-dropdown" || Boolean(step.dropdown?.options.includes(answers.teamSize)));
}

export function getQuizSummary(mode: QuizMode, answers: QuizAnswers) {
    return getQuizSteps(mode, answers).flatMap((step, index) => {
        if (step.id === "contact") return [];
        const value = answers[step.id];
        const selected = step.options?.find(option => optionValue(option) === value);
        const label = value === "__other__" ? answers[`${step.id}Other` as keyof QuizAnswers]?.trim() : selected && optionLabel(selected);
        return label ? [{ id: step.id, label: step.summaryLabel || step.headline, value: label, index }] : [];
    });
}

export function createLeadPayload(mode: QuizMode, answers: QuizAnswers) {
    const website = isWebsiteQuiz(mode, answers);
    const summary = getQuizSummary(mode, answers);
    const answer = (id: string) => summary.find(row => row.id === id)?.value || "—";
    const brief = summary.map(row => `${row.label}: ${row.value}`).join("\n");
    // Keep the existing server contract. Website-specific answers are fully
    // readable in Ziel; hidden answers from another route are never sent.
    return {
        Name: answers.name.trim(), "E-Mail": answers.email.trim(), Telefon: answers.phone.trim(), Website: answers.website.trim() || "—",
        Ziel: website ? `Webdesign / Marke\n${brief}${answers.notes.trim() ? `\nErgänzung: ${answers.notes.trim()}` : ""}` : answer("goal"),
        Flaschenhals: website ? answer("priority") : answer("painpoint"),
        "Teamgröße": website ? "—" : answers.teamSize || "—",
        Zeitrahmen: answer("timeline"),
        "KI-Reife": website ? "Nicht zutreffend – Website-/Markenprojekt" : answer("maturity"),
        firma: "",
    };
}

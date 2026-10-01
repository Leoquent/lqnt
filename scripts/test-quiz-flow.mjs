import assert from "node:assert/strict";
import test from "node:test";
import {
  createQuizAnswers,
  getQuizSteps,
  updateQuizAnswer,
  isQuizStepValid,
  getQuizSummary,
  createLeadPayload,
  isWebsiteQuiz,
} from "../lib/quiz-flow.ts";

// Pure flow tests: no browser, endpoint or outbound request is involved.
const contact = {
  name: " Erika Beispiel ",
  email: " erika@example.test ",
  phone: " +49 170 1234567 ",
  website: " https://example.test ",
};
const answers = (values = {}) => ({ ...createQuizAnswers(), ...contact, ...values });
const ids = (mode, state) => getQuizSteps(mode, state).map(step => step.id);
const step = (mode, state, id) => {
  const result = getQuizSteps(mode, state).find(item => item.id === id);
  assert.ok(result, `${id} must be an active step`);
  return result;
};
const endpointKeys = [
  "Name", "E-Mail", "Telefon", "Website", "Ziel", "Flaschenhals",
  "Teamgröße", "Zeitrahmen", "KI-Reife", "firma",
].sort();

const routes = [
  {
    title: "new website: five steps",
    state: { goal: "new-website", priority: "enquiries", scope: "compact", timeline: "soon" },
    steps: ["goal", "priority", "scope", "timeline", "contact"],
  },
  {
    title: "existing website: four steps without a scope question",
    state: { goal: "improve-website", priority: "content", timeline: "1-3-months" },
    steps: ["goal", "priority", "timeline", "contact"],
  },
  {
    title: "branding: four steps without website or AI questions",
    state: { goal: "branding", brandStatus: "refresh", timeline: "later" },
    steps: ["goal", "brandStatus", "timeline", "contact"],
  },
  {
    title: "orientation: directly from goal to contact",
    state: { goal: "orientation" },
    steps: ["goal", "contact"],
  },
  {
    title: "other project: two steps with the user's description",
    state: { goal: "__other__", goalOther: "Ein Buchungsportal für meinen Verein" },
    steps: ["goal", "contact"],
  },
];

for (const route of routes) {
  test(route.title, () => {
    const state = answers(route.state);
    assert.deepEqual(ids("webdesign", state), route.steps);
    assert.ok(getQuizSteps("webdesign", state).every(item => isQuizStepValid(item, state)));
  });
}

test("processes retain their five-step route and existing option values", () => {
  const state = answers({
    goal: "Prozesse & Administration automatisieren",
    painpoint: "Manuelle Datenpflege & Dokumentation",
    teamSize: "6 – 20 Mitarbeiter",
    timeline: "In den nächsten 1 – 3 Monaten",
    maturity: "Ja, einzelne Tools (z. B. ChatGPT, Zapier)",
  });
  assert.deepEqual(ids("prozesse", state), ["goal", "painpoint", "timeline", "maturity", "contact"]);
  assert.equal(isWebsiteQuiz("prozesse", state), false);
  assert.ok(getQuizSteps("prozesse", state).every(item => isQuizStepValid(item, state)));
  assert.deepEqual(createLeadPayload("prozesse", state), {
    Name: "Erika Beispiel", "E-Mail": "erika@example.test", Telefon: "+49 170 1234567",
    Website: "https://example.test", Ziel: "Prozesse & Administration automatisieren",
    Flaschenhals: "Manuelle Datenpflege & Dokumentation", "Teamgröße": "6 – 20 Mitarbeiter",
    Zeitrahmen: "In den nächsten 1 – 3 Monaten", "KI-Reife": "Ja, einzelne Tools (z. B. ChatGPT, Zapier)",
    firma: "",
  });
});

test("legacy website selection inside processes enters the website flow", () => {
  const state = answers({
    goal: "Neue Website / Digitales Rebranding", priority: "explain", scope: "detailed", timeline: "open",
  });
  assert.equal(isWebsiteQuiz("prozesse", state), true);
  assert.deepEqual(ids("prozesse", state), ["goal", "priority", "scope", "timeline", "contact"]);
  assert.ok(getQuizSteps("prozesse", state).every(item => isQuizStepValid(item, state)));
  const payload = createLeadPayload("prozesse", state);
  assert.match(payload.Ziel, /Vorhaben: Neue Website \/ Digitales Rebranding/);
  assert.match(payload.Ziel, /Umfang: Mehrere Leistungen ausführlich vorstellen/);
  assert.equal(payload["Teamgröße"], "—");
  assert.equal(payload["KI-Reife"], "Nicht zutreffend – Website-/Markenprojekt");
});

test("returning to the goal and changing route clears every dependent answer", () => {
  const dependent = ["goalOther", "painpoint", "painpointOther", "teamSize", "timeline", "maturity", "priority", "scope", "brandStatus"];
  const previous = Object.freeze(answers({
    goal: "new-website", ...Object.fromEntries(dependent.map(key => [key, `previous-${key}`])),
    notes: "Bitte nachmittags melden.",
  }));
  for (const goal of ["improve-website", "branding", "orientation", "__other__", "Prozesse & Administration automatisieren"]) {
    const next = updateQuizAnswer(previous, "goal", goal);
    assert.equal(next.goal, goal);
    for (const key of dependent) assert.equal(next[key], "", `${goal}: stale ${key}`);
    for (const key of ["name", "email", "phone", "website", "notes"]) assert.equal(next[key], previous[key]);
  }
  assert.equal(previous.goal, "new-website", "changing route must not mutate the previous state");
  assert.equal(previous.scope, "previous-scope");
});

test("selecting the same goal after going back preserves completed answers", () => {
  const previous = answers({ goal: "new-website", priority: "enquiries", scope: "compact", timeline: "soon" });
  assert.deepEqual(updateQuizAnswer(previous, "goal", "new-website"), previous);
});

test("editing a regular answer does not reset unrelated choices or contact details", () => {
  const previous = answers({ goal: "new-website", priority: "enquiries", scope: "compact", timeline: "soon" });
  assert.deepEqual(updateQuizAnswer(previous, "priority", "recruit"), { ...previous, priority: "recruit" });
  assert.equal(previous.priority, "enquiries");
});

test("choice validation rejects empty, unknown and other-route values", () => {
  for (const route of routes) {
    const state = answers(route.state);
    for (const item of getQuizSteps("webdesign", state).filter(item => item.id !== "contact")) {
      assert.equal(isQuizStepValid(item, { ...state, [item.id]: "" }), false, `${route.title}/${item.id}: blank`);
      assert.equal(isQuizStepValid(item, { ...state, [item.id]: "unknown-choice" }), false, `${route.title}/${item.id}: unknown`);
    }
  }
  const improvement = answers({ goal: "improve-website", priority: "recruit" });
  assert.equal(isQuizStepValid(step("webdesign", improvement, "priority"), improvement), false);
  const newWebsite = answers({ goal: "new-website", priority: "appearance" });
  assert.equal(isQuizStepValid(step("webdesign", newWebsite, "priority"), newWebsite), false);
});

test("other requires meaningful text and is only accepted where offered", () => {
  for (const mode of ["webdesign", "prozesse"]) {
    const state = answers({ goal: "__other__", goalOther: "   " });
    const goal = step(mode, state, "goal");
    assert.equal(isQuizStepValid(goal, state), false);
    assert.equal(isQuizStepValid(goal, { ...state, goalOther: " Ein besonderes Vorhaben " }), true);
  }
  const state = answers({ goal: "new-website", timeline: "__other__" });
  assert.equal(isQuizStepValid(step("webdesign", state, "timeline"), state), false);
});

test("process bottleneck requires a supported team size, including with other text", () => {
  const state = answers({ goal: "Prozesse & Administration automatisieren", painpoint: "__other__", painpointOther: "Viele Rückfragen" });
  const bottleneck = step("prozesse", state, "painpoint");
  assert.equal(isQuizStepValid(bottleneck, state), false);
  assert.equal(isQuizStepValid(bottleneck, { ...state, teamSize: "unknown-team" }), false);
  assert.equal(isQuizStepValid(bottleneck, { ...state, teamSize: "Ich arbeite allein" }), true);
  assert.equal(isQuizStepValid(bottleneck, { ...state, teamSize: "Ich arbeite allein", painpointOther: " " }), false);
});

test("contact validation keeps name, valid email and phone mandatory in every route", () => {
  for (const mode of ["webdesign", "prozesse"]) {
    const state = answers({ goal: mode === "webdesign" ? "orientation" : "Prozesse & Administration automatisieren" });
    const contactStep = step(mode, state, "contact");
    assert.equal(isQuizStepValid(contactStep, state), true);
    for (const key of ["name", "email", "phone"]) {
      assert.equal(isQuizStepValid(contactStep, { ...state, [key]: " " }), false, `${mode}: ${key} remains required`);
    }
    for (const email of ["invalid", "name@host", "name @example.test", "name@example."]) {
      assert.equal(isQuizStepValid(contactStep, { ...state, email }), false, email);
    }
    assert.equal(isQuizStepValid(contactStep, { ...state, website: "", notes: "" }), true);
  }
});

test("new website summary and payload use customer-readable labels, not IDs", () => {
  const state = answers({ ...routes[0].state, notes: " Bitte nachmittags melden. " });
  assert.deepEqual(getQuizSummary("webdesign", state), [
    { id: "goal", label: "Vorhaben", value: "Eine neue Website erstellen", index: 0 },
    { id: "priority", label: "Wichtigstes Ziel", value: "Mehr passende Anfragen erhalten", index: 1 },
    { id: "scope", label: "Umfang", value: "Mein Angebot kompakt auf einer Seite zeigen", index: 2 },
    { id: "timeline", label: "Gewünschter Start", value: "Möglichst bald", index: 3 },
  ]);
  const payload = createLeadPayload("webdesign", state);
  assert.equal(payload.Ziel, "Webdesign / Marke\nVorhaben: Eine neue Website erstellen\nWichtigstes Ziel: Mehr passende Anfragen erhalten\nUmfang: Mein Angebot kompakt auf einer Seite zeigen\nGewünschter Start: Möglichst bald\nErgänzung: Bitte nachmittags melden.");
  assert.equal(payload.Flaschenhals, "Mehr passende Anfragen erhalten");
  assert.equal(payload.Zeitrahmen, "Möglichst bald");
  assert.equal(payload.Name, "Erika Beispiel");
  assert.equal(payload["E-Mail"], "erika@example.test");
  assert.equal(payload.Telefon, "+49 170 1234567");
  assert.equal(payload.Website, "https://example.test");
});

test("branding excludes stale website, scope, team and AI answers from summary and payload", () => {
  const state = answers({
    ...routes[2].state, priority: "recruit", scope: "functions", goalOther: "STALE_OTHER",
    painpoint: "Veraltete, unübersichtliche Software", painpointOther: "STALE_PAINPOINT",
    teamSize: "200+ Mitarbeiter", maturity: "Ja, wir haben bereits eigene Automationen",
  });
  const summary = getQuizSummary("webdesign", state);
  assert.deepEqual(summary.map(row => row.id), ["goal", "brandStatus", "timeline"]);
  assert.equal(summary[1].value, "Der bestehende Auftritt soll modernisiert werden");
  const payload = createLeadPayload("webdesign", state);
  assert.equal(payload.Flaschenhals, "—");
  assert.equal(payload["Teamgröße"], "—");
  assert.equal(payload["KI-Reife"], "Nicht zutreffend – Website-/Markenprojekt");
  const serialized = JSON.stringify({ summary, payload });
  for (const stale of ["recruit", "functions", "STALE_OTHER", "STALE_PAINPOINT", state.painpoint, state.teamSize, state.maturity]) {
    assert.ok(!serialized.includes(stale), `hidden value leaked: ${stale}`);
  }
});

test("existing website omits stale logo/scope answers and uses its own priority label", () => {
  const state = answers({ goal: "improve-website", priority: "enquiries", timeline: "open", scope: "compact", brandStatus: "refresh" });
  const summary = getQuizSummary("webdesign", state);
  assert.deepEqual(summary.map(row => row.id), ["goal", "priority", "timeline"]);
  assert.equal(summary[1].label, "Verbesserungsbedarf");
  assert.equal(summary[1].value, "Der Weg zur Anfrage oder Buchung");
  const payload = createLeadPayload("webdesign", state);
  assert.equal(payload.Flaschenhals, "Der Weg zur Anfrage oder Buchung");
  assert.doesNotMatch(payload.Ziel, /Umfang:|Ausgangspunkt:|compact|refresh/);
});

test("orientation and other never send answers from skipped steps", () => {
  for (const goal of ["orientation", "__other__"]) {
    const state = answers({
      goal, goalOther: " Ein Kundenportal ", priority: "enquiries", scope: "functions", brandStatus: "new",
      timeline: "soon", painpoint: "Manuelle Datenpflege & Dokumentation", teamSize: "200+ Mitarbeiter",
      maturity: "Ja, wir haben bereits eigene Automationen",
    });
    const summary = getQuizSummary("webdesign", state);
    assert.deepEqual(summary.map(row => row.id), ["goal"]);
    assert.equal(summary[0].value, goal === "orientation" ? "Ich brauche erst Orientierung" : "Ein Kundenportal");
    const payload = createLeadPayload("webdesign", state);
    assert.equal(payload.Flaschenhals, "—");
    assert.equal(payload.Zeitrahmen, "—");
    assert.equal(payload["Teamgröße"], "—");
    assert.doesNotMatch(payload.Ziel, /Wichtigstes Ziel:|Umfang:|Ausgangspunkt:|Gewünschter Start:|KI-Nutzung:/);
  }
});

test("process summary and payload exclude stale website and logo answers", () => {
  const state = answers({
    goal: "__other__", goalOther: "  Rechnungen schneller zuordnen  ",
    painpoint: "__other__", painpointOther: "  Informationen aus Papierformularen  ",
    teamSize: "1 – 5 Mitarbeiter", timeline: "Ich orientiere mich erstmal", maturity: "Nein, noch gar nicht",
    priority: "enquiries", scope: "functions", brandStatus: "refresh",
  });
  assert.deepEqual(ids("prozesse", state), ["goal", "painpoint", "timeline", "maturity", "contact"]);
  const payload = createLeadPayload("prozesse", state);
  assert.equal(payload.Ziel, "Rechnungen schneller zuordnen");
  assert.equal(payload.Flaschenhals, "Informationen aus Papierformularen");
  assert.equal(payload["Teamgröße"], "1 – 5 Mitarbeiter");
  assert.equal(payload["KI-Reife"], "Nein, noch gar nicht");
  const summary = getQuizSummary("prozesse", state);
  assert.deepEqual(summary.map(row => row.id), ["goal", "painpoint", "timeline", "maturity"]);
  assert.doesNotMatch(JSON.stringify({ summary, payload }), /enquiries|functions|refresh|Webdesign \/ Marke/);
});

test("all routes preserve the existing endpoint keys and an empty honeypot", () => {
  const examples = [
    ...routes.map(route => ["webdesign", answers(route.state)]),
    ["prozesse", answers({ goal: "Prozesse & Administration automatisieren" })],
    ["prozesse", answers({ goal: "Neue Website / Digitales Rebranding" })],
  ];
  for (const [mode, state] of examples) {
    const payload = createLeadPayload(mode, { ...state, website: " " });
    assert.deepEqual(Object.keys(payload).sort(), endpointKeys);
    assert.equal(payload.firma, "");
    assert.equal(payload.Website, "—");
    assert.ok(Object.values(payload).every(value => typeof value === "string"));
  }
});

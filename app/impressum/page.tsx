import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Impressum | leoquent",
  alternates: { canonical: absoluteUrl("/impressum/") },
  robots: { index: false, follow: true },
};

// Rechtsgrundlage: § 5 DDG (Digitale-Dienste-Gesetz) + § 18 Abs. 2 MStV.
// Einzelunternehmen: keine Rechtsformangabe, kein Vertretungsberechtigter.
// USt-IdNr. steht auf "in Beantragung" — nach Erteilung hier eintragen.
// Vor dem Livegang einmal über den IHK-Gründungsservice prüfen lassen.

export default function ImpressumPage() {
  return (
    <main className="bg-vanta text-bone min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <a href={`${basePath}/`} className="font-mono text-xs uppercase tracking-widest text-lime hover:opacity-80 transition-opacity">
          ← Zurück zur Startseite
        </a>

        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mt-8 mb-10">Impressum</h1>

        <h2 className="text-lg font-bold uppercase tracking-tight mb-3">Angaben gemäß § 5 DDG</h2>
        <p className="text-sm text-bone/70 leading-relaxed mb-6">
          leoquent<br />
          Inhaber: Leonid Ryazanskiy<br />
          Uerdinger Str. 75<br />
          40474 Düsseldorf<br />
          Deutschland
        </p>

        <h2 className="text-lg font-bold uppercase tracking-tight mb-3">Kontakt</h2>
        <p className="text-sm text-bone/70 leading-relaxed mb-6">
          Telefon: <a href="tel:+4917647177623" className="text-lime hover:opacity-80">+49 176 47 177 623</a><br />
          E-Mail: <a href="mailto:hi@lqnt.de" className="text-lime hover:opacity-80">hi@lqnt.de</a>
        </p>

        <h2 className="text-lg font-bold uppercase tracking-tight mb-3">Umsatzsteuer-ID</h2>
        <p className="text-sm text-bone/70 leading-relaxed mb-6">
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
          in Beantragung – wird nach Erteilung ergänzt.
        </p>

        <h2 className="text-lg font-bold uppercase tracking-tight mb-3">
          Redaktionell verantwortlich (§ 18 Abs. 2 MStV)
        </h2>
        <p className="text-sm text-bone/70 leading-relaxed mb-6">
          Leonid Ryazanskiy, Anschrift wie oben
        </p>

        {/* Der frühere EU-Streitschlichtungs-Block ist bewusst entfernt: die OS-Plattform der
            EU-Kommission wurde eingestellt, der Verweis ginge ins Leere und wäre damit eher
            ein Risiko als eine Absicherung. Begründung in brand/IMPRESSUM_VORLAGE.md. */}

        <h2 className="text-lg font-bold uppercase tracking-tight mb-3">
          Verbraucherstreitbeilegung / Universalschlichtungsstelle
        </h2>
        <p className="text-sm text-bone/70 leading-relaxed mb-6">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>

      </div>
    </main>
  );
}

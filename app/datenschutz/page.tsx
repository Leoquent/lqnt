import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | leoquent",
  alternates: { canonical: absoluteUrl("/datenschutz/") },
  robots: { index: false, follow: true },
};

// ⚠️ Keine Rechtsberatung. Vor dem Livegang prüfen lassen.
//
// Offen: AVV. Den Auftragsverarbeitungsvertrag bei Hostinger tatsächlich abschließen bzw.
// herunterladen. Der Satz unter "Hosting" behauptet ihn — er muss auch existieren.
//
// Serverstandort Deutschland ist bestätigt (14.08.2026) — kein Drittland-Hinweis nötig,
// und die Aussage "gehostet in Deutschland" auf der Startseite ist gedeckt.
//
// Formularbeschreibung gegen den aktuellen Client-Endpunkt abgeglichen.
// Serverbetrieb, Empfänger, Löschfristen und AVV vor Veröffentlichung bestätigen.

export default function DatenschutzPage() {
  return (
    <main className="bg-vanta text-bone min-h-screen break-words">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <a href={`${basePath}/`} className="font-mono text-xs uppercase tracking-widest text-lime underline underline-offset-4 hover:opacity-80 transition-opacity">
          ← Zurück zur Startseite
        </a>

        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mt-8 mb-10">Datenschutz<wbr />erklärung</h1>

        <h2 className="text-lg font-bold uppercase tracking-tight mb-3">1. Verantwortlicher</h2>
        <p className="text-sm text-bone/70 leading-relaxed mb-6">
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
          Leonid Ryazanskiy (leoquent), Uerdinger Str. 75, 40474 Düsseldorf<br />
          E-Mail: <a href="mailto:hi@lqnt.de" className="text-lime underline underline-offset-4 hover:opacity-80">hi@lqnt.de</a>
        </p>

        <h2 className="text-lg font-bold uppercase tracking-tight mb-3">2. Hosting &amp; Server-Logfiles</h2>
        <p className="text-sm text-bone/70 leading-relaxed mb-6">
          Diese Website wird auf einem virtuellen Server (VPS) bei <strong>Hostinger</strong>{" "}
          (Hostinger International Ltd.) betrieben. Der Serverstandort liegt in Deutschland. Beim
          Aufruf der Seite werden automatisch Informationen (Server-Logfiles) erhoben, die Ihr
          Browser übermittelt: IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite,
          Referrer-URL, Browsertyp und Betriebssystem. Die Verarbeitung erfolgt zur Sicherstellung
          eines störungsfreien Betriebs und der Sicherheit (Art. 6 Abs. 1 lit. f DSGVO – berechtigtes
          Interesse). Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.
        </p>

        <h2 className="text-lg font-bold uppercase tracking-tight mb-3">3. Kontakt- und Analyse-Formular</h2>
        <p className="text-sm text-bone/70 leading-relaxed mb-6">
          Wenn Sie ein Kontakt- oder Projektformular nutzen, verarbeite ich Ihre Angaben
          (Name, E-Mail, Telefonnummer, ggf. Website sowie Informationen zu Ihrem Vorhaben,
          Markengrundlagen, gewünschtem Umfang, Zeitrahmen oder betrieblichen Abläufen),
          um Ihre Anfrage zu bearbeiten und Kontakt aufzunehmen (Art. 6 Abs. 1 lit. b und lit. f DSGVO).
          Die Website übermittelt die Angaben an meinen Formular-Endpunkt unter api.lqnt.de.
          Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind
          und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>

        <h2 className="text-lg font-bold uppercase tracking-tight mb-3">4. Kontakt per E-Mail und Telefon</h2>
        <p className="text-sm text-bone/70 leading-relaxed mb-6">
          Wenn Sie mich per E-Mail oder telefonisch kontaktieren, verarbeite ich Ihre Kontaktdaten
          und den Inhalt Ihrer Anfrage zur Bearbeitung Ihres Anliegens und zur Vorbereitung einer
          möglichen Zusammenarbeit (Art. 6 Abs. 1 lit. b und lit. f DSGVO).
        </p>

        <h2 className="text-lg font-bold uppercase tracking-tight mb-3">5. Schriftarten</h2>
        <p className="text-sm text-bone/70 leading-relaxed mb-6">
          Die verwendeten Schriftarten werden lokal von unserem Server ausgeliefert (self-hosted über
          next/font). Es besteht dabei keine Verbindung zu Servern von Google.
        </p>

        <h2 className="text-lg font-bold uppercase tracking-tight mb-3">6. Cookies</h2>
        <p className="text-sm text-bone/70 leading-relaxed mb-6">
          Diese Website setzt keine Tracking- oder Marketing-Cookies.
        </p>

        <h2 className="text-lg font-bold uppercase tracking-tight mb-3">7. Ihre Rechte</h2>
        <p className="text-sm text-bone/70 leading-relaxed mb-6">
          Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
          Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch
          (Art. 21 DSGVO). Zudem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
          beschweren. Wenden Sie sich dazu an{" "}
          <a href="mailto:hi@lqnt.de" className="text-lime underline underline-offset-4 hover:opacity-80">hi@lqnt.de</a>.
        </p>

        <p className="text-xs text-bone/70 leading-relaxed mt-12 border-t border-gridline pt-6 font-mono">
          Stand: {new Date().getFullYear()} · Vorlage – bitte vor dem Launch an die tatsächlich
          eingesetzten Dienste anpassen und rechtlich prüfen lassen.
        </p>
      </div>
    </main>
  );
}

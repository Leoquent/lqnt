const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function SiteFooter() {
    return (
        <footer className="border-t border-gridline flex justify-center font-mono text-xs text-bone/70 bg-vanta w-full">
            <div className="w-full max-w-[1440px] px-6 py-6 md:px-8 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} Leoquent. All systems nominal.</p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                    <a href="tel:+4917647177623" className="hover:text-lime">+49 176 47 177 623</a>
                    <a href="mailto:hi@lqnt.de" className="hover:text-lime">hi@lqnt.de</a>
                    <a href={`${basePath}/impressum/`} className="hover:text-lime">Impressum</a>
                    <a href={`${basePath}/datenschutz/`} className="hover:text-lime">Datenschutz</a>
                </div>
            </div>
        </footer>
    );
}

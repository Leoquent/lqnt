import type { Metadata } from "next";
import { brandFont } from "@/lib/brand-font";
export const metadata: Metadata = { title: "Leoquent — Startseitenvergleich", robots: { index: false, follow: false }, alternates: { canonical: null } };
export default function Layout({children}: {children: React.ReactNode}) { return <div className={brandFont.className}>{children}</div>; }

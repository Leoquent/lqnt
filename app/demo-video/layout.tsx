import type { Metadata } from "next";
export const metadata: Metadata = { title: "Video-Demo | leoquent", robots: { index: false, follow: true } };
export default function DemoLayout({ children }: { children: React.ReactNode }) { return children; }

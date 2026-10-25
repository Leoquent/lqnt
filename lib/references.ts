import "server-only";
import { existingReferences } from "@/content/reference-existing";
import { mollReference } from "@/content/reference-moll";
import type { Reference, ReferencePreview } from "./reference-types";

// Register new content here. Gallery, routes and sitemap use this same collection.
export const references: Reference[] = [...existingReferences, mollReference];
export const referencePath = (slug: string) => `/referenzen/${slug}/`;
export const getReference = (slug: string) => references.find(reference => reference.slug === slug);
export const getReferencePreviews = (): ReferencePreview[] => references.map(({ slug, name, gallery }) => ({ slug, name, ...gallery }));

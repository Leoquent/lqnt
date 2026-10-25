import { notFound } from "next/navigation";
import ReferenceCase from "@/components/ReferenceCase";
import { getReference, referencePath, references } from "@/lib/references";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return references.map(reference => ({ slug: reference.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const reference = getReference(slug);
  if (!reference) notFound();
  return pageMetadata(reference.metadata.title, reference.metadata.description, referencePath(reference.slug));
}

export default async function ReferencePage({ params }: Props) {
  const { slug } = await params;
  const reference = getReference(slug);
  if (!reference) notFound();
  return <ReferenceCase reference={reference} />;
}

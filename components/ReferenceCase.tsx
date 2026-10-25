import { Fragment } from "react";
import Link from "next/link";
import ProjectShowcase from "./ProjectShowcase";
import ProjectScreenshot from "./ProjectScreenshot";
import EditorialPage from "./EditorialPage";
import DirectionArrow from "./DirectionArrow";
import { JsonLd, absoluteUrl } from "@/lib/seo";
import { getReference, referencePath } from "@/lib/references";
import type { Reference, ReferenceBlock, ReferenceLink } from "@/lib/reference-types";
import s from "./editorial.module.css";
import d from "./project-details.module.css";
import c from "./reference-case.module.css";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

function Lines({ values, accentAfterFirst = false }: { values: string[]; accentAfterFirst?: boolean }) {
  return values.map((value, index) => <Fragment key={index}>
    {index > 0 && <br />}
    {accentAfterFirst && index > 0 ? <span>{value}</span> : value}
  </Fragment>);
}

function CaseLink({ link }: { link: ReferenceLink }) {
  const contents = <>{link.label} <DirectionArrow diagonal /></>;
  if (link.href.startsWith("/") && !link.href.startsWith("//")) {
    return <Link href={link.href} className={s.button}>{contents}</Link>;
  }
  const external = /^(https?:)?\/\//i.test(link.href);
  return <a className={s.button} href={link.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{contents}</a>;
}

function CaseBlock({ block }: { block: ReferenceBlock }) {
  switch (block.type) {
    case "section":
      return <section className={s.section}>
        <h2><Lines values={block.heading} /></h2>
        <div>
          {block.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          {block.articles?.map((article, index) => <article key={index}>
            <h3>{article.heading}</h3>
            {article.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
          </article>)}
          {block.link && <CaseLink link={block.link} />}
        </div>
      </section>;
    case "screenshot":
      return <ProjectScreenshot src={block.src} width={block.width} height={block.height} alt={block.alt}>{block.caption}</ProjectScreenshot>;
    case "comparison": {
      const isLogo = block.variant === "logo";
      return <div className={`${c.comparison}${isLogo ? ` ${c.logoComparison}` : ""}`} role="group" aria-label={block.label}>
        {block.items.map((item, index) => <figure key={index}>
          <p className={c.label}>{item.label}</p>
          <a
            className={isLogo ? `${c.logoFrame}${item.cropWhiteSpace ? ` ${c.originalLogo}` : ""}` : c.imageLink}
            href={base + item.image.src}
            target="_blank"
            rel="noreferrer"
            aria-label={item.openLabel}
          >
            <img src={base + item.image.src} width={item.image.width} height={item.image.height} alt={item.image.alt} loading="lazy" />
            {!isLogo && <span>Bild vergrößern <DirectionArrow diagonal /></span>}
          </a>
          <figcaption>{item.caption}</figcaption>
        </figure>)}
      </div>;
    }
    case "brand":
      return <figure className={d.brandBoard}>
        <div className={d.brandGrid}>
          <div className={d.wordmark}><img src={base + block.wordmark.src} width={block.wordmark.width} height={block.wordmark.height} alt={block.wordmark.alt} loading="lazy" /></div>
          <div className={d.signet}><img src={base + block.signet.src} width={block.signet.width} height={block.signet.height} alt={block.signet.alt} loading="lazy" /></div>
        </div>
        <div className={d.brandFoot}>
          <div className={d.swatches}>{block.swatches.map(swatch => <span key={swatch.label}><i style={{ background: swatch.color }} aria-hidden="true" />{swatch.label}</span>)}</div>
          <div className={d.favicon}><img src={base + block.favicon.src} width={block.favicon.width} height={block.favicon.height} alt={block.favicon.alt} loading="lazy" /><span>{block.faviconCaption}</span></div>
        </div>
        <figcaption>{block.caption}</figcaption>
      </figure>;
  }
}

export default function ReferenceCase({ reference }: { reference: Reference }) {
  const related = getReference(reference.relatedSlug);
  const testimonial = reference.testimonial;
  const showTestimonial = testimonial?.approved === true
    && Boolean(testimonial.quote.trim())
    && Boolean(testimonial.name.trim())
    && Boolean(testimonial.role.trim());

  return <EditorialPage label={reference.name} project={reference.gallery.theme}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Webdesign", item: absoluteUrl("/webdesign/") },
      { "@type": "ListItem", position: 3, name: reference.name, item: absoluteUrl(referencePath(reference.slug)) },
    ] }} />
    <div className={d.hero}>
      <p className={s.eyebrow}>Aus meiner Arbeit / {reference.name}</p>
      <h1><Lines values={reference.hero.heading} accentAfterFirst /></h1>
      <p className={d.intro}>{reference.hero.intro}</p>
    </div>
    <ProjectShowcase name={reference.name} poster={reference.hero.poster} mobile={reference.hero.mobile} color={reference.hero.color} />
    <div className={d.overview}><p>{reference.overview.text}</p><p><Lines values={reference.overview.services.split("\n")} /></p></div>
    <dl className={s.facts}>{reference.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd><Lines values={fact.value} /></dd></div>)}</dl>
    {reference.blocks.map((block, index) => <CaseBlock key={index} block={block} />)}
    {related && <div className={d.related}><Link href={referencePath(related.slug)}><span><small>{reference.relatedLabel ?? "Weiteres Projekt"}</small>{related.name}</span><DirectionArrow diagonal /></Link></div>}
    {showTestimonial && testimonial && <figure className={c.testimonial}>
      <p className={s.eyebrow}>Kundenstimme</p>
      <blockquote><p>{testimonial.quote.trim()}</p></blockquote>
      <figcaption><span className={c.testimonialName}>{testimonial.name.trim()}</span><span>{testimonial.role.trim()}</span></figcaption>
    </figure>}
    <div className={s.callout}>
      <h2><Lines values={reference.closing.heading} /></h2>
      <p>{reference.closing.text}</p>
      <CaseLink link={reference.closing.link} />
    </div>
  </EditorialPage>;
}

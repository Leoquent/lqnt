export type ReferenceImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ReferenceLink = { label: string; href: string };

export type ReferenceBlock =
  | {
      type: "section";
      heading: string[];
      paragraphs?: string[];
      articles?: { heading: string; paragraphs: string[] }[];
      link?: ReferenceLink;
    }
  | ({ type: "screenshot"; caption: string } & ReferenceImage)
  | {
      type: "comparison";
      label: string;
      variant: "website" | "logo";
      items: {
        label: string;
        image: ReferenceImage;
        caption: string;
        openLabel: string;
        cropWhiteSpace?: boolean;
      }[];
    }
  | {
      type: "brand";
      wordmark: ReferenceImage;
      signet: ReferenceImage;
      swatches: { label: string; color: string }[];
      favicon: ReferenceImage;
      faviconCaption: string;
      caption: string;
    };

export type Reference = {
  slug: string;
  name: string;
  metadata: { title: string; description: string };
  gallery: {
    category: string;
    description: string;
    poster: string;
    theme: "navy" | "yellow" | "red";
    wide?: boolean;
  };
  hero: { heading: string[]; intro: string; poster: string; mobile: string; color: string };
  overview: { text: string; services: string };
  facts: { label: string; value: string[] }[];
  blocks: ReferenceBlock[];
  relatedSlug: string;
  relatedLabel?: string;
  closing: { heading: string[]; text: string; link: ReferenceLink };
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    approved: boolean;
  };
};

export type ReferencePreview = Pick<Reference, "slug" | "name"> & Reference["gallery"];

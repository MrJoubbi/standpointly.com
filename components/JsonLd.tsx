import React from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function buildWebsiteJsonLd(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Standpointly",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/icon.svg`,
          width: 512,
          height: 512,
        },
        description:
          "Privacy-first psychometric and standpoint mapping platform with zero server-side storage and 2D coordinate precision.",
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Standpointly",
        description:
          "High-resolution 2D coordinate personality, political, and attachment style mapping.",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        inLanguage: "en",
      },
      {
        "@type": "WebApplication",
        "@id": `${baseUrl}/#application`,
        name: "Standpointly Assessment Platform",
        url: baseUrl,
        applicationCategory: "LifestyleApplication, EducationalApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "100% Client-Side Scoring",
          "Zero Data Storage Privacy",
          "High-Resolution 2D Cartesian Coordinate Grid",
          "9-Archetype Sector Analysis",
          "Interactive Standpoint Comparison",
          "Printable Vector PDF Certificates",
          "Social Share Cards (1:1 and 9:16)",
        ],
      },
    ],
  };
}

export function buildQuizJsonLd({
  testId,
  title,
  description,
  questionCount,
  url,
  baseUrl,
}: {
  testId: string;
  title: string;
  description: string;
  questionCount: number;
  url: string;
  baseUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Quiz",
        "@id": `${url}/#quiz`,
        name: title,
        description,
        url,
        inLanguage: "en",
        educationalLevel: "All",
        typicalAgeRange: "13-",
        numberOfQuestions: questionCount,
        provider: {
          "@id": `${baseUrl}/#organization`,
        },
        about: {
          "@type": "Thing",
          name:
            testId === "political"
              ? "Political Philosophy & Civic Governance"
              : testId === "attachment"
              ? "Adult Attachment Theory & Relationship Psychology"
              : "Personality and Psychometrics",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Assessments",
            item: `${baseUrl}/#catalogue`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: url,
          },
        ],
      },
    ],
  };
}

export function buildArticleJsonLd({
  title,
  description,
  url,
  baseUrl,
}: {
  title: string;
  description: string;
  url: string;
  baseUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url,
    inLanguage: "en",
    author: {
      "@id": `${baseUrl}/#organization`,
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

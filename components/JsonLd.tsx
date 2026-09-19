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

function aboutTopicForTest(testId: string): string {
  const topics: Record<string, string> = {
    // Field 01 - Personality
    "big-five": "Five-Factor Model of Personality & Trait Psychology",
    "dark-triad": "Subclinical Machiavellianism, Narcissism & Psychopathy",
    empathy: "Affective & Cognitive Empathy Psychometrics",
    "emotional-intelligence": "Emotional Intelligence, Self-Regulation & Social Awareness",
    "self-esteem": "Self-Esteem Contingencies & Psychological Self-Worth",

    // Field 02 - Relationships
    attachment: "Adult Attachment Theory & Relational Security",
    "love-language": "Interpersonal Affection Modalities & Relational Expression",
    compatibility: "Dyadic Compatibility & Interpersonal Synergy",
    "relationship-anxiety": "Relational Attachment Vigilance & Abandonment Sensitivity",
    boundaries: "Bowen Family Systems & Interpersonal Boundary Architecture",

    // Field 03 - Beliefs & Values
    political: "Political Philosophy, Civic Governance & Ideological Coordinates",
    "feminist-perspectives": "Feminist Theory, Gender Philosophy & Sociological Paradigms",
    "moral-foundations": "Moral Foundations Theory & Ethics Psychology",
    "gender-equality": "Gender Equity, Structural Parity & Societal Roles",
    "individualism-collectivism": "Cultural Axiology & Individualism vs. Collectivism",

    // Field 04 - Wellbeing
    stress: "Perceived Stress Scale & Psychological Coping Capacity",
    burnout: "Maslach Burnout Inventory & Occupational Exhaustion",
    "emotional-regulation": "Gross Emotion Regulation Process Model",
    resilience: "Connor-Davidson Resilience Scale & Psychological Hardiness",
    procrastination: "Temporal Motivation Theory & Procrastination Psychology",

    // Field 05 - Work & Career
    "career-personality": "Schein Career Anchors & Vocational Psychology",
    "work-style": "Occupational Ergonomics & Execution Rhythm",
    "leadership-style": "Full Range Leadership Model & Transformational Leadership",
    "career-values": "Super's Work Values & Professional Motivation",
    "decision-making-style": "General Decision-Making Style (GDMS) Psychology",
  };

  return topics[testId] ?? "Psychometrics, Coordinate Mapping & Personality Science";
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
          name: aboutTopicForTest(testId),
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

export function buildFaqJsonLd(
  items: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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

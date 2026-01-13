import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  cs: "cs_CZ",
  uk: "uk_UA",
  ru: "ru_RU",
  it: "it_IT",
};

const SOCIAL_LINKS = [
  "https://www.instagram.com/jazykaintegrace",
  "https://www.facebook.com/jazykaintegrace",
  "https://vk.com/jazykaintegrace",
];

const getSiteUrl = () => {
  const envUrl = import.meta.env.VITE_SITE_URL as string | undefined;
  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
};

const setMetaTag = (name: string, content: string, attribute: "name" | "property" = "name") => {
  if (!content) return;
  const selector = `meta[${attribute}="${name}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const setLinkTag = (rel: string, href: string) => {
  if (!href) return;
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

const setJsonLd = (id: string, data: Record<string, unknown>) => {
  const scriptId = `json-ld-${id}`;
  let element = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!element) {
    element = document.createElement("script");
    element.setAttribute("type", "application/ld+json");
    element.setAttribute("id", scriptId);
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
};

export const SEO = () => {
  const { t, i18n } = useTranslation();
  const language = (i18n.language || "en").split("-")[0];
  const locale = LOCALE_MAP[language] || LOCALE_MAP.en;

  const title = t("seo.title", "Online Czech Courses in Prague | Jazyk a Integrace");
  const description = t(
    "seo.description",
    "Online Czech courses in Prague for expats, especially Ukrainian residents. Small groups, real-life focus, A1-B2 levels.",
  );
  const keywords = t(
    "seo.keywords",
    "online Czech courses, Czech classes Prague, Czech for expats, Ukrainian expats Prague, Czech language school, A1 B2 Czech",
  );
  const siteName = t("seo.siteName", "Jazyk a Integrace");
  const audience = t("seo.audience", "Expats in Prague, especially Ukrainian residents.");

  useEffect(() => {
    const siteUrl = getSiteUrl();
    const canonicalUrl = siteUrl ? `${siteUrl}/` : "/";
    const ogImage = siteUrl ? `${siteUrl}/og-image.png` : "/og-image.png";

    document.title = title;
    setMetaTag("description", description);
    setMetaTag("keywords", keywords);
    setMetaTag("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMetaTag("author", siteName);

    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:type", "website", "property");
    setMetaTag("og:site_name", siteName, "property");
    setMetaTag("og:image", ogImage, "property");
    setMetaTag("og:image:alt", siteName, "property");
    setMetaTag("og:url", canonicalUrl, "property");
    setMetaTag("og:locale", locale, "property");

    document
      .querySelectorAll('meta[property="og:locale:alternate"]')
      .forEach((element) => element.remove());
    Object.values(LOCALE_MAP)
      .filter((altLocale) => altLocale !== locale)
      .forEach((altLocale) => {
        const element = document.createElement("meta");
        element.setAttribute("property", "og:locale:alternate");
        element.setAttribute("content", altLocale);
        document.head.appendChild(element);
      });

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", ogImage);
    setMetaTag("twitter:image:alt", siteName);

    setLinkTag("canonical", canonicalUrl);

    const schema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Jazyk a Integrace s.r.o.",
      alternateName: siteName,
      url: canonicalUrl,
      logo: ogImage,
      image: [ogImage],
      description,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Cernomorska 384/9",
        addressLocality: "Praha 10",
        addressCountry: "CZ",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "jazykaintegrace@gmail.com",
          telephone: "+420601177208",
          availableLanguage: ["cs", "en", "uk", "ru", "it"],
        },
      ],
      areaServed: [
        { "@type": "City", name: "Prague" },
        { "@type": "Country", name: "Czech Republic" },
      ],
      audience: {
        "@type": "PeopleAudience",
        audienceType: audience,
      },
      knowsAbout: [
        "Czech language",
        "Integration in Prague",
        "Online Czech courses",
        "Czech for expats",
      ],
      sameAs: SOCIAL_LINKS,
      inLanguage: ["cs", "en", "uk", "ru", "it"],
      foundingDate: "2012",
    };

    setJsonLd("organization", schema);
  }, [title, description, keywords, siteName, locale, audience]);

  return null;
};

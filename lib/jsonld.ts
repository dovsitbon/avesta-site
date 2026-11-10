import site from "@/data/site.json";
import { getDict, locales, type Locale } from "@/lib/i18n";
import { weekHours } from "@/lib/hours";
import { categories, ITEMS } from "@/lib/carte";
import { pagePath, type PageId } from "@/lib/pages";

const BUSINESS = `${site.url}/#restaurant`;
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function menu(lang: Locale) {
  const d = getDict(lang);
  return {
    "@type": "Menu",
    "@id": `${site.url}${pagePath("carte", lang)}#menu`,
    name: d.pages.carte.title,
    inLanguage: lang,
    hasMenuSection: categories().map((c) => ({
      "@type": "MenuSection",
      name: d.carte.tabs[c.id],
      // Les plats « à confirmer » ne sont pas annoncés à Google tant que le restaurant ne les a pas validés
      hasMenuItem: c.items
        .filter((id) => !ITEMS[id].tags.includes("toConfirm"))
        .map((id) => {
          const it = ITEMS[id];
          return {
            "@type": "MenuItem",
            name: d.products[id].name,
            description: d.products[id].desc,
            ...(it.price !== null ? { offers: { "@type": "Offer", price: it.price.toFixed(2), priceCurrency: "EUR" } } : {}),
          };
        }),
    })),
  };
}

function business(lang: Locale) {
  const d = getDict(lang);
  return {
    "@type": "Restaurant",
    "@id": BUSINESS,
    name: site.name,
    alternateName: ["Avesta Amiens", "Restaurant Avesta"],
    description: d.meta.description,
    url: `${site.url}/${lang}`,
    image: [`${site.url}/og.jpg`],
    logo: `${site.url}/logo-dark.svg`,
    telephone: site.phoneIntl,
    priceRange: "€",
    servesCuisine: ["Persian", "Fast food"],
    address: { "@type": "PostalAddress", streetAddress: site.address.street, postalCode: site.address.postalCode, addressLocality: site.address.city, addressRegion: site.address.region, addressCountry: site.address.country },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    // closes < opens : fermeture le lendemain matin (11:00 → 05:00)
    openingHoursSpecification: weekHours().flatMap((slots, i) => slots.map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${DAYS[i]}`, opens, closes }))),
    // Note Google relevée à la main (date dans data/site.json → rating.checked) : à mettre à jour de temps en temps
    aggregateRating: { "@type": "AggregateRating", ratingValue: site.rating.value, reviewCount: site.rating.count, bestRating: 5, worstRating: 1, dateModified: site.rating.checked },
    acceptsReservations: false,
    currenciesAccepted: "EUR",
    hasMenu: { "@id": `${site.url}${pagePath("carte", lang)}#menu` },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: lang === "fr" ? "Vente à emporter" : "Takeaway", value: true },
      { "@type": "LocationFeatureSpecification", name: lang === "fr" ? "Repas sur place" : "Dine-in", value: true },
      { "@type": "LocationFeatureSpecification", name: lang === "fr" ? "Ouvert tard, jusqu'à 5 h" : "Open late, until 5 am", value: true },
    ],
    sameAs: [site.deliveroo],
    potentialAction: { "@type": "OrderAction", target: `${site.url}/${lang}#commander`, deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModePickUp" },
  };
}

/** Données structurées de l'accueil : Restaurant (horaires, note Google, menu), FAQ. */
export function homeJsonLd(lang: Locale) {
  const d = getDict(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: [...locales], publisher: { "@id": BUSINESS } },
      business(lang),
      menu(lang),
      { "@type": "FAQPage", mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
}

/** Données structurées d'une page secondaire, plus fil d'Ariane. */
export function pageJsonLd(lang: Locale, id: PageId) {
  const d = getDict(lang);
  const url = `${site.url}${pagePath(id, lang)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      business(lang),
      ...(id === "carte" || id === "tacos" ? [menu(lang)] : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/${lang}` },
          { "@type": "ListItem", position: 2, name: d.pages[id].title, item: url },
        ],
      },
    ],
  };
}

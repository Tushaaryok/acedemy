

export default function SchemaOrg() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Krishna Academy Upleta",
    "url": "https://krishnaacademyupleta.vercel.app/",
    "logo": "https://krishnaacademyupleta.vercel.app/favicon.png",
    "image": "https://krishnaacademyupleta.vercel.app/favicon.png",
    "description": "Best coaching classes and tuition institute in Upleta for students from Std 5 to 12. Specializing in commerce and science coaching.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shaligram Complex, Adarsh Street, Vadchok",
      "addressLocality": "Upleta",
      "addressRegion": "Gujarat",
      "postalCode": "360490",
      "addressCountry": "IN"
    },
    "telephone": "+91-8160991166",
    "priceRange": "$$",
    "sameAs": [
      "https://www.facebook.com/share/1KqsMzi9CW/",
      "https://www.instagram.com/shreeram_singh901?igsh=MXBoMWR0bGd3cHhxNQ==",
      "https://youtube.com"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Coaching Services",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Std 12 Science Board Preparation",
          "description": "Comprehensive coaching for GSEB/CBSE 12th Science.",
          "provider": { "@type": "EducationalOrganization", "name": "Krishna Academy" }
        },
        {
          "@type": "Course",
          "name": "Std 10 Board Excellence",
          "description": "Foundational coaching for 10th board exams.",
          "provider": { "@type": "EducationalOrganization", "name": "Krishna Academy" }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

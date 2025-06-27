export interface OrganizationData {
  name: string;
  url: string;
  logo?: string;
  description?: string;
}

export interface ArticleData {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  url: string;
}

export interface BreadcrumbData {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export interface WebSiteData {
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    target: string;
    'query-input': string;
  };
}

export const generateOrganizationSchema = (data: OrganizationData) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: data.name,
  url: data.url,
  logo: data.logo || `${data.url}/favicon.png`,
  description: data.description || 'TT Cyclopedia - Your comprehensive table tennis knowledge base',
  sameAs: [
    'https://twitter.com/ttcyclopedia',
    'https://facebook.com/ttcyclopedia'
  ]
});

export const generateArticleSchema = (data: ArticleData) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: data.title,
  description: data.description,
  author: {
    '@type': 'Person',
    name: data.author
  },
  publisher: {
    '@type': 'Organization',
    name: 'TT Cyclopedia',
    logo: {
      '@type': 'ImageObject',
      url: 'https://ttcyclopedia.space/favicon.png'
    }
  },
  datePublished: data.datePublished,
  dateModified: data.dateModified,
  image: data.image || 'https://ttcyclopedia.space/og-image.png',
  url: data.url,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': data.url
  }
});

export const generateBreadcrumbSchema = (data: BreadcrumbData) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: data.items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const generateWebSiteSchema = (data: WebSiteData) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: data.name,
  url: data.url,
  description: data.description,
  potentialAction: data.potentialAction ? {
    '@type': 'SearchAction',
    target: data.potentialAction.target,
    'query-input': data.potentialAction['query-input']
  } : undefined
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  url: string;
  brand: string;
  category: string;
  price?: string;
  availability?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  url: product.url,
  brand: {
    '@type': 'Brand',
    name: product.brand
  },
  category: product.category,
  ...(product.price && { offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: 'USD',
    availability: product.availability || 'https://schema.org/InStock'
  }})
}); 
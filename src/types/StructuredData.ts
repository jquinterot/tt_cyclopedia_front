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

export interface FAQData {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

// Schema generation functions
export function generateWebSiteSchema(data: WebSiteData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    description: data.description,
    ...(data.potentialAction && {
      potentialAction: {
        '@type': 'SearchAction',
        target: data.potentialAction.target,
        'query-input': data.potentialAction['query-input']
      }
    })
  };
}

export function generateArticleSchema(data: ArticleData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    author: {
      '@type': 'Person',
      name: data.author
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    ...(data.image && { image: data.image }),
    url: data.url
  };
}

export function generateBreadcrumbSchema(data: BreadcrumbData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function generateOrganizationSchema(data: OrganizationData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    ...(data.logo && { logo: data.logo }),
    ...(data.description && { description: data.description })
  };
}

export function generateFAQSchema(data: FAQData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  };
} 
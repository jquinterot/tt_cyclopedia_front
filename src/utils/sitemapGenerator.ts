export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapData {
  urls: SitemapUrl[];
  baseUrl: string;
}

export const generateSitemapXML = (data: SitemapData): string => {
  const { urls, baseUrl } = data;
  
  const xmlUrls = urls.map(url => {
    const loc = url.loc.startsWith('http') ? url.loc : `${baseUrl}${url.loc}`;
    const lastmod = url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : '';
    const changefreq = url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : '';
    const priority = url.priority ? `<priority>${url.priority}</priority>` : '';
    
    return `  <url>
    <loc>${loc}</loc>${lastmod}${changefreq}${priority}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
};

export const generateStaticSitemap = (): SitemapData => {
  const baseUrl = 'https://ttcyclopedia.space';
  const currentDate = new Date().toISOString().split('T')[0];
  
  return {
    baseUrl,
    urls: [
      {
        loc: '/',
        lastmod: currentDate,
        changefreq: 'daily',
        priority: 1.0
      },
      {
        loc: '/about',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: '/login',
        lastmod: currentDate,
        changefreq: 'yearly',
        priority: 0.3
      },
      {
        loc: '/signup',
        lastmod: currentDate,
        changefreq: 'yearly',
        priority: 0.3
      },
      {
        loc: '/createPost',
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.6
      }
    ]
  };
};

export const generateDynamicSitemap = (posts: Array<{ id: string; updatedAt: string }>): SitemapData => {
  const baseUrl = 'https://ttcyclopedia.space';
  const staticSitemap = generateStaticSitemap();
  
  const postUrls = posts.map(post => ({
    loc: `/posts/${post.id}`,
    lastmod: new Date(post.updatedAt).toISOString().split('T')[0],
    changefreq: 'weekly' as const,
    priority: 0.7
  }));
  
  return {
    baseUrl,
    urls: [...staticSitemap.urls, ...postUrls]
  };
}; 
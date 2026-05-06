import MainContent from './components/MainContent/MainContent';
import SEOHead from '@/components/SEO/SEOHead';
import PerformanceOptimizer from '@/components/SEO/PerformanceOptimizer';
import { generateWebSiteSchema } from '@/types/StructuredData';

function MainPage() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const structuredData = generateWebSiteSchema({
    name: 'TT Cyclopedia',
    url: BASE_URL,
    description: 'TT Cyclopedia is your comprehensive source for table tennis knowledge, equipment reviews, player tips, and community discussions.',
    potentialAction: {
      target: `${BASE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  });

  return (
    <>
      <SEOHead
        title="TT Cyclopedia - Table Tennis Knowledge & Community"
        description="Discover the latest table tennis equipment reviews, tips, and community discussions. Join TT Cyclopedia for comprehensive table tennis knowledge and insights."
        keywords="table tennis, ping pong, equipment reviews, tips, community, TT Cyclopedia, racket, blade, rubber, training"
        canonical="/"
        ogTitle="TT Cyclopedia - Table Tennis Knowledge & Community"
        ogDescription="Discover the latest table tennis equipment reviews, tips, and community discussions. Join TT Cyclopedia for comprehensive table tennis knowledge and insights."
        ogUrl="/"
        structuredData={structuredData}
      />
      <PerformanceOptimizer
        preloadImages={[`${BASE_URL}/og-image.png`]}
        prefetchRoutes={['/forums', '/about']}
      />
      <div data-testid="main-page" className="min-h-screen flex flex-col">
      <div className="flex-grow flex justify-center">
        <MainContent />
      </div>
    </div>
    </>
  );
}

export default MainPage;

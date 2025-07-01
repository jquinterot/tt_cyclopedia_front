import MainContent from './components/MainContent/MainContent';
import SEOHead from '@/components/SEO/SEOHead';
import { generateWebSiteSchema } from '@/components/SEO/StructuredData';

function MainPage() {
  const structuredData = generateWebSiteSchema({
    name: 'TT Cyclopedia',
    url: 'https://ttcyclopedia.space',
    description: 'TT Cyclopedia is your comprehensive source for table tennis knowledge, equipment reviews, player tips, and community discussions.',
    potentialAction: {
      target: 'https://ttcyclopedia.space/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  });

  return (
    <div data-testid="main-page" className="min-h-screen flex flex-col">
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
      <div data-testid="main-content" className="flex-grow flex justify-center">
        <MainContent />
      </div>
    </div>
  );
}

export default MainPage;

import ForumDetails from './components/ForumDetailsSection/ForumDetailsSection';
import SEOHead from '@/components/SEO/SEOHead';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/components/SEO/StructuredData';
import { useParams } from 'react-router-dom';
import { useForum } from '@/hooks/forums/useForum';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

function ForumPage() {
  const { id } = useParams<{ id: string }>();
  const { data: forum, isLoading, error } = useForum(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !forum) {
    return (
      <main className="flex-grow flex justify-center px-4 py-8" data-testid="forum-page">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Forum Not Found</h1>
          <p className="text-gray-400">The forum you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }

  const articleData = generateArticleSchema({
    title: forum.title,
    description: forum.content.substring(0, 160) + '...',
    author: forum.author || 'TT Cyclopedia User',
    datePublished: new Date(forum.timestamp).toISOString(),
    dateModified: new Date(forum.timestamp).toISOString(),
    image: 'https://ttcyclopedia.space/og-image.png',
    url: `https://ttcyclopedia.space/forums/${forum.id}`
  });

  const breadcrumbData = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: 'https://ttcyclopedia.space/' },
      { name: 'Forums', url: 'https://ttcyclopedia.space/forums' },
      { name: forum.title, url: `https://ttcyclopedia.space/forums/${forum.id}` }
    ]
  });

  return (
    <>
      <SEOHead
        title={`${forum.title} - TT Cyclopedia Forums`}
        description={forum.content.substring(0, 160) + '...'}
        keywords={`table tennis, forum, ${forum.title.toLowerCase()}, TT Cyclopedia, community, discussion`}
        canonical={`/forums/${forum.id}`}
        ogTitle={forum.title}
        ogDescription={forum.content.substring(0, 160) + '...'}
        ogUrl={`/forums/${forum.id}`}
        ogType="article"
        ogImage="https://ttcyclopedia.space/og-image.png"
        twitterTitle={forum.title}
        twitterDescription={forum.content.substring(0, 160) + '...'}
        twitterImage="https://ttcyclopedia.space/twitter-image.png"
        structuredData={[articleData, breadcrumbData]}
      />
      <main className="flex-grow flex justify-center px-4 py-8" data-testid="forum-page">
        <ForumDetails />
      </main>
    </>
  );
}

export default ForumPage; 
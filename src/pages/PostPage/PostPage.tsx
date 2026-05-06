import PostDetails from './components/PostDetailsSection/PostDetailsSection';
import SEOHead from '@/components/SEO/SEOHead';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/types/StructuredData';
import { useParams } from 'react-router-dom';
import { usePostById } from '@/hooks/posts/usePostById';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const { post, isLoading, error } = usePostById(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !post) {
    return (
      <main className="flex-grow flex justify-center px-4 py-8" data-testid="post-page">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Post Not Found</h1>
          <p className="text-gray-400">The post you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const articleData = generateArticleSchema({
    title: post.title,
    description: post.content.substring(0, 160),
    author: post.author || 'TT Cyclopedia User',
    datePublished: new Date(post.timestamp || Date.now()).toISOString(),
    dateModified: new Date(post.timestamp || Date.now()).toISOString(),
    image: post.image_url || `${BASE_URL}/og-image.png`,
    url: `${BASE_URL}/posts/${post.id}`,
    mainEntityOfPage: `${BASE_URL}/posts/${post.id}`,
    articleBody: post.content,
    publisher: {
      name: 'TT Cyclopedia',
      logo: `${BASE_URL}/logo.png`
    }
  });

  const breadcrumbData = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Posts', url: `${BASE_URL}/` },
      { name: post.title, url: `${BASE_URL}/posts/${post.id}` }
    ]
  });

  return (
    <>
      <SEOHead
        title={`${post.title} - TT Cyclopedia`}
        description={post.content.substring(0, 160) + '...'}
        keywords={`table tennis, ${post.title.toLowerCase()}, TT Cyclopedia, equipment, tips, community`}
        canonical={`/posts/${post.id}`}
        ogTitle={post.title}
        ogDescription={post.content.substring(0, 160) + '...'}
        ogUrl={`/posts/${post.id}`}
        ogType="article"
        ogImage={post.image_url || `${BASE_URL}/og-image.png`}
        twitterTitle={post.title}
        twitterDescription={post.content.substring(0, 160) + '...'}
        twitterImage={post.image_url || `${BASE_URL}/twitter-image.png`}
        structuredData={[articleData, breadcrumbData]}
      />
      <main className="flex-grow flex justify-center px-4 py-8" data-testid="post-page">
        <PostDetails />
      </main>
    </>
  );
}

export default PostPage;
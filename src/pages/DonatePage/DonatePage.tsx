import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEO/SEOHead';

export default function DonatePage() {
  return (
    <>
      <SEOHead
        title="Support TT Cyclopedia"
        description="Support TT Cyclopedia and help us continue providing quality table tennis content, equipment reviews, and community forums."
        canonical="/donate"
      />
      <div className="max-w-2xl mx-auto py-12 px-4 text-center" data-testid="donate-page">
      <h1 className="text-3xl font-bold mb-6" data-testid="donate-heading">Support TT Cyclopedia</h1>
      
      <div className="mb-8 text-gray-300 leading-relaxed" data-testid="donate-content">
        <p className="mb-4">
          TT Cyclopedia is a community-driven platform dedicated to sharing the best table tennis content with players of all levels.
        </p>
        <p className="mb-4">
          Our mission is to:
        </p>
        <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            Share knowledge and tips for beginners, intermediates, and advanced players
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            Review equipment and help you find the right gear for your playing style
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            Connect the table tennis community through forums, posts, and discussions
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            Partner with vendors and coaches to bring exclusive offers and opportunities to our members
          </li>
        </ul>
        <p className="mb-6">
          Whether you're just starting out or looking to take your game to the next level, TT Cyclopedia is here to support your journey.
        </p>
        <p>
          If you enjoy our content and want to help us grow, consider supporting us through a donation!
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 mb-8">
        <a
          href="https://coff.ee/tt_cyclopedia"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors font-semibold text-lg flex items-center gap-2"
          data-testid="donate-button"
        >
          <span>☕</span>
          Buy Me a Coffee
        </a>
      </div>

      <div className="text-gray-400 text-sm">
        <p className="mb-4">Thank you for your support! 🙏</p>
        <Link to="/" className="text-blue-400 hover:underline" data-testid="donate-back-link">
          ← Back to Home
        </Link>
      </div>
    </div>
    </>
  );
} 
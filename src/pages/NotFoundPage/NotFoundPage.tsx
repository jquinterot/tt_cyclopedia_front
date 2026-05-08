import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";

export default function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Page Not Found - TT Cyclopedia"
        description="Sorry, the page you're looking for doesn't exist. Explore our table tennis equipment reviews, guides, and community forums."
        keywords="404, page not found, table tennis, equipment"
        noindex
      />
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4"
        data-testid="not-found-page"
      >
        <div className="text-center">
          <h1
            className="text-9xl font-bold text-white/10"
            data-testid="not-found-code"
          >
            404
          </h1>
          <h2
            className="text-3xl font-semibold text-white mt-[-60px] mb-4"
            data-testid="not-found-heading"
          >
            Page Not Found
          </h2>
          <p
            className="text-gray-400 mb-8 max-w-md"
            data-testid="not-found-message"
          >
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              data-testid="not-found-home-link"
            >
              Go Home
            </Link>
            <Link
              to="/forums"
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              data-testid="not-found-forums-link"
            >
              Browse Forums
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3
            className="text-lg font-semibold text-white mb-4"
            data-testid="not-found-popular-heading"
          >
            Popular Pages
          </h3>
          <div
            className="flex flex-wrap gap-4 justify-center"
            data-testid="not-found-popular-links"
          >
            <Link to="/" className="text-blue-400 hover:text-blue-300">
              Home
            </Link>
            <Link to="/forums" className="text-blue-400 hover:text-blue-300">
              Forums
            </Link>
            <Link to="/about" className="text-blue-400 hover:text-blue-300">
              About
            </Link>
            <Link
              to="/createPost"
              className="text-blue-400 hover:text-blue-300"
            >
              Create Post
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

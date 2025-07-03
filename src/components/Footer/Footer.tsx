function FooterHeading() {
  return (
    <h2
      className="text-xl font-bold mb-2 text-white"
      data-testid="footer-heading"
    >
      TT Cyclopedia
    </h2>
  );
}

// FooterDescription.tsx
function FooterDescription() {
  return (
    <p
      className="text-sm text-gray-300 leading-relaxed max-w-2xl"
      data-testid="footer-description"
    >
      Your premier destination for comprehensive blade equipment reviews. Share experiences, read detailed analyses, and connect with cutting enthusiasts worldwide. Support us through Buy Me a Coffee!
    </p>
  );
}

// FooterSocialLinks.tsx
function FooterSocialLinks() {
  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      <a 
        href="/donate" 
        className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium flex items-center gap-1"
        data-testid="footer-donate-link"
      >
        <span>☕</span>
        Support Us
      </a>
    </div>
  );
}

// FooterCopyright.tsx
function FooterCopyright() {
  return (
    <div className="border-t border-white/5 bg-slate-900/80" data-testid="footer-content">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
        <p className="text-center text-sm text-gray-400" data-testid="footer-copyright">
          © {new Date().getFullYear()} TT Cyclopedia. All rights reserved.
        </p>
      </div>
    </div>
  );
}

// Main Footer.tsx
export default function Footer() {
  return (
    <footer
      className="bg-slate-900/60 backdrop-blur-md border-t border-white/10 text-white mt-auto"
      data-testid="footer"
    >
      <div className="mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-prose">
            <FooterHeading />
            <FooterDescription />
          </div>
          <FooterSocialLinks />
        </div>
      </div>
      <FooterCopyright />
    </footer>
  );
}
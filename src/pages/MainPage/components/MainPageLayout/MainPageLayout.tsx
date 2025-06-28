// Removed unused imports for NavBar and Footer

interface MainPageLayoutProps {
  children: React.ReactNode;
}

export default function MainPageLayout({ children }: MainPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col font-sans text-white" data-testid="main-page">
      {children}
    </div>
  );
} 
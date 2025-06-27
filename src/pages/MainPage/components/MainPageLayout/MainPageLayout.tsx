import React from 'react';
import NavBar from "../../../../components/shared/NavBar/NavBar";
import Footer from "../../../../components/shared/Footer/Footer";

interface MainPageLayoutProps {
  children: React.ReactNode;
}

export default function MainPageLayout({ children }: MainPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col font-sans text-white" data-testid="main-page">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
} 
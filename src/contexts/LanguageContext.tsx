import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.createPost': 'Create Post',
    'nav.about': 'About',
    'nav.signIn': 'Sign In',
    'nav.logout': 'Logout',
    'form.comment.placeholder': 'Write a comment...',
    'form.comment.signInPlaceholder': 'Sign in to comment',
    'form.comment.submit': 'Add Comment',
    'form.comment.signInButton': 'Sign in to comment',
    'comments.title': 'Comments',
    'about.title': 'About TT Cyclopedia',
    'about.description': 'TT Cyclopedia is a community-driven platform for table tennis enthusiasts to share their knowledge and experiences with rackets and equipment.',
    'about.mission.title': 'Our Mission',
    'about.mission.item1': 'Provide comprehensive table tennis equipment reviews',
    'about.mission.item2': 'Create a community of passionate table tennis enthusiasts',
    'about.mission.item3': 'Share expert maintenance and usage tips for rackets',
    'about.mission.item4': 'Preserve traditional table tennis craftsmanship',
    'about.features.title': 'Features',
    'about.features.reviews.title': 'Detailed Reviews',
    'about.features.reviews.description': 'In-depth analysis of blade materials, rubbers, and overall racket performance',
    'about.features.community.title': 'Community Driven',
    'about.features.community.description': 'Share your experiences and learn from other table tennis enthusiasts',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.createPost': 'Crear Post',
    'nav.about': 'Acerca de',
    'nav.signIn': 'Iniciar Sesión',
    'nav.logout': 'Cerrar Sesión',
    'form.comment.placeholder': 'Escribe un comentario...',
    'form.comment.signInPlaceholder': 'Inicia sesión para comentar',
    'form.comment.submit': 'Agregar Comentario',
    'form.comment.signInButton': 'Inicia sesión para comentar',
    'comments.title': 'Comentarios',
    'about.title': 'Acerca de TT Cyclopedia',
    'about.description': 'TT Cyclopedia es una plataforma impulsada por la comunidad para que los entusiastas del tenis de mesa compartan sus conocimientos y experiencias con raquetas y equipamiento.',
    'about.mission.title': 'Nuestra Misión',
    'about.mission.item1': 'Proporcionar reseñas completas de equipos de tenis de mesa',
    'about.mission.item2': 'Crear una comunidad de entusiastas apasionados del tenis de mesa',
    'about.mission.item3': 'Compartir consejos expertos de mantenimiento y uso de raquetas',
    'about.mission.item4': 'Preservar la artesanía tradicional del tenis de mesa',
    'about.features.title': 'Características',
    'about.features.reviews.title': 'Reseñas Detalladas',
    'about.features.reviews.description': 'Análisis profundo de materiales de madera, gomas y rendimiento general de las raquetas',
    'about.features.community.title': 'Impulsado por la Comunidad',
    'about.features.community.description': 'Comparte tus experiencias y aprende de otros entusiastas del tenis de mesa',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 
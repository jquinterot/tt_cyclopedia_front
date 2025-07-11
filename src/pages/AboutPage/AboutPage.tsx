import AboutTitle from "./components/AboutTitle/AboutTitle";
import AboutDescription from "./components/AboutDescription/AboutDescription";
import MissionSection from "./components/MissionSection/MissionSection";
import FeaturesSection from "./components/FeaturesSection/FeaturesSection";
import SEOHead from '@/components/SEO/SEOHead';
import { generateOrganizationSchema, generateFAQSchema } from '@/types/StructuredData';

function AboutPage() {
  const organizationData = generateOrganizationSchema({
    name: 'TT Cyclopedia',
    url: 'https://ttcyclopedia.space',
    description: 'TT Cyclopedia is your comprehensive table tennis knowledge base, providing equipment reviews, training tips, and community discussions.',
    logo: 'https://ttcyclopedia.space/favicon.png'
  });

  const faqData = generateFAQSchema({
    questions: [
    {
      question: 'What is TT Cyclopedia?',
      answer: 'TT Cyclopedia is a comprehensive platform dedicated to table tennis knowledge, equipment reviews, player tips, and community discussions.'
    },
    {
      question: 'How can I contribute to TT Cyclopedia?',
      answer: 'You can contribute by creating posts, sharing equipment reviews, providing tips, and participating in community discussions.'
    },
    {
      question: 'Is TT Cyclopedia free to use?',
      answer: 'Yes, TT Cyclopedia is completely free to use and join our community.'
    }
  ]
  });

  return (
    <>
      <SEOHead
        title="About TT Cyclopedia - Table Tennis Knowledge Base"
        description="Learn about TT Cyclopedia, your comprehensive table tennis knowledge base. Discover our mission, features, and how we help the table tennis community."
        keywords="about TT Cyclopedia, table tennis community, equipment reviews, training tips, table tennis knowledge base"
        canonical="/about"
        ogTitle="About TT Cyclopedia - Table Tennis Knowledge Base"
        ogDescription="Learn about TT Cyclopedia, your comprehensive table tennis knowledge base. Discover our mission, features, and how we help the table tennis community."
        ogUrl="/about"
        ogType="website"
        structuredData={[organizationData, faqData]}
      />
      <div className="min-h-screen flex flex-col font-sans text-white" data-testid="about-page">
        <main className="flex-grow flex justify-center px-4 py-8">
          <div className="max-w-4xl w-full space-y-12">
            <AboutTitle />
            <AboutDescription />
            <MissionSection />
            <FeaturesSection />
          </div>
        </main>
      </div>
    </>
  );
}

export default AboutPage; 
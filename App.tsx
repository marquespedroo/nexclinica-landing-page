import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import AIConversationalSection from './components/AIConversationalSection';
import TargetAudienceSection from './components/TargetAudienceSection';
import DifferentiatorSection from './components/DifferentiatorSection';
import ComparisonSection from './components/ComparisonSection';
import ImpactSection from './components/ImpactSection';
import FAQSection from './components/FAQSection';
import FinalCTASection from './components/FinalCTASection';

const App: React.FC = () => {
  return (
    <div className="w-full bg-black text-white overflow-x-hidden">
      <Header />
      <main>
        {/* Hero Section - Auto height on mobile (content + particles), full viewport on desktop */}
        <section className="min-h-screen md:h-screen">
          <Hero />
        </section>

        {/* Problem Section - Generate identification */}
        <ProblemSection />

        {/* Solution Section - Product presentation */}
        <SolutionSection />

        {/* AI Conversational Section - Main differentiator */}
        <AIConversationalSection />

        {/* Target Audience Section */}
        <TargetAudienceSection />

        {/* Differentiator Section */}
        <DifferentiatorSection />

        {/* Comparison Section */}
        <ComparisonSection />

        {/* Impact Section */}
        <ImpactSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Final CTA Section */}
        <FinalCTASection />
      </main>
    </div>
  );
};

export default App;

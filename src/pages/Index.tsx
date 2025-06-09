
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TeamSection from '@/components/TeamSection';
import TokenomicsSection from '@/components/TokenomicsSection';
import RoadmapSection from '@/components/RoadmapSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-solar-navy">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TeamSection />
      <TokenomicsSection />
      <RoadmapSection />
      <FAQSection />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;

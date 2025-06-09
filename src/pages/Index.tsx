
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TeamSection from '@/components/TeamSection';
import TokenomicsSection from '@/components/TokenomicsSection';
import RoadmapSection from '@/components/RoadmapSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-antix-navy">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TeamSection />
      <TokenomicsSection />
      <RoadmapSection />
      <Footer />
    </div>
  );
};

export default Index;

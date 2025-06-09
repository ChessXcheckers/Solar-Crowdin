
import CountdownTimer from './CountdownTimer';
import PresaleCard from './PresaleCard';

const HeroSection = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center pt-20">
      {/* Cosmic Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Cosmic Starburst Background"
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-solar-navy/80 via-solar-navy/70 to-solar-orange/20"></div>
        
        {/* Animated starburst elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-solar-gold rounded-full animate-starburst opacity-60"></div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-solar-orange rounded-full animate-pulse opacity-80"></div>
        <div className="absolute bottom-1/4 left-2/3 w-2 h-2 bg-solar-gold rounded-full animate-starburst opacity-70"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          <span className="text-solar-warm-white">Solar energy is here.</span>{' '}
          <span className="nebulae-text">Are you ready?</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-solar-grey mb-8 animate-fade-in">
          Harness the power of AI-driven solar solutions. Earn ☀️☀️☀️
        </p>

        <CountdownTimer />

        <div className="mt-12 animate-fade-in">
          <PresaleCard />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-solar-gold rounded-full flex justify-center">
            <div className="w-1 h-3 bg-solar-gold rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

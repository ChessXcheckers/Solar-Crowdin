
import CountdownTimer from './CountdownTimer';
import PresaleCard from './PresaleCard';

const HeroSection = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center pt-20">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Digital Avatar Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-antix-navy/70"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Digital humans are here.{' '}
          <span className="gradient-text">Are you in?</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-antix-grey mb-8 animate-fade-in">
          Bring hyper-realistic digital humans to life. Earn $$$
        </p>

        <CountdownTimer />

        <div className="mt-12">
          <PresaleCard />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

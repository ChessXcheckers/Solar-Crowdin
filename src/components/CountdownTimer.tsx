
import { usePresale } from '@/hooks/usePresale';

const CountdownTimer = () => {
  const { presaleInfo } = usePresale();
  const timeLeft = presaleInfo?.timeLeft || { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <div className="flex justify-center space-x-4 md:space-x-8 mb-8">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-white/10 dark:bg-solar-dark rounded-lg p-4 shadow-lg">
            <div className="text-2xl md:text-4xl font-bold nebulae-text cosmic-glow">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-800 dark:text-solar-grey uppercase tracking-wider mt-2">
              {unit}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;

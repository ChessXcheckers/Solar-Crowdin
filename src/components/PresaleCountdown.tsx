
interface PresaleCountdownProps {
  timeLeft?: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const PresaleCountdown = ({ timeLeft }: PresaleCountdownProps) => {
  if (!timeLeft) return null;

  return (
    <div className="mt-6 flex justify-center space-x-4 bg-gray-50/80 rounded-lg p-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-600">{timeLeft.days}</div>
        <div className="text-sm text-gray-800 dark:text-solar-grey font-medium">Days</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-600">{timeLeft.hours}</div>
        <div className="text-sm text-gray-800 dark:text-solar-grey font-medium">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-600">{timeLeft.minutes}</div>
        <div className="text-sm text-gray-800 dark:text-solar-grey font-medium">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-600">{timeLeft.seconds}</div>
        <div className="text-sm text-gray-800 dark:text-solar-grey font-medium">Seconds</div>
      </div>
    </div>
  );
};

export default PresaleCountdown;

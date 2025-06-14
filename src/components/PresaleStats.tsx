
import { Progress } from './ui/progress';

interface PresaleStatsProps {
  presaleData: {
    price: string;
    nextPrice: string;
    priceIncrease: string;
    progress: number;
    totalSold: string;
    totalRaised: string;
  };
}

const PresaleStats = ({ presaleData }: PresaleStatsProps) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 drop-shadow-sm">Solar Crowding AI Presale</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="text-center bg-gray-50/80 rounded-lg p-3">
          <p className="text-sm text-gray-600 font-medium">Current Price</p>
          <p className="text-xl font-bold text-orange-600">${presaleData.price}</p>
        </div>
        <div className="text-center bg-gray-50/80 rounded-lg p-3">
          <p className="text-sm text-gray-600 font-medium">Next Price</p>
          <p className="text-xl font-bold text-orange-600">${presaleData.nextPrice}</p>
        </div>
        <div className="text-center bg-gray-50/80 rounded-lg p-3">
          <p className="text-sm text-gray-600 font-medium">Price Increase</p>
          <p className="text-xl font-bold text-red-600">{presaleData.priceIncrease}</p>
        </div>
        <div className="text-center bg-gray-50/80 rounded-lg p-3">
          <p className="text-sm text-gray-600 font-medium">Progress</p>
          <p className="text-xl font-bold text-blue-600">{presaleData.progress.toFixed(1)}%</p>
        </div>
      </div>
      
      <div className="mt-6">
        <Progress value={presaleData.progress} className="h-3" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="text-center bg-gray-50/80 rounded-lg p-4">
          <p className="text-sm text-gray-600 font-medium">Tokens Sold</p>
          <p className="text-2xl font-bold text-gray-800">
            {(parseInt(presaleData.totalSold) / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="text-center bg-gray-50/80 rounded-lg p-4">
          <p className="text-sm text-gray-600 font-medium">USDT Raised</p>
          <p className="text-2xl font-bold text-gray-800">
            ${(parseInt(presaleData.totalRaised) / 1000000).toFixed(2)}M
          </p>
        </div>
      </div>
    </div>
  );
};

export default PresaleStats;

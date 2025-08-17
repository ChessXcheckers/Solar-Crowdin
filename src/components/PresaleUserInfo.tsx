
interface PresaleUserInfoProps {
  address?: string;
  userBalance?: {
    bnb: string;
    usdt: string;
    usdc: string;
    tokens: string;
  };
}

const PresaleUserInfo = ({ address, userBalance }: PresaleUserInfoProps) => {
  if (!address || !userBalance) return null;

  return (
    <div className="mt-4 p-3 bg-blue-50/90 backdrop-blur-sm rounded-lg border">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Your Balances:</h4>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="font-medium">MATIC: {userBalance.matic}</div>
        <div className="font-medium">USDT: {userBalance.usdt}</div>
        <div className="font-medium">USDC: {userBalance.usdc}</div>
        <div className="font-medium">SLC: {userBalance.tokens}</div>
      </div>
    </div>
  );
};

export default PresaleUserInfo;

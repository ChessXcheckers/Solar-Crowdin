
const UserBalance = () => {
  const userBalance = 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <h3 className="text-2xl font-bold mb-6">Your Balance</h3>
      
      <div className="flex items-center justify-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-2xl">☀</span>
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-800">{userBalance.toLocaleString()}</p>
          <p className="text-gray-600">SCT</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        Your Solar Crowding Tokens will appear here after purchase
      </p>
    </div>
  );
};

export default UserBalance;

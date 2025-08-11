const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4 border border-gray-700">
    <div className="bg-indigo-600 p-3 rounded-full">
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default StatCard;
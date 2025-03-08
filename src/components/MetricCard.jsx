const MetricCard = ({ title, value, icon: Icon, change, changeType }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-semibold mt-1 text-forth">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      {change && (
        <div className="mt-3 flex items-center">
          <span
            className={`text-sm font-medium ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}
          >
            {changeType === 'increase' ? '↑' : '↓'} {change}
          </span>
          <span className="text-sm text-gray-400 ml-1">vs last period</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;

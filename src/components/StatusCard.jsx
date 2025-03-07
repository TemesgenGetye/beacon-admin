const StatusCard = ({ title, status, description }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="mt-2">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}
        >
          {status}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  )
}

export default StatusCard


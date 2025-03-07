import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const CustomBarChart = ({ data, title, dataKeys }) => {
  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"]

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "0.375rem",
              }}
            />
            <Legend />
            {dataKeys.map((key, index) => (
              <Bar
                key={key.id}
                dataKey={key.id}
                name={key.name}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CustomBarChart


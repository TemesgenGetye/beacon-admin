import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const CustomLineChart = ({ data, title, dataKeys }) => {
  const colors = ['#4cd7f6', '#150068', '#FE8360', '#04284b'];

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="text-lg font-medium text-forth mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#bdc0c4" />
            <YAxis stroke="#b0b1b3" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
              }}
            />
            <Legend />
            {dataKeys.map((key, index) => (
              <Line
                key={key.id}
                type="monotone"
                dataKey={key.id}
                name={key.name}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomLineChart;

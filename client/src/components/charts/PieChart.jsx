import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#ffc93c", "#7dd87d", "#fa7a7a"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComponent = ({ stats }) => {
  const data = [
    { name: "Pending", value: stats.pending },
    { name: "Interview", value: stats.interview },
    { name: "Declined", value: stats.declined },
  ];

  return (
    <div style={{ width: "100%", height: 300 }} className="pie-chart">
      <ResponsiveContainer>
        <PieChart>
          <Legend
            width={125}
            wrapperStyle={{
              bottom: 0,
              border: "none",
              borderRadius: 3,
              lineHeight: "30px",
            }}
          />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <Tooltip />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default PieChartComponent;

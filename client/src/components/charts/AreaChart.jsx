import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Legend
          width={100}
          wrapperStyle={{
            top: 0,
            right: -20,
            backgroundColor: "transparent",
            border: "none",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
        <Tooltip
          wrapperStyle={{
            width: 100,
            color: "black",
          }}
        />
        <Area type="monotone" dataKey="count" stroke="#2cb1bc" fill="#bef8fd" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartComponent;

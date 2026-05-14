import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard({ data }) {

  console.log(data);

  const chartData = data?.summary || [];

  if (chartData.length === 0) {
    return (
      <div className="mt-8">
        No profiling data available
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-8">

      {/* DATA PROFILE TABLE */}
      <div className="border rounded-xl p-4">
        <h2 className="text-2xl font-bold mb-4">
          Data Profiling
        </h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Column</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Null Count</th>
            </tr>
          </thead>

          <tbody>
            {chartData.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border">{item.column}</td>
                <td className="p-2 border">{item.dtype}</td>
                <td className="p-2 border">{item.null_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="border p-4 rounded-xl h-96">
          <h2 className="text-xl font-semibold mb-4">
            Null Values by Column
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="column" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="null_count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="border p-4 rounded-xl h-96">
          <h2 className="text-xl font-semibold mb-4">
            Column Types
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="null_count"
                nameKey="column"
                outerRadius={120}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

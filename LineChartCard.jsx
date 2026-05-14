import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function LineChartCard({ title, data, xKey, yKey }) {
    return (
        <div style={cardStyle}>

            <h3 style={cardTitle}>
                {title}
            </h3>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey={yKey} stroke="#6366f1" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}

const cardStyle = {
    background: "#1e293b",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #334155"
};

const cardTitle = {
    marginBottom: "15px",
    fontSize: "18px",
    fontWeight: "600",
    color: "white"
};
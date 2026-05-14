import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function BarChartCard({ title, data }) {
    return (
        <div style={cardStyle}>
            <h3 style={cardTitle}>
                {title}
            </h3>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" />
                </BarChart>
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
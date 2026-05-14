import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

export default function Charts({ charts }) {
    if (!charts || charts.length === 0) return null;

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            marginTop: "30px"
        }}>

            {charts.map((chart, idx) => {

                // ❌ SKIP INVALID CHARTS (IMPORTANT FIX)
                if (!chart?.data || chart.data.length === 0) return null;

                return (
                    <div key={idx} style={{
                        background: "#1e293b",
                        padding: "20px",
                        borderRadius: "12px",
                        width: "90%",
                        maxWidth: "700px"
                    }}>

                        <h3 style={{ color: "white", marginBottom: "10px" }}>
                            {chart.title}
                        </h3>

                        <ResponsiveContainer width="100%" height={300}>

                            {chart.type === "bar" ? (
                                <BarChart data={chart.data}>
                                    <XAxis dataKey="name" stroke="#fff" />
                                    <YAxis stroke="#fff" />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#6366f1" />
                                </BarChart>
                            ) : (
                                <PieChart>
                                    <Pie
                                        data={chart.data}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={100}
                                        label
                                    >
                                        {chart.data.map((_, i) => (
                                            <Cell
                                                key={i}
                                                fill={COLORS[i % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            )}

                        </ResponsiveContainer>
                    </div>
                );
            })}
        </div>
    );
}
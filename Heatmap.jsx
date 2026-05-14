export default function Heatmap({ data }) {
    if (!data || !data.matrix || data.matrix.length === 0) return null;
if (!data?.matrix || !data?.columns) return null;
    const cols = data.columns;

    const getColor = (value) => {
        // red → white → green scale
        if (value > 0.5) return "#16a34a";
        if (value > 0.2) return "#4ade80";
        if (value > -0.2) return "#334155";
        if (value > -0.5) return "#f87171";
        return "#dc2626";
    };

    return (
        <div style={wrapper}>
            <h2 style={title}>📊 Correlation Heatmap</h2>

            <div style={grid}>
                {data.matrix.map((row, i) =>
                    row.map((val, j) => (
                        <div
                            key={`${i}-${j}`}
                            style={{
                                ...cell,
                                backgroundColor: getColor(val),
                            }}
                        >
                            <div style={text}>
                                {val.toFixed(2)}
                            </div>
                            <div style={label}>
                                {cols[i]} ↔ {cols[j]}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

const wrapper = {
    marginTop: "20px",
    padding: "20px",
    background: "rgba(15,23,42,0.6)",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
};

const title = {
    color: "#cbd5e1",
    textAlign: "center",
    marginBottom: "16px",
};

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
    gap: "6px",
};

const cell = {
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    color: "white",
    fontSize: "12px",
};

const text = {
    fontWeight: "bold",
};

const label = {
    fontSize: "9px",
    opacity: 0.8,
};


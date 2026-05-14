import { useState } from "react";
import { uploadCSV, getProfile, getCorrelation } from "./services/api";
import Charts from "./components/Charts";
import Heatmap from "./components/Heatmap";
import { buildCharts } from "./utils/chartUtils";
import jsPDF from "jspdf";

export default function App() {
    const [file, setFile] = useState(null);
    const [profile, setProfile] = useState(null);
    const [charts, setCharts] = useState([]);
    const [aiSummary, setAiSummary] = useState([]);
    const [correlation, setCorrelation] = useState(null);

    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);

    const [question, setQuestion] = useState("");
    const [chat, setChat] = useState([]);

    // -------------------------
    // UPLOAD + ANALYZE
    // -------------------------
    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);

        try {
            await uploadCSV(file);

            const res = await getProfile();
            const data = res.data;

            setProfile(data);
            setCharts(buildCharts(data));

            const corrRes = await getCorrelation();
            setCorrelation(corrRes.data || { columns: [], matrix: [] });

        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }

        setLoading(false);
    };

    // -------------------------
    // AI SUMMARY BUTTON (FIXED)
    // -------------------------
    const loadAISummary = async () => {
        setAiLoading(true);

        try {
            const res = await fetch("http://127.0.0.1:8000/ai-summary");
            const data = await res.json();
            setAiSummary(data.insights || []);
        } catch (err) {
            console.error(err);
        }

        setAiLoading(false);
    };

    // -------------------------
    // AI CHAT (FIXED)
    // -------------------------
    const askAI = async () => {
        if (!question.trim()) return;

        const q = question;
        setQuestion("");

        try {
            const res = await fetch("http://127.0.0.1:8000/ai-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: q })
            });

            const data = await res.json();

            setChat(prev => [...prev, { q, a: data.answer }]);

        } catch (err) {
            console.error(err);
        }
    };

    // -------------------------
    // PDF EXPORT (FIXED)
    // -------------------------
    const downloadPDF = () => {
        const doc = new jsPDF();

        let y = 10;

        doc.setFontSize(16);
        doc.text("DataLens Pro Report", 10, y);
        y += 10;

        doc.setFontSize(12);

        // PROFILE
        if (profile) {
            doc.text(`Rows: ${profile.rows}`, 10, y);
            y += 10;
        }

        // AI SUMMARY
        if (aiSummary.length) {
            doc.text("AI INSIGHTS:", 10, y);
            y += 10;

            aiSummary.forEach(line => {
                doc.text(`- ${line}`, 10, y);
                y += 8;
            });
        }

        doc.save("datalens-report.pdf");
    };

    return (
        <div style={pageWrapper}>
            <div style={{ width: "100%", maxWidth: "1200px" }}>

                <h1 style={title}>📊 DataLens Pro Dashboard</h1>

                {/* UPLOAD */}
                <div style={uploadBox}>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />

                    <button onClick={handleUpload} style={blueBtn}>
                        Upload & Analyze
                    </button>

                    <button onClick={loadAISummary} style={greenBtn}>
                        {aiLoading ? "Loading AI..." : "Generate AI Summary"}
                    </button>

                    <button onClick={downloadPDF} style={pdfBtn}>
                        Download PDF Report
                    </button>

                    {loading && <p style={loadingText}>Processing...</p>}
                </div>

                {/* PROFILE */}
                {profile && (
                    <div style={panel}>
                        <h2 style={sectionTitle}>Dataset Profile</h2>
                        <p>Total Rows: {profile.rows}</p>

                        <div style={grid}>
                            {Object.entries(profile.summary || {}).map(([key, val]) => (
                                <div key={key} style={card}>
                                    <h3>{key}</h3>
                                    <p>{val.type}</p>

                                    {val.type === "numeric" ? (
                                        <>
                                            <p>Mean: {val.mean}</p>
                                            <p>Min: {val.min}</p>
                                            <p>Max: {val.max}</p>
                                        </>
                                    ) : (
                                        <p>Unique: {val.unique}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* AI SUMMARY */}
                {aiSummary.length > 0 && (
                    <div style={panel}>
                        <h2 style={sectionTitle}>🧠 AI Insights</h2>
                        {aiSummary.map((item, i) => (
                            <p key={i}>• {item}</p>
                        ))}
                    </div>
                )}

                {/* CHARTS */}
                {charts.length > 0 && (
                    <div style={panel}>
                        <h2 style={sectionTitle}>Charts</h2>
                        <Charts charts={charts} />
                    </div>
                )}

                {/* HEATMAP (FIXED LOGIC) */}
                {correlation?.matrix?.length > 0 && correlation?.columns?.length > 0 && (
                    <div style={panel}>
                        <h2 style={sectionTitle}>🔥 Correlation Heatmap</h2>
                        <Heatmap data={correlation} />
                    </div>
                )}

                {/* CHAT */}
                <div style={panel}>
                    <h2 style={sectionTitle}>💬 AI Chat</h2>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <input
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ask your dataset..."
                            style={inputStyle}
                        />

                        <button onClick={askAI} style={blueBtn}>
                            Ask
                        </button>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        {chat.map((c, i) => (
                            <div key={i} style={chatBubble}>
                                <p style={{ color: "#60a5fa" }}><b>You:</b> {c.q}</p>
                                <p style={{ color: "#22c55e" }}><b>AI:</b> {c.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

/* =========================
   STYLES (CLEANED)
========================= */

const pageWrapper = {
    minHeight: "100vh",
    background: "#0b1220",
    color: "#e5e7eb",
    padding: "30px",
    display: "flex",
    justifyContent: "center"
};

const title = { fontSize: "28px", textAlign: "center", marginBottom: 20 };

const panel = {
    background: "#111827",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px"
};

const uploadBox = {
    textAlign: "center",
    padding: "20px",
    background: "#0f172a",
    borderRadius: "12px"
};

const blueBtn = {
    margin: "10px",
    padding: "10px 14px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px"
};

const greenBtn = {
    margin: "10px",
    padding: "10px 14px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px"
};

const pdfBtn = {
    margin: "10px",
    padding: "10px 14px",
    background: "#f59e0b",
    color: "black",
    border: "none",
    borderRadius: "8px"
};

const inputStyle = {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    background: "#0f172a",
    color: "white",
    border: "1px solid #334155"
};

const sectionTitle = { fontSize: "18px", marginBottom: 10 };

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px"
};

const card = {
    background: "#0b1220",
    padding: "12px",
    borderRadius: "10px"
};

const chatBubble = {
    marginTop: 10,
    padding: 12,
    background: "#0b1220",
    borderRadius: 10
};

const loadingText = { color: "#fbbf24", marginTop: 10 };

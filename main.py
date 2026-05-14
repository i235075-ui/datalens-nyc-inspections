from fastapi import FastAPI, UploadFile, File, Body
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import os
import json
import requests

# -------------------------
# APP INIT
# -------------------------
app = FastAPI(title="DataLens Pro API", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# CONFIG
# -------------------------
DATA_PATH = "data"
os.makedirs(DATA_PATH, exist_ok=True)

CURRENT_FILE = None

# ✅ FIXED GROQ SETUP (LATEST MODEL)
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = "llama-3.3-70b-versatile"


# -------------------------
# SAFE GROQ CALL (ROBUST)
# -------------------------
def call_groq(prompt: str):
    if not GROQ_API_KEY:
        return "ERROR: GROQ_API_KEY not set in environment variables"

    try:
        response = requests.post(
            GROQ_URL,
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": MODEL,
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a world-class data analyst. Be precise, structured, and factual."
                    },
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.3
            },
            timeout=30
        )

        data = response.json()

        return data["choices"][0]["message"]["content"]

    except Exception as e:
        return f"AI_ERROR: {str(e)}"


# -------------------------
# UPLOAD CSV
# -------------------------
@app.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    global CURRENT_FILE

    file_path = os.path.join(DATA_PATH, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    CURRENT_FILE = file_path

    return {"message": "uploaded", "filename": file.filename}


# -------------------------
# SUPER PROFILE (UPGRADED UX DATA)
# -------------------------
@app.get("/profile")
def profile():
    if not CURRENT_FILE:
        return {"error": "No file uploaded"}

    df = pd.read_csv(CURRENT_FILE)

    summary = {}

    for col in df.columns:
        if pd.api.types.is_numeric_dtype(df[col]):
            summary[col] = {
                "type": "numeric",
                "mean": float(df[col].mean()),
                "median": float(df[col].median()),
                "std": float(df[col].std()),
                "min": float(df[col].min()),
                "max": float(df[col].max()),
                "missing": int(df[col].isna().sum())
            }
        else:
            vc = df[col].value_counts().head(10)
            summary[col] = {
                "type": "categorical",
                "unique": int(df[col].nunique()),
                "missing": int(df[col].isna().sum()),
                "topValues": [
                    {"name": str(k), "count": int(v)}
                    for k, v in vc.items()
                ]
            }

    return {
        "rows": len(df),
        "columns": list(df.columns),
        "missing_total": int(df.isna().sum().sum()),
        "memory_mb": round(df.memory_usage(deep=True).sum() / 1024**2, 2),
        "summary": summary
    }


# -------------------------
# CORRELATION (HEATMAP + LINE SUPPORT DATA)
# -------------------------
@app.get("/correlation")
def correlation():
    if not CURRENT_FILE:
        return {"columns": [], "matrix": [], "trend": []}

    df = pd.read_csv(CURRENT_FILE)
    numeric_df = df.select_dtypes(include=[np.number])

    if numeric_df.shape[1] < 2:
        return {"columns": [], "matrix": [], "trend": []}

    corr = numeric_df.corr().round(2)

    # Extra: trend (for line chart usefulness)
    trend = []
    for col in numeric_df.columns[:3]:
        trend.append({
            "name": col,
            "values": numeric_df[col].dropna().head(20).tolist()
        })

    return {
        "columns": list(corr.columns),
        "matrix": corr.fillna(0).values.tolist(),
        "trend": trend
    }


# -------------------------
# AI SUMMARY (FIXED + STRUCTURED)
# -------------------------
@app.get("/ai-summary")
def ai_summary():
    if not CURRENT_FILE:
        return {"insights": ["No dataset uploaded."]}

    df = pd.read_csv(CURRENT_FILE)

    prompt = f"""
Analyze this dataset and return 5 strong business insights.

Rows: {len(df)}
Columns: {list(df.columns)}

Sample:
{df.head(8).to_string(index=False)}

Rules:
- Be specific
- Mention patterns, anomalies, trends
- Avoid generic statements
"""

    text = call_groq(prompt)

    if "ERROR" in text:
        return {"insights": [text]}

    insights = [
        line.strip("-• ").strip()
        for line in text.split("\n")
        if line.strip()
    ]

    return {"insights": insights[:5]}


# -------------------------
# AI CHAT (STABLE)
# -------------------------
@app.post("/ai-chat")
def ai_chat(payload: dict = Body(...)):
    if not CURRENT_FILE:
        return {"answer": "Upload dataset first"}

    question = payload.get("question", "")
    df = pd.read_csv(CURRENT_FILE)

    prompt = f"""
Dataset:
Columns: {list(df.columns)}
Rows: {len(df)}

Question:
{question}

Answer clearly using only dataset context.
"""

    return {"answer": call_groq(prompt)}


# -------------------------
# 🔥 FIXED MULTI-CHART GENERATOR (BAR + PIE + LINE)
# -------------------------
@app.post("/generate-viz")
def generate_viz(payload: dict = Body(...)):
    if not CURRENT_FILE:
        return {"error": "No dataset loaded"}

    df = pd.read_csv(CURRENT_FILE)
    question = payload.get("question", "")

    prompt = f"""
You are a senior data visualization expert.

Dataset columns:
{list(df.columns)}

User request:
{question}

Return ONLY valid JSON:

{{
  "charts": [
    {{
      "type": "bar",
      "title": "example",
      "data": [{{"name": "A", "value": 10}}]
    }},
    {{
      "type": "pie",
      "title": "example",
      "data": [{{"name": "A", "value": 10}}]
    }},
    {{
      "type": "line",
      "title": "trend",
      "data": [{{"name": "A", "value": 10}}]
    }}
  ]
}}
"""

    text = call_groq(prompt)

    try:
        start = text.find("{")
        end = text.rfind("}") + 1
        return json.loads(text[start:end])
    except:
        return {
            "charts": [],
            "error": "Failed to generate charts",
            "raw": text
        }


# -------------------------
# HEALTH CHECK
# -------------------------
@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "DataLens Pro API Running",
        "ai": "groq-llama3.3-enabled",
        "features": [
            "multi-chart generation",
            "AI insights",
            "correlation engine",
            "dataset profiling"
        ]
    
}
    
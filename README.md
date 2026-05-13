# DataLens — Team Hashir & Haider

> AI-powered data analytics dashboard that transforms CSV datasets into interactive insights, visualizations, and AI-generated analysis.

---

## Team

- **Member 1:** Hashir Azhar  
- **Member 2:** Haider Abid  
- **Assigned Dataset:** Dataset 16 — NYC Restaurant Inspection Results  

---

## Project Purpose

DataLens is an AI-powered data analytics platform that allows users to upload CSV datasets and instantly generate meaningful insights, visual summaries, and interactive visualizations.

It is designed for students, analysts, and non-technical users who want to quickly understand complex datasets without writing code. The system automatically profiles data, generates charts, computes correlations, and provides AI-driven explanations using a Groq LLM backend.

---

## Prerequisites

Before running this project, install:

- Python 3.11+ → https://www.python.org/downloads/
- Node.js 18+ → https://nodejs.org/
- uv (Python package manager):
```bash
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
- **Git** — [https://git-scm.com/](https://git-scm.com/)

## LLM API Key Setup

This application uses an LLM for the chat interface and executive summary features. You need an API key from at least one of the following providers:

GROQ_API_KEY=your_groq_api_key_here

## Setup Instructions

### 1. Clone the repository

```bash
git clone [your-repo-url]
cd [repo-name]
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` in a text editor and fill in:
- `LLM_PROVIDER` — set to one of: `gemini`, `anthropic`, `openai`, `groq`
- The corresponding API key variable for your chosen provider

### 3. Install dependencies and start the application

[TODO — Document the single command that starts both the backend and frontend. Example:

```bash
./start.sh
```

or

```bash
npm run dev
```

The command must install all dependencies (Python via uv, Node via npm) and start both the backend (port 8000) and frontend (port 5173). Document the command here, and include the actual script or configuration in your repo.]

### 4. Open the application

Once started, visit [http://localhost:5173](http://localhost:5173) in your browser.

## Usage
1. Upload a CSV dataset using the upload button
2. Wait for automatic profiling and analysis
3. View dataset statistics and summaries
4. Explore visualizations (charts, heatmaps)
5. Ask questions using the AI chat panel
6. Read AI-generated insights from your dataset

### Features
CSV dataset upload
AI-generated business insights
Interactive dashboard
Bar charts
Pie charts
Line graphs
Correlation heatmaps
Dataset profiling
AI-powered chat assistant
PDF report generation
FastAPI backend
React frontend

## Running Tests

### Backend tests

```bash
cd backend
uv run pytest
```

### Frontend tests

```bash
cd frontend
npm test
```

## Troubleshooting
Problem: Backend not starting (port 8000)

Fix:
netstat -ano | findstr :8000
taskkill /PID <pid> /F

Problem: Frontend not loading (5173)

Fix: 
rm -rf node_modules
npm install
npm run dev

Problem: AI not responding

Fix:
Ensure GROQ_API_KEY is set correctly
Restart backend after setting environment variable
Check Groq dashboard for quota limits


## Project Structure

```
.
├── backend/
│   ├── app/
│   │   └── main.py
│   └── tests/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.jsx
│   └── tests/
│
├── docs/
│   ├── adrs/
│   └── report.md
│
├── tasks/
│   ├── plan.md
│   └── todo.md
│
├── README.md
├── .env.example
├── pyproject.toml
└── package.json
```

## Contribution Summary

Hashir Azhar:
Backend development
FastAPI API development
AI integration using Groq
Data profiling system
Visualization API endpoints
Correlation analysis
PDF export functionality

Haider Abid:
Frontend UI design
React dashboard development
Chart integration
Dashboard styling and UX improvements
Frontend state management
AI chat interface

## Acknowledgments

This project was developed as part of the Spring 2026 Strategic Generative AI for Business course. We used [Antigravity / Claude Code / Codex / Cursor] as our coding agent, guided by the Agent Skills framework authored by Addy Osmani (MIT licensed, available at [https://github.com/addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)).

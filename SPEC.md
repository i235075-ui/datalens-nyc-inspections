# Project Specification: DataLens (NYC Restaurant Edition)

## 1. Objective
Build a web-based data analytics dashboard that allows users to upload the NYC Restaurant Inspection dataset (CSV), store it in a SQLite database, and provide visual insights and an AI-powered chat interface for data querying.

## 2. Core Requirements & Success Criteria
- **Data Ingestion:** Successfully parse the 400k+ records from the NYC Inspection CSV.
- **Data Integrity:** - Handle "Score" correctly (Higher = Worse).
    - Filter out or label placeholder dates ("1900-01-01").
    - Aggregate rows by CAMIS (Restaurant ID) so one inspection doesn't look like multiple visits.
- **Visualizations:**
    - Borough-wise grade distribution (A, B, C).
    - Top 10 most common violations.
    - Cuisine type safety rankings.
- **AI Chat:** Users can ask questions like "Which borough has the cleanest pizza places?" and get an answer based on the SQL data.

## 3. Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Lucide Icons, Recharts (for graphs).
- **Backend:** FastAPI (Python).
- **Database:** SQLite (local file-based).
- **AI:** OpenAI API or Gemini API for the chat component.

## 4. Project Structure
- `/backend`: FastAPI logic, database schemas, and CSV processing scripts.
- `/frontend`: React components and dashboard layout.
- `/data`: Storage for the raw and processed CSV/DB files.
- `.agent/skills`: Mandatory skill modules.

## 5. Boundaries & Constraints
- **Read-Only:** The app will not allow editing or deleting restaurant records.
- **Local First:** The app is designed to run locally, not deployed to the cloud (for MVP).
- **Security:** No authentication required for this phase.
# Project Plan: DataLens

## Phase 1: Foundation (Thin Slice 1)
- [ ] Setup FastAPI backend structure.
- [ ] Implement CSV to SQLite ingestion script.
- [ ] Create basic API endpoint to fetch first 10 rows of NYC data.
- [ ] Verify data integrity (handle 'Score' logic and '1900' dates).

## Phase 2: Core Dashboard (Thin Slice 2)
- [ ] Setup React frontend with Vite and Tailwind.
- [ ] Create a "Summary Stats" component (Total Restaurants, Average Score).
- [ ] Build a "Borough Distribution" Bar Chart using Recharts.

## Phase 3: AI Chat & Intelligence
- [ ] Integrate OpenAI/Gemini API.
- [ ] Implement "Text-to-SQL" tool so the agent can query the SQLite DB.
- [ ] Add a chat sidebar to the React frontend.

## Phase 4: Final Polish
- [ ] Add filters for Cuisine type and Grade.
- [ ] Generate a final "Executive Summary" PDF/View.

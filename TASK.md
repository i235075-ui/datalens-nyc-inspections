# Task Tracking: Phase 1 (Foundation)

## [ ] Task 1: Project Environment Initialization
- **Description:** Create the basic folder structure for FastAPI and React.
- **Success Criteria:** `backend/` and `frontend/` folders exist with basic "Hello World" setups.

## [ ] Task 2: Data Ingestion Script
- **Description:** Create a Python script to read the NYC Restaurant CSV and load it into `nyc_inspections.db`.
- **Success Criteria:** Running the script creates a SQLite file with ~400k rows.

## [ ] Task 3: Basic API Endpoint
- **Description:** Create a FastAPI route `/restaurants` that returns the first 10 rows from the DB.
- **Success Criteria:** Opening `localhost:8000/restaurants` shows JSON data.

# ADR 001: Data Storage and Query Strategy for Large Inspection Datasets

## Status
Accepted

## Date
2024-05-22

---

## Context
The NYC Restaurant Inspection dataset contains approximately 400,000 records. We need a way to store this data so that:
1. The React dashboard can load charts quickly (Borough/Cuisine distributions).
2. The AI Chatbot can query the data to answer specific user questions.
3. The solution remains "local-first" as per the project requirements.

## Options Considered

### Option 1: In-Memory Pandas/JSON
Keep the entire CSV in memory using Pandas on the backend and send filtered JSON to the frontend.

**Pros:**
- Very fast for small datasets.
- Simple to implement without setting up a database.

**Cons:**
- 400k rows will consume significant RAM, potentially crashing the local server.
- The AI LLM cannot easily "query" a raw Python object without writing complex code.

### Option 2: SQLite Database (Relational)
Convert the CSV into a structured SQLite database file.

**Pros:**
- **Performance:** SQL indexes make filtering 400k rows nearly instant.
- **AI Integration:** LLMs are excellent at generating SQL queries (Text-to-SQL).
- **Persistence:** Data doesn't need to be re-parsed every time the server restarts.

**Cons:**
- Requires an initial "ingestion" step to move data from CSV to DB.
- Requires defining a schema (table structure).

### Option 3: DuckDB (OLAP Optimized)
Use DuckDB, an in-process analytical database.

**Pros:**
- Faster than SQLite for "group by" and "average" calculations (analytical queries).
- Can query CSV files directly without a full import.

**Cons:**
- Slightly more complex setup than SQLite.
- LLMs are less familiar with DuckDB syntax compared to standard SQLite.

## Decision
**We chose Option 2: SQLite.**

We chose SQLite because it strikes the best balance between performance and AI-compatibility. Since a core requirement is "Chat with Data," using SQLite allows us to give the AI agent a clear schema so it can generate SQL queries to answer user questions about NYC boroughs and violations.

## Trade-offs
- We sacrificed the pure speed of DuckDB for the better AI-compatibility and documentation of SQLite.
- We accept the "risk" of a slightly slower initial data upload phase while the CSV is being written to the database.

## Consequences
- The backend will need a `database.py` utility to handle connections.
- We will need a specific "Ingestion Script" to clean the data (handle 1900-01-01 dates) before saving it to the DB.
- The AI agent will be instructed to use SQL for data retrieval.

## References
- [Project Spec: Data Handling Requirements]
- [FastAPI + SQLAlchemy Documentation]
# ADR 003: LLM Integration Strategy for Data Interaction

## Status
Accepted

## Context
The project requires a "Generative AI" component that allows users to ask questions about the NYC inspection data in plain English.

## Decision
We will use the **Google Gemini API** via the `llm` skill pattern. We will use a "Text-to-SQL" approach where the AI generates a database query based on the user's question.

## Consequences
- **Pros:** Gemini has a generous free tier for students. Text-to-SQL ensures the AI doesn't "hallucinate" fake restaurant scores; it only reports what is actually in the SQLite database.
- **Cons:** Requires a stable internet connection and an API key stored in the `.env` file.
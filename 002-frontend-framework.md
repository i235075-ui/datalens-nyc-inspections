# ADR 002: Choice of Frontend Framework and Styling

## Status
Accepted

## Context
We need to build a dashboard that can display NYC restaurant data (charts, tables) and a chat interface. The UI needs to be responsive and easy to iterate on.

## Decision
We will use **React** with **Vite** for the frontend framework and **Tailwind CSS** for styling.

## Consequences
- **Pros:** React’s component-based architecture allows us to separate the "Chat" from the "Data Visuals." Tailwind allows for rapid UI prototyping without writing custom CSS files.
- **Cons:** Requires a build step (npm run dev), but Vite makes this extremely fast.
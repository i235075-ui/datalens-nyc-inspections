from fastapi import FastAPI
import sqlite3

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "DataLens API Running", "dataset": "NYC Restaurant Inspections"}

@app.get("/stats")
def get_stats():
    conn = sqlite3.connect("datalens.db")
    cursor = conn.cursor()
    # Basic query to show we can talk to the data
    cursor.execute("SELECT COUNT(*) FROM inspections")
    count = cursor.fetchone()[0]
    conn.close()
    return {"total_records": count}
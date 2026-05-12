import pandas as pd
import sqlite3
import os

def setup_db():
    # This finds the EXACT folder where THIS script is saved
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # This points to the data folder correctly
    csv_path = os.path.join(current_dir, "..", "data", "NYC_Inspection.csv")
    
    print(f"Looking for file at: {csv_path}")

    if not os.path.exists(csv_path):
        print("ERROR: Still can't find the file. Check if it's actually in the 'data' folder!")
        return

    print(" File found! Starting data ingestion...")
    
    # Load data
    df = pd.read_csv(csv_path, low_memory=False).head(1000)
    
    # Save to Database
    db_path = os.path.join(current_dir, "datalens.db")
    conn = sqlite3.connect(db_path)
    df.to_sql("inspections", conn, if_exists="replace")
    conn.close()
    
    print(f"🎉 Finished! Database created at: {db_path}")

if __name__ == "__main__":
    setup_db()

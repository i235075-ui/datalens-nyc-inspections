import pandas as pd
import os
from uuid import uuid4

UPLOAD_DIR = "app/data/uploads"


def save_csv(file):
    file_id = str(uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}.csv")

    with open(file_path, "wb") as f:
        f.write(file.file.read())

    return file_id, file_path


def load_csv(file_path):
    return pd.read_csv(file_path)

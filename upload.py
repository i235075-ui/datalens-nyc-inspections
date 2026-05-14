from fastapi import APIRouter, UploadFile, File
from app.services.csv_service import save_csv

router = APIRouter()


@router.post("/upload")
def upload_csv(file: UploadFile = File(...)):
    file_id, path = save_csv(file)

    return {
        "message": "File uploaded successfully",
        "file_id": file_id
    }
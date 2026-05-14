import { useState } from "react";
import API from "../services/api";

export default function UploadSection({ setData }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await API.post("/upload-csv", formData);

      setData(response.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-4 border rounded-xl">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
      >
        Upload CSV
      </button>
    </div>
  );
}
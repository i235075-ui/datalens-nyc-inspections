import { useState } from "react";
import UploadSection from "../components/UploadSection";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [data, setData] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        DataLens Dashboard
      </h1>

      <UploadSection setData={setData} />

      {data && <Dashboard data={data} />}
    </div>
  );
}
import axios from "axios";

const API = "http://127.0.0.1:8000";

export const uploadCSV = async (file) => {
    const form = new FormData();
    form.append("file", file);

    const res = await axios.post(`${API}/upload-csv`, form);
    return res.data;
};

export const getProfile = async () => {
    const res = await axios.get(`${API}/profile`);
    return res;
};

export const getCorrelation = async () => {
    return await axios.get(`${API}/correlation`);
};
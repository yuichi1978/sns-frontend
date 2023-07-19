import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `Bearer {token}`
  },
});

export default apiClient;
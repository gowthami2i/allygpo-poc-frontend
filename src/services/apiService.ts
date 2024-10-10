import axios from "axios";

const headers: Readonly<Record<string, string | boolean>> = {
  "Content-Type": "application/json",
};

export const apiService = axios.create({
  //  baseURL: import.meta.env.VITE_BASE_URL,
  headers,
});

apiService.interceptors.request.use((request) => {
  return request;
});

apiService.interceptors.response.use((response) => {
  return response;
});

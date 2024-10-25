import { IFormData } from "../types/request/uploadContract";
import { apiService } from "./apiService";

export const uploadDocument = (formData: IFormData) => {
  return apiService.post("/api/documents/upload", formData);
};

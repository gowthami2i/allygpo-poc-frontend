import { IFormData } from "../types/request/contractExplorer";
import { apiService } from "./apiService";

export const deleteData = (id: { document_id: string }) => {
  return apiService.delete(`/api/documents/delete`, {
    data: id,
  });
};

export const uploadDocument = (formData: IFormData) => {
  return apiService.post("/api/documents/upload", formData);
};

import { useMutation } from "@tanstack/react-query";
import { apiService } from "../../../services/apiService";

interface IFormData {
  file: string;
  description: string;
  contractType: string;
}
const uploadDocument = (formData: IFormData) => {
  return apiService.post("/api/documents/upload", formData);
};

export const useUploadDocument = () => {
  return useMutation({
    mutationFn: (formData: IFormData) => uploadDocument(formData),
  });
};

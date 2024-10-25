import { useMutation } from "@tanstack/react-query";
import { uploadDocument } from "../services/uploadContractService";
import { IFormData } from "../types/request/uploadContract";

export const useUploadDocument = () => {
  return useMutation({
    mutationFn: (formData: IFormData) => uploadDocument(formData),
  });
};

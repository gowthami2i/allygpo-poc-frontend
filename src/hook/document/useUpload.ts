import { useMutation } from "@tanstack/react-query";
import { uploadDocument } from "./../../services/contractExplorerService";
import { IFormData } from "../../types/request/contractExplorer";

export const useUploadDocument = () => {
  return useMutation({
    mutationFn: (formData: IFormData) => uploadDocument(formData),
  });
};

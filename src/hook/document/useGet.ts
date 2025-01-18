import { useMutation } from "@tanstack/react-query";
import { apiService } from "../../services/api/apiService";

const getChatDocument = (documentData: { file_names: string[] }) => {
  return apiService.post("/listDocuments", documentData);
}

export const useGetDocumentData = () => {
  return useMutation({
    mutationFn: (documentData: { file_names: string[] }) => getChatDocument(documentData),
  });
};

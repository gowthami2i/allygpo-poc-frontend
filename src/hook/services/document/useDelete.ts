import { useMutation } from "@tanstack/react-query";
import { apiService } from "../../../services/apiService";

const deleteData = (id: { document_id: string }) => {
  return apiService.delete(`/api/documents/delete`, {
    data: id,
  });
};

export const useDelete = () => {
  return useMutation({
    mutationFn: (id: { document_id: string }) => deleteData(id),
  });
};

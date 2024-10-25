import { apiService } from "./apiService";

export const deleteData = (id: { document_id: string }) => {
  return apiService.delete(`/api/documents/delete`, {
    data: id,
  });
};

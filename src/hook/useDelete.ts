import { useMutation } from "@tanstack/react-query";
import { deleteData } from "../services/contractExplorerService";

export const useDelete = () => {
  return useMutation({
    mutationFn: (id: { document_id: string }) => deleteData(id),
  });
};

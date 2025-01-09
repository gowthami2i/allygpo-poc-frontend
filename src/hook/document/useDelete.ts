import { useMutation } from "@tanstack/react-query";
import { deleteData } from "../../services/contractExplorerService";
import { IDeleteData } from "../../types/request/contractExplorer";

export const useDelete = () => {
  return useMutation({
    mutationFn: (fileData:IDeleteData) => deleteData(fileData),
  });
};

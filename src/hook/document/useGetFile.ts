import { useMutation } from "@tanstack/react-query";
import { getFileDetails } from "../../services/contractExplorerService";

export const useGetFile = () => {
  return useMutation({
    mutationFn: (fileName:{fileName:string}) => getFileDetails(fileName),
  });
};

import { useMutation } from "@tanstack/react-query";
import { checkFileName } from "../../services/contractExplorerService";

export const useCheckFileName = () => {
  return useMutation({
    mutationFn: async (fileName: any) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return checkFileName(fileName);
    },
  });
};


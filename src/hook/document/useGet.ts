import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "../global/useLocalStorage";

const getChatDocument = () => {
  const { getItem: getLocalStorage } = useLocalStorage();
  const localData = getLocalStorage("documents");
  return Promise.resolve({
    data: localData,
  });
};

export const useGetDocument = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: () => getChatDocument(),
  });
};

import { useQuery } from "@tanstack/react-query";
import { apiService } from "../services/apiService";
import { QUERY_KEY } from "../constants/queryConstants";

const getMethod = () => {
  return apiService.get("https://jsonplaceholder.typicode.com/todos");
};

export const useGet = () => {
  return useQuery({
    queryKey: [QUERY_KEY.getData],
    queryFn: getMethod,
  });
};

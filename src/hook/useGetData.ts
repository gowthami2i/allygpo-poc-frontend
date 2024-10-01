import { useQuery } from "@tanstack/react-query";
import { apiService } from "../services/api/apiService";

const getMethod = () => {
  return apiService.get("https://jsonplaceholder.typicode.com/todos");
};

export const useGet = () => {
  return useQuery({
    queryKey: ["data"],
    queryFn: getMethod,
  });
};

import { useMutation } from "@tanstack/react-query";
import { apiService } from "../../services/api/apiService";

const getLoginDetails = (loginData: any) => {
  return apiService.post("/login", loginData);
}

export const useGetLogin = () => {
  return useMutation({
    mutationFn: (loginData:any) => getLoginDetails(loginData),
  });
};

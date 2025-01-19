import { IDeleteData, IFormData } from "../types/request/contractExplorer";
import { apiService, formHeaders } from "./api/apiService";

export const deleteData = (fileData:IDeleteData) => {
  return apiService.delete("/deleteFile", {
    data: fileData, // Payload must be in the `data` property
  });
};

export const uploadDocument = (formData: IFormData) => {
  return apiService.post(
    `/documents/${
      formData.parserType === "vision_parser"
        ? `uploadVisionParser`
        : `uploadDoclingParser`
    }`,
    formData,
    {
      headers: formHeaders,
    }
  );
};

export const checkFileName = (fileName: any) => {
  return apiService.post(`checkFileName`, fileName);
};

export const getFileDetails = (fileName:{fileName:string}) => {
  console.log(fileName,"s")
  return apiService.post(`/downloadFile`, fileName);
};

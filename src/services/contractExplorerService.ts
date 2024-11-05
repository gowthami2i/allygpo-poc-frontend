import useLocalStorage from "../hook/global/useLocalStorage";
import { ACTION_TYPE, updateState } from "../store/appStore";
import { IFormData } from "../types/request/contractExplorer";
import { apiService, formHeaders } from "./apiService";

export const deleteData = (id: { document_id: string }) => {
  const { getItem: getLocalStorage, setItem: setLocalStorage } =
    useLocalStorage();
  let localData = getLocalStorage("documents");

  if (!localData) {
    localData = [];
  }
  const foundIndex = id && localData?.findIndex((x: any) => x.id === id);
  const updatedData = [...localData];

  if (id && foundIndex !== -1 && foundIndex !== undefined) {
    updatedData.splice(foundIndex, 1);
    updateState(ACTION_TYPE.EXPLORER, updatedData);
    setLocalStorage("documents", updatedData);
  }
  return Promise.resolve({ data: { id } });
};

export const uploadDocument = (formData: IFormData) => {
  // return Promise.resolve({ data: formData });

  return apiService.post("/documents/upload", formData, {
    headers: formHeaders,
  });
};

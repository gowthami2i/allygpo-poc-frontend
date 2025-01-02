import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { CustomFileUpload } from "../fileUpload/FileUpload";
import { AppInput } from "../global/appInput/AppInput";
import AppDropdown from "../global/appDropdown/AppDropdown";
import { z } from "zod";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";
import { Constants } from "../../constants/appConstants";
import { contractType } from "../../mockData/data";
import { Button } from "primereact/button";
import useLocalStorage from "../../hook/global/useLocalStorage";
import { ACTION_TYPE, updateState } from "../../store/appStore";
import { blobToBase64 } from "../../utils/helpers";
import { useToast } from "../../context/ToastContext";
import "./contractupload.scss";
import { useHeaderContext } from "../../context/HeaderContext";

interface IContractUpload {
  setVisible: Dispatch<SetStateAction<boolean>>;
  uploadDocument: any;
  isUploadPending: boolean;
  isUploadSuccess: boolean;
}

export const ContractUpload = (props: IContractUpload) => {
  const context = useHeaderContext();
  const { setVisible, uploadDocument, isUploadPending } =
    props;
  const { showToast, clearToast }: any = useToast();
  const { getItem: getLocalStorage, setItem: setLocalStorage } =
    useLocalStorage();
  const localData = getLocalStorage("documents") ?? [];
  const contractUploadSchema = z.object({
    file: z.array(z.any()).min(1, Constants.FILE_REQUIRED), // File as an array
    description: z
      .string()
      .min(1, Constants.DESCRIPTION_REQUIRED)
      .max(100, Constants.MAX_DESCRIPTION),
    contractType: z.string().min(1, Constants.CONTRACT_TYPE_REQUIRED),
  });

  useEffect(() => {
    if (isUploadPending) {
      setVisible(false);
      showToast({
        severity: "info",
        detail: "Please wait, Uploading in progress...",
        sticky: true,
        closable: false,
      });
    }
  }, [isUploadPending]);

  type Contract = z.infer<typeof contractUploadSchema>;
  const form = useForm<Contract, ZodValidator>({
    defaultValues: {
      file: [],
      description: "",
      contractType: "",
    },
    validators: {
      onSubmit: contractUploadSchema,
    },
    validatorAdapter: zodValidator(),
    onSubmit: (values: any) => {
      const value = values.value;
      value.documentName = value.file[0].name;
      value.file = value.file[0];
      value.isChecked = context.checked;
      uploadDocument(values.value, {
        onSuccess: async () => {
          clearToast();
          value.id = Date.now();
          value.dateUploaded = value.id;
          value.file = await blobToBase64(value.file);
          localData.unshift(value);
          updateState(ACTION_TYPE.EXPLORER, localData);
          setLocalStorage("documents", localData);
          setVisible(false);
          showToast({
            severity: "success",
            detail: "Uploaded successfully",
            life:3000,
          });
        },
        onError: () => {
          clearToast();
          showToast({
            severity: "error",
            detail: "Upload Failed",
            sticky: true,
          });
        },
      });
    },
  });

  const FieldInfo = (field: any) => {
    return (
      <>
        {field.field.state?.meta.isTouched &&
        field.field.state?.meta.errors.length ? (
          <span className="text-xs error-card">
            {field.field.state?.meta.errors.join(", ")}
          </span>
        ) : null}
      </>
    );
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="file"
            children={(field) => (
              <>
                <CustomFileUpload
                  uploadFileHandler={(event: any) => {
                    field.handleChange(event.files);
                  }}
                  label={Constants.SELECT_FILE}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        <div>
          <form.Field
            name="description"
            children={(field) => (
              <>
                <AppInput
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.handleChange(e.target.value);
                  }}
                  label={Constants.DESCRIPTION}
                  placeholder={Constants.PLACEHOLDER_DESCRIPTION_REQUIRED}
                  className="w-full"
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="contractType"
            children={(field) => (
              <>
                <AppDropdown
                  className="w-full"
                  label={Constants.CONTRACT_TYPE}
                  value={field.state.value}
                  options={contractType}
                  optionLabel="name"
                  optionValue="code"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.handleChange(e.target.value);
                  }}
                  placeholder={Constants.PLACEHOLDER_CONTRACT_TYPE_REQUIRED}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        <div className="flex justify-content-end mt-5 gap-4">
          <Button
            label={Constants.CANCEL}
            type="button"
            onClick={() => {
              setVisible(false);
            }}
            className="px-5"
            severity="secondary"
            outlined
          />
          <Button label={Constants.UPLOAD} type="submit" className="px-5" />
        </div>
      </form>
    </div>
  );
};

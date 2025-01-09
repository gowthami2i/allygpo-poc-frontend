import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { CustomFileUpload } from "../fileUpload/FileUpload";
import { AppInput } from "../global/appInput/AppInput";
import { z } from "zod";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";
import { Constants } from "../../constants/appConstants";
import { Button } from "primereact/button";
import { useToast } from "../../context/ToastContext";
import "./contractupload.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { useCheckFileName } from "../../hook/document/useCheckFileName";

interface IContractUpload {
  setVisible: Dispatch<SetStateAction<boolean>>;
  uploadDocument: any;
  isUploadPending: boolean;
  isUploadSuccess: boolean;
  fetchDocument: any;
}

export const ContractUpload = (props: IContractUpload) => {
  const context = useHeaderContext();
  const { setVisible, uploadDocument, isUploadPending, fetchDocument } = props;
  const { showToast, clearToast }: any = useToast();
  const [checkFile, setCheckFile] = useState(false);
  const contractUploadSchema = z.object({
    file: z.array(z.any()).min(1, Constants.FILE_REQUIRED), // File as an array
    description: z
      .string()
      .min(1, Constants.DESCRIPTION_REQUIRED)
      .max(100, Constants.MAX_DESCRIPTION),
    contractType: z.string().min(1, Constants.CONTRACT_TYPE_REQUIRED),
  });
  const { mutate: checkFileName, isPending } = useCheckFileName();
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
      value.parserType = context.checked ? "vision_parser" : "docling_parser";
      uploadDocument(values.value, {
        onSuccess: async () => {
          clearToast();
          fetchDocument();
          setVisible(false);
          showToast({
            severity: "success",
            detail: "Uploaded successfully",
            life: 3000,
          });
        },
        onError: () => {
          clearToast();
          showToast({
            severity: "error",
            detail: "Upload Failed",
            life: 3000,
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

  const checkDuplicateFile = (fileData: any) => {
    const fileName = fileData.files.map((file: any) => file.name);
    const fileDetails = {
      file_name: fileName[0],
      parserType: context.checked ? "vision_parser" : "docling_parser",
    };
    checkFileName(fileDetails, {
      onSuccess: (data: any) => {
        setCheckFile(data?.data?.filePresent);
        data?.data?.filePresent &&
          showToast({
            severity: "error",
            detail: `File uploaded with ${
              data.parserType === "vision_parser"
                ? "vision parser"
                : "docling parser"
            } already exists, please select a new file`,
            life: 3000,
          });
      },
    });
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
                    checkDuplicateFile(event);
                  }}
                  label={Constants.SELECT_FILE}
                  isCheckFile={checkFile}
                  setCheckFile={setCheckFile}
                  isPending={isPending}
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
                  isRequired={true}
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
                <AppInput
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.handleChange(e.target.value);
                  }}
                  label={Constants.CONTRACT_TYPE
                  }
                  placeholder={Constants.PLACEHOLDER_CONTRACT_TYPE_REQUIRED}
                  className="w-full"
                  isRequired={true}
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
          <Button label={Constants.UPLOAD} type="submit" className="px-5" disabled={checkFile}/>
        </div>
      </form>
    </div>
  );
};

import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "@tanstack/react-form";
import { CustomFileUpload } from "../fileUpload/FileUpload";
import { AppInput } from "../appInput/AppInput";
import AppDropdown from "../appDropdown/AppDropdown";
import { z } from "zod";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";
import { contractType } from "../table/data";
import "./contractupload.scss";
import { Constants } from "../../constants/appConstants";
import { Button } from "primereact/button";
import { useUploadDocument } from "../../hook/useUpload";

interface IContractUpload {
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const ContractUpload = (props: IContractUpload) => {
  const { mutate: uploadDocument } = useUploadDocument();
  const contractUploadSchema = z.object({
    file: z.array(z.any()).min(1, Constants.FILE_REQUIRED), // File as an array
    description: z.string().min(1, Constants.DESCRIPTION_REQUIRED),
    contractType: z.string().min(1, Constants.CONTRACT_TYPE_REQUIRED),
  });

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
    onSubmit: (values) => {
      uploadDocument(values.value, {
        onSuccess: () => {
          props.setVisible(false);
        },
        onError: (error) => {
          console.error("Error uploading document:", error);
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
                {/* <Typography
                  variant={TextVariant.SUBHEADING1}
                  // className={`${labelClassName ? labelClassName : "label"}`}
                >
                  {Constants.DESCRIPTION}
                </Typography>
                <InputText
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.handleChange(e.target.value);
                  }}
                  // className={`custom-input ${className}`}
                  placeholder={Constants.PLACEHOLDER_DESCRIPTION_REQUIRED}
                /> */}
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
              props.setVisible(false);
            }}
            className="px-5"
            severity="secondary"
            outlined
          />
          <Button
            label={Constants.UPLOAD}
            type="submit"
            onClick={() => {
              // props.setVisible(false);
            }}
            className="px-5"
          />
        </div>
      </form>
    </div>
  );
};

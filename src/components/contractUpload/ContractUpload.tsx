import React from "react";
import { useForm } from "@tanstack/react-form";
import { CustomFileUpload } from "../fileUpload/FileUpload";
import { CustomInput } from "../customInput/CustomInput";
import CustomDropdown from "../customDropdown/CustomDropdown";
import { CustomButton } from "../customButton/CustomButton";
import { z } from "zod";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";

export const ContractUpload = (props: any) => {
  const contractUploadSchema = z.object({
    file: z.array(z.any()).min(1, "At least one file is required"), // File as an array
    description: z.string().min(1, "Description is required"),
    contractType: z.string().min(1, "Contract type is required"),
  });

  type Contract = z.infer<typeof contractUploadSchema>;
  const form = useForm<Contract, ZodValidator>({
    defaultValues: {
      file: [],
      description: "",
      contractType: "",
    },
    validators: {
      onChange: contractUploadSchema,
    },
    validatorAdapter: zodValidator(),
    onSubmit: (values) => {
      console.log("Form submitted with:", values);
      // Handle form submission logic here
    },
  });

  const contractType = [
    { name: "Partnership Contract", code: "partnershipContract" },
    { name: "Fixed Price Contract", code: "fixedPriceContract" },
  ];

  const FieldInfo = (field: any) => {
    return (
      <div>
        {field.field.state.error && <span>{field.field.state.error}</span>}
      </div>
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
        <div className="">
          <form.Field
            name="file"
            children={(field) => (
              <>
                <CustomFileUpload
                  uploadFileHandler={(event: any) => {
                    field.handleChange(event.files);
                  }}
                  label="SELECT FILE"
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
                <CustomInput
                  className="contract-input border-round-left-"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  label="Description"
                  placeholder="Please describe the document here"
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
                <CustomDropdown
                  className="w-full"
                  label="Contract Type"
                  value={field.state.value}
                  options={contractType}
                  optionLabel="name"
                  optionValue="code"
                  onChange={(e: any) => {
                    field.handleChange(e.target.value);
                  }}
                  placeholder="Select Contract Type"
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        <div className="flex justify-content-end mt-5 gap-4">
          <CustomButton
            type="button"
            label="CANCEL"
            buttonType="primary-outline"
            className={"px-5"}
            onClick={() => {
              props.setVisible(false);
            }}
          />
          <CustomButton
            type="submit"
            label="UPLOAD"
            buttonType="primary"
            className={"px-5"}
            onClick={() => {
              //   setVisible(false);
            }}
          />
        </div>
      </form>{" "}
    </div>
  );
};

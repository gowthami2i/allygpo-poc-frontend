import React from "react";
import { useForm } from "@tanstack/react-form";
import { CustomFileUpload } from "../fileUpload/FileUpload";
import { CustomInput } from "../customInput/CustomInput";
import CustomDropdown from "../customDropdown/CustomDropdown";
import { CustomButton } from "../customButton/CustomButton";

export const ContractUpload = (props:any) => {
  const form = useForm({
    defaultValues: {
      file: "",
      description: "",
      contractType: "",
    },
    onSubmit: (values) => {
      console.log("Form submitted with:", values);
      // Handle form submission logic here
    },
  });

  const contractType = [
    { name: "Partnership Contract", code: "partnershipContract" },
    { name: "Fixed Price Contract", code: "fixedPriceContract" },
  ];

  const uploadHandler = (event: any) => {
    console.log(event.files, "eee");
  };
  const FieldInfo = (field: any) => (
    <div>
      {field?.state?.error && <span>{field?.state?.error}</span>}
      {/* Additional field-specific information can go here */}
    </div>
  );
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex p-2">
          <form.Field
            name="file"
            children={(field) => (
              <>
                <CustomFileUpload uploadFileHandler={uploadHandler} />
                <CustomInput
                  value={""}
                  placeholder="No File Selected"
                  onChange={() => {}}
                  labelClassName="m-0"
                  className=""
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        <div>
          <form.Field
            name="description"
            // validators={{
            //   onChange: ({ value }) =>
            //     !value ? "Description is required" : undefined,
            // }}
            children={(field) => (
              <>
                <CustomInput
                  className="contract-input border-round-left-"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value),
                      console.log(e.target.value, "dec");
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
            // validators={{
            //   onChange: ({ value }) =>
            //     !value ? "Contract type is required" : undefined,
            // }}
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
                    field.handleChange(e.target.value),
                      console.log(e.target.value, "drop");
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

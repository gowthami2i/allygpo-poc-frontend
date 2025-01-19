import { useEffect, useState } from "react";
import AppTable from "../../components/global/table/AppTable";
import { ContractUpload } from "../../components/contractExplorer/ContractUpload";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePageNavigation } from "../../hook/global/UsePageNavigation";
import {
  Constants,
  DateFormats,
  DialogHeader,
  TextVariant,
} from "../../constants/appConstants";
import { Button } from "primereact/button";
import "../../components/contractExplorer/contractExplorer.scss";
import Typography from "../../components/global/typography/Typography";
import SearchBar from "../../components/global/appInput/SearchBar";
import { AppDialog } from "../../components/global/appDialog/AppDialog";
import { useGetDocumentData } from "../../hook/document/useGet";
import { useDelete } from "../../hook/document/useDelete";
import { formatDate } from "../../utils/helpers";
import Icon, { IconNames } from "../../components/global/appIcons/Icon";
import { useStore } from "@tanstack/react-store";
import { ACTION_TYPE, store, updateState } from "../../store/appStore";
import { useUploadDocument } from "../../hook/document/useUpload";
import { Tooltip } from "primereact/tooltip";
import { Checkbox } from "primereact/checkbox";
import { log } from "console";
import { useGetFile } from "../../hook/document/useGetFile";

export const ContractExplorer = () => {
  const { navigateTo } = usePageNavigation();
  const { mutate: getDocument } = useGetDocumentData();
  const {
    mutate: uploadDocument,
    isPending: isUploadPending,
    isSuccess: isUploadSuccess,
  } = useUploadDocument();
  const data = useStore(store, (state: any) => state[ACTION_TYPE.EXPLORER]);
  const { mutate: deleteDocument } = useDelete();
  const { mutate: getFileName } = useGetFile();
  const [visible, setVisible] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const pageCount = 5;

  const getFileNameDetail = (value: any) => {

    const fileName = value.map((fileData: any) => ({
      documentName: fileData.documentName,
    }));
    
    getFileName(
     
      { fileName: value[0]?.documentName },
      // { fileName: fileName[0].documentName },
      {
        onSuccess: (data: any) => {
          // const secondFile = SecondFile
          // const viewData = [
          //   { file: data?.data?.fileContent, fileName: "file1" },
          //   { file: SecondFile, type: "application/pdf", fileName: "file2" },
          // ];

          value[0].file = data?.data?.fileContent;
          value[0].fileName = fileName;
          // value.secondFile = SecondFile
          // value.file = viewData;
          value[0].isDisable = true;
          navigateTo("view-details", value[0]);
        },
      }
    );
  };
console.log(data,"ss")
  const deleteDocumentDetail = (value: any) => {
    const deleteFile = {
      file_name: value?.documentName,
      parserType: value?.parserType,
    };
    deleteDocument(deleteFile, {
      onSuccess: () => {
        fetchDocument();
      },
    });
  };

  const [checked, setChecked] = useState(false);
  const selectedPdf: any = [];
  useEffect(() => {
    fetchDocument();
  }, [globalFilter]);

  const formatParserType = (value: string): string => {
    return value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const columns: any = [
    // {
    //   header: "",
    //   accessorKey: "id",
    //   cell: ({ cell }: any) => (
    //     <Checkbox
    //       onChange={(e: any) => {
    //         data.map((fileDetail:any)=>{
    //           if(fileDetail.documentName == cell.row.original.documentName){
    //             selectedPdf.push(cell.row.original);
    //             setChecked(e?.checked);
    //           }
         
    //         })
           
    //       }}
    //       checked={checked}
    //     ></Checkbox>
    //   ),
    // },
    {
      header: "Document",
      accessorKey: "documentName",
      width: "20rem",
      cell: ({ getValue }: any) => (
        <span className="document-data">{getValue()}</span>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      width: "15rem",
      cell: ({ getValue }: any) => {
        const description = getValue();
        const isLongDescription = description.length > 65;
        const displayText = isLongDescription
          ? `${description.slice(0, 65)}...`
          : description;

        const safeId = `description-${description.replace(
          /[^a-zA-Z0-9]/g,
          "_"
        )}`;

        return (
          <>
            <span id={safeId}>{displayText}</span>
            {isLongDescription && (
              <Tooltip
                target={`#${safeId}`}
                content={description}
                position="bottom"
                style={{ fontSize: "10px" }}
              />
            )}
          </>
        );
      },
    },
    {
      header: "Contract Type",
      accessorKey: "contractType",
      cell: ({ getValue }: any) => {
        const value = getValue();
        return formatParserType(value);
      },
    },
    {
      header: "No.Of.Pages",
      accessorKey: "numPages",
    },
    {
      header: "Parser",
      accessorKey: "parserType",
      cell: ({ getValue }: any) => {
        const value = getValue();
        return formatParserType(value);
      },
    },
    {
      header: "Date uploaded",
      accessorKey: "uploadedDate",
      cell: ({ getValue }: any) => (
        <span>{formatDate(getValue(), DateFormats.DD_MM_YYYY_SLASH)}</span>
      ),
    },
    // {
    //   header: "",
    //   accessorKey: "id",
    //   enableGlobalFilter: false,
    //   cell: ({ cell }:any) => (
    //     <span
    //       className="extra-data"
    //       onClick={() => {
    //         navigateTo("view-details", cell.row.original);
    //       }}
    //     >
    //       View Details
    //     </span>
    //   ),
    // },
    {
      header: "",
      accessorKey: "id",
      enableGlobalFilter: false,
      cell: ({ cell }: any) => (
        <div
          className="cursor-pointer"
          onClick={() => {
            deleteDocumentDetail(cell.row.original);
          }}
        >
          <Icon iconName={IconNames.trashIcon} iconSize={15} />
        </div>
      ),
    },
  ];

  const fetchDocument = () => {
    getDocument(
      { file_names: globalFilter ? [globalFilter] : [] },
      {
        onSuccess: (data: any) => {
          updateState(ACTION_TYPE.EXPLORER, data.data.fileDetails);
        },
      }
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: pageCount,
      },
    },
    
  });
  const [selectedRows, setSelectedRows] = useState<any[]>([]); // State for selected rows
  const handleCheckboxChange = (row: any, isChecked: boolean) => {
    console.log(row, "com");
    setSelectedRows((prev: any) => {
      if (isChecked) {
        setChecked(true);
        return [...prev, row];
      } else {
        
        return prev.filter(
          (selectedRow: any) => selectedRow.documentName !== row.documentName
        );
      }
    });
  };
  
  return (
    <div className="layout m-5">
      <div className="flex justify-content-between align-items-center h-4rem px-3">
        <Typography variant={TextVariant.HEADING1} className="font-medium">
          {Constants.CONTRACTS}
        </Typography>
        <div className="flex justify-content-between gap-5">
          <SearchBar
            value={globalFilter}
            handleChange={(e: any) => setGlobalFilter(e.target.value)}
          />

          <Tooltip
            target=".disabled-button"
            position="bottom"
            style={{ fontSize: "13px" }}
          />
          <span
            className="disabled-button"
            data-pr-tooltip={!checked ? "Please select the Pdf to enable" : ""}
          >
            <Button
              label="Start Chat"
              type="button"
              onClick={() => {
                getFileNameDetail(selectedRows);
                // navigateTo("view-details", selectedPdf[0]);
              }}
              disabled={!checked}
              severity="secondary"
            />
          </span>
          <Button
            label={Constants.UPLOAD_CONTRACT}
            type={"button"}
            onClick={() => {
              setVisible(true);
            }}
            disabled={isUploadPending}
            icon="pi pi-upload"
            severity="secondary"
          />
        </div>
      </div>
      <AppTable
        columns={columns}
        data={data}
        pageCount={pageCount}
        table={table}
        paginator={true}
        showCheckbox={true}
        setSelectedRows={setSelectedRows}
        selectedRows ={selectedRows}
        setChecked={setChecked}
        handleCheckboxChange={handleCheckboxChange}
      />
      <AppDialog
        visible={visible}
        headerName={DialogHeader.UPLOAD_CONTRACT}
        setVisible={setVisible}
        headerClassName="p-2"
        contentClassName="p-4"
        width="50vw"
      >
        <ContractUpload
          setVisible={setVisible}
          uploadDocument={uploadDocument}
          isUploadPending={isUploadPending}
          isUploadSuccess={isUploadSuccess}
          fetchDocument={fetchDocument}
        />
      </AppDialog>
    </div>
  );
};

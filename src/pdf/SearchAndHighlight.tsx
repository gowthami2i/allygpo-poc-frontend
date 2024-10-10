import React, { useState, useCallback } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Typography from "../typography/Typography";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
};

const SearchAndHighlight = ({ pdfFile }: any) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.2);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
  };

  const highlightPattern = (text: string, pattern: string) => {
    if (!pattern) return text;

    const regex = new RegExp(`(${pattern})`, "gi");

    return text.replace(
      regex,
      (match) => `<mark style="background:#D5EBFF">${match}</mark>`
    );
  };

  const customTextRenderer = useCallback(
    (textItem: any) => highlightPattern(textItem.str, searchTerm),
    [searchTerm]
  );

  return (
    <div
      className="pdf-scroll"
      style={{
        display: "flex",
        flex: 1,
        background: "#313131",
      }}
    >
      <div className="w-full">
        <div
          className="flex px-6 align-items-center gap-4"
          style={{
            background: "#1A1A1A",
            color: "#FFFFFF",
          }}
        >
          <i className="pi pi-arrow-left"></i>
          <Typography variant="h7">DocumentName.pdf</Typography>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              margin: "10px",
              width: "95%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div className="p-2 flex justify-content-center h-29rem pdf-scroll overflow-scroll">
          <Document
            file={pdfFile}
            options={options}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {/* Render all the pages of the PDF */}
            {Array.from(new Array(numPages), (_, index) => (
              <div key={`page_${index + 1}`} style={{ marginBottom: "20px" }}>
                <Page
                  pageNumber={index + 1}
                  scale={scale}
                  renderTextLayer={true}
                  customTextRenderer={customTextRenderer}
                />
                {/*<Page
                  key={`page_${index + 1}`}
                  inputRef={(ref) => {
                    if (ref && numPages === index + 1) {
                      ref.scrollIntoView();
                    }
                  }}
                  pageNumber={index + 1}
                  renderTextLayer={true}
                  customTextRenderer={customTextRenderer}
                />*/}
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default SearchAndHighlight;

import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageTexts, setPageTexts] = useState<string[]>([]);

  useEffect(() => {
    if (pdfFile) {
      loadPdfText();
    }
  }, [pdfFile]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfFile(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const loadPdfText = async () => {
    if (pdfFile) {
      const loadingTask = pdfjs.getDocument(pdfFile);
      const pdf = await loadingTask.promise;
      const textArray = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const strings = textContent.items.map((item: any) => item.str);
        textArray.push(strings.join(" "));
      }
      setPageTexts(textArray);
    }
  };

  const handleSearch = () => {
    pageTexts.forEach((text, index) => {
      if (text.includes(searchTerm)) {
        console.log(`Found on page ${index + 1}`);
      }
    });
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(<Page key={i} pageNumber={i} />);
    }
    return pages;
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
      />
      <button onClick={handleSearch}>Search</button>
      {pdfFile && (
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {renderPages()}
        </Document>
      )}
    </div>
  );
};

export default PdfViewer;

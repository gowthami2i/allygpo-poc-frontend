import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Typography from "../global/typography/Typography";
import { TextVariant } from "../../constants/appConstants";
import { Button } from "primereact/button";
import { base64ToBlob } from "../../utils/helpers";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
};

const PdfViewer = ({ data, navigateBack, selectedReference }: any) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(0.8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pageItem, setPageItem] = useState<any>({});
  const file = useMemo(() => base64ToBlob(data.file), [data.file]);
  const [highlightIndices, setHighlightIndices] = useState<any>({
    startIndex: null,
    endIndex: null,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [numPages]);

  useEffect(() => {
    if (selectedReference?.item?.page_no) {
      goToPage(selectedReference.item.page_no);
      setCurrentPage(selectedReference.item.page_no);
    }
  }, [selectedReference]);

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.8));
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2)); // Maximum scale is 3
  };

  useEffect(() => {
    if (!selectedReference) return;

    let startIdx: number | null = null;
    let endIdx: number | null = null;

    const { page_no, start_end_strings } = selectedReference.item;

    pageItem[page_no]?.forEach((textItem: any, index: number) => {
      if (
        textItem.str.trim() !== "" &&
        (textItem.str === start_end_strings[0] ||
          start_end_strings[0].startsWith(textItem.str) ||
          textItem.str.includes(start_end_strings[0]))
      ) {
        startIdx = index;
      }

      if (
        startIdx !== null &&
        textItem.str.trim() !== "" &&
        (textItem.str === start_end_strings[1] ||
          start_end_strings[1].endsWith(textItem.str) ||
          textItem.str.includes(start_end_strings[1]))
      ) {
        endIdx = index;
      }
    });

    if (startIdx !== null && endIdx !== null && endIdx > startIdx) {
      setHighlightIndices({
        startIndex: startIdx,
        endIndex: endIdx,
      });
    } else {
      setHighlightIndices({
        startIndex: null,
        endIndex: null,
      });
    }
  }, [selectedReference]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container && numPages) {
      // Calculate current scroll position and total height
      const scrollTop = container.scrollTop;
      const totalScrollHeight = container.scrollHeight;

      // Calculate page height based on total scroll height and number of pages
      const pageHeight = totalScrollHeight / numPages;

      // Calculate the current page based on scroll position
      const currentPageNumber = Math.min(
        Math.max(Math.round(scrollTop / pageHeight) + 1, 1),
        numPages
      );

      setCurrentPage(currentPageNumber);
    }
  };

  const goToPage = (pageNumber: number) => {
    const container = containerRef.current;
    if (container && numPages) {
      const scrollByPage = document.getElementById(`page_${pageNumber}`);
      scrollByPage?.scrollIntoView();
    }
  };

  const onDocumentLoadSuccess = async (pdf: any) => {
    setNumPages(pdf.numPages);

    const pageItem: any = {};
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      pageItem[pageNum] = textContent.items;
    }
    setPageItem(pageItem);
  };

  const highlightPattern = (
    text: any,
    startIndex: number,
    endIndex: number
  ) => {
    if (text.itemIndex >= startIndex && text.itemIndex <= endIndex) {
      return text.str.replace(
        text.str,
        (match: any) =>
          `<mark style="background:#D5EBFF; padding-right: 5px; padding-right: 3px">${match}</mark>`
      );
    }
    return text.str;
  };

  const customTextRenderer = useCallback(
    (textItem: any) => {
      if (textItem.pageNumber === Number(selectedReference?.item?.page_no)) {
        if (
          highlightIndices.startIndex !== null &&
          highlightIndices.endIndex !== null
        ) {
          return highlightPattern(
            textItem,
            highlightIndices.startIndex,
            highlightIndices.endIndex
          );
        }
      }

      // If no matches, return the text as is
      return textItem.str;
    },
    [selectedReference, highlightIndices]
  );

  return (
    <div
      className="w-8"
      style={{
        display: "flex",
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
          <Button
            type="button"
            onClick={navigateBack}
            icon="pi pi-arrow-left"
            className="text-white"
            text
          />
          <div className="w-3 overflow-ellipsis">
            <Typography variant={TextVariant.HEADING3}>
              {data.documentName}
            </Typography>
          </div>
          <Typography variant={TextVariant.BODY2}>|</Typography>
          <div className="w-6 overflow-ellipsis">
            <Typography variant={TextVariant.BODY2}>
              {data.description}
            </Typography>
          </div>
        </div>
        <div
          className="p-4 flex justify-content-center pdf-viewer overflow-scroll"
          ref={containerRef}
        >
          <Document
            file={file}
            options={options}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (_, index: number) => (
              <div
                key={`page_${index + 1}`}
                style={{ marginBottom: "20px" }}
                id={`page_${index + 1}`}
              >
                <Page
                  pageNumber={index + 1}
                  scale={scale}
                  customTextRenderer={customTextRenderer}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
      <div className="pdf-footer w-8">
        <div className="page">
          <div className="flex gap-3">
            <span>Page</span>
            <span>{currentPage}</span>
            <span>/</span>
            <span>{numPages}</span>
          </div>
          <span>|</span>
          <div className="flex gap-3">
            <i className="pi pi-minus cursor-pointer" onClick={handleZoomOut} />
            <i
              className="pi pi-search-plus cursor-pointer"
              // onClick={handleZoomOut}
            />

            <i className="pi pi-plus cursor-pointer" onClick={handleZoomIn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import pdf from "./../../assets/Contract Summary Samples (1).pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
};

const PdfViewer = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const file = pdf;

  const bbox = useMemo(() => ({
    page: 3, // Page number where the bbox appears
    "l": 25.55727767944336,
    "t": 433.78826904296875,
    "r": 611.80615234375,
    "b": 382.10980224609375,
    coord_origin: "BOTTOMLEFT", 
   
  }), []);

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 1));
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  };
  const renderHighlight = useCallback(
    (viewport: any) => {
      const { l, t, r, b, coord_origin } = bbox;
  
      // Transform coordinates from BOTTOMLEFT to TOPLEFT
      const pageHeight = viewport.height;
      const topConverted = coord_origin === "BOTTOMLEFT" ? pageHeight - b : b;
      const bottomConverted = coord_origin === "BOTTOMLEFT" ? pageHeight - t : t;
  
      // Calculate the height of the bounding box
      const bboxHeight = bottomConverted - topConverted;
  
      // Apply scaling to the coordinates
      const adjustedTop = topConverted * viewport.scale;
      const adjustedHeight = bboxHeight * viewport.scale;
      const adjustedLeft = l * viewport.scale;
      const adjustedWidth = (r - l) * viewport.scale;
  
      return (
        <div
          key={`highlight`}
          style={{
            position: "absolute",
            left: `${adjustedLeft}px`,
            top: `${adjustedTop}px`,
            width: `${adjustedWidth}px`,
            height: `${adjustedHeight}px`,
            backgroundColor: "rgba(255, 255, 0, 0.5)", // Yellow highlight
            pointerEvents: "none",
          }}
        />
      );
    },
    [bbox]
  );
  
  
  
  return (
    <div
      className="pdf-viewer-container"
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#313131",
      }}
    >
      <div className="pdf-viewer" ref={containerRef}>
        <Document
          file={file}
          options={options}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div
              key={`page-${index + 1}`}
              style={{ position: "relative", marginBottom: "20px" }}
            >
              <Page
                pageNumber={index + 1}
                scale={scale}
                renderAnnotationLayer={false} // Disable annotation layer
                onRenderSuccess={(pageCanvas: any) => {
                  const viewport = pageCanvas.getViewport({ scale });
                  if (bbox.page === index + 1) renderHighlight(viewport);
                }}
              />
              {bbox.page === index + 1 && renderHighlight({
                width: 612, // Default page width
                height: 792, // Default page height
                scale, // Apply current scaling
              })}
            </div>
          ))}
        </Document>
      </div>
      <div className="pdf-controls">
        <button onClick={handleZoomOut}>Zoom Out</button>
        <button onClick={handleZoomIn}>Zoom In</button>
      </div>
    </div>
  );
};

export default PdfViewer;

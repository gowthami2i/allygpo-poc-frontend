import React, { useState, useEffect, useRef } from "react";
import { Constants, TextVariant } from "../../constants/appConstants";
import Icon, { IconNames } from "../global/appIcons/Icon";
import Typography from "../global/typography/Typography";
import { IBotText, IBotTextListItem } from "../../types/chatbot";
import Typing from "./Typing";
import "./../viewDetails/viewDetails.scss";

const BotText = ({
  text,
  selectedReference,
  handleReference,
  conversationIndex,
  isExpanded,
  setIsExpanded
}: IBotText) => {
 
  const [showExpandButton, setShowExpandButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        setShowExpandButton(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const handleExpandToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={`flex gap-3 ${isExpanded ? "bot-text-expanded" : ""}`}>
      <div className="mt-3">
        <Icon iconName={IconNames.chatLogo} iconSize={35} />
      </div>
      {text?.isLoading && (
        <div className="flex align-items-center">
          <Typing />
        </div>
      )}
     {/* {text?.isError ?  <div className=" flex align-items-center">
          <div className="border-1 px-1 border-round-md w-12rem h-2rem flex align-items-center error-msg">
            <Typography variant={TextVariant.BODY2}>
              Something went wrong
            </Typography>
          </div>
        </div>: */}
         <div
          ref={containerRef}
          className="flex flex-column bot-text-container"
          style={{
            width: isExpanded ? "100%" : "40%",
            overflowX: isExpanded ? "visible" : "hidden",
          }}
        >
          <div className="bot-text-content">
            {/* 10-Column Table */}
            <div
              style={{
                display: "inline-block",
                minWidth: isExpanded ? "auto" : "100%",
              }}
            >
              <table className="table">
                <thead>
                  <tr>
                    {Array.from({ length: 10 }, (_, i) => (
                      <th key={i}>Column {i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }, (_, rowIndex) => (
                    <tr key={rowIndex}>
                      {Array.from({ length: 10 }, (_, colIndex) => (
                        <td key={colIndex}>Row {rowIndex + 1} Col {colIndex + 1}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
        {showExpandButton && !isExpanded && (
            <button
              onClick={handleExpandToggle}
              className="expand-button"
              style={{ marginTop: "8px" }}
            >
                            <i className="pi pi-angle-double-left" style={{ fontSize: '1rem' }}></i>

            </button>
          )}
          {isExpanded && (
            <button
              onClick={handleExpandToggle}
              className="collapse-button"
              style={{ marginTop: "8px" }}
            >
              <i className="pi pi-angle-double-right" style={{ fontSize: '1rem' }}></i>
            </button>
          )}
    </div>
  );
};

export default BotText;

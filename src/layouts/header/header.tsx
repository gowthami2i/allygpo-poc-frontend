import AllyGpo_icon from "../../assets/images/png/AllyIQ_Icon.png";
import "./header.scss";
import Typography from "../../typography/Typography";
import React, { useEffect, useRef } from "react";
import { useHeader } from "../../hook/useHeader";

export const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { setHeader } = useHeader();

  useEffect(() => {
    const setHeaderContext = () => {
      setTimeout(() => setHeader(headerRef?.current), 200);
    };

    setHeaderContext();
    window.addEventListener("resize", setHeaderContext);

    return () => {
      window.removeEventListener("resize", setHeaderContext);
    };
  }, [headerRef?.current, headerRef?.current?.offsetHeight]);

  return (
    <div ref={headerRef} className="header-container">
      <div className="header-primary-container flex align-items-center justify-content-center">
        <img src={AllyGpo_icon} alt="allgpoIcon" width={"80px"} />
      </div>
      <div className="header-secondary-container px-2 w-full">
        <Typography
          variant={"h6"}
          className="text-white m-0 font-semibold p-3 pl-5"
        >
          Contract Explorer
        </Typography>
      </div>
    </div>
  );
};

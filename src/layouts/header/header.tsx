import React from "react";
import AllyGpo_icon from "../../assets/images/png/AllyIQ_Icon.png";
import "./header.scss";
import Typography from "../../typography/Typography";

export const Header = () => {
  return (
    <div className="header-container">
      <div className="header-primary-container flex align-items-center justify-content-center">
        <img src={AllyGpo_icon} className="allgpoIcon" />
      </div>
      <div className="header-secondary-container px-2">
        <Typography variant={"h6"} className="text-white m-0 p-3">
          Contract Explorer
        </Typography>
      </div>
    </div>
  );
};

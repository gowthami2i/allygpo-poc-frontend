import AllyGpo_icon from "../../assets/images/png/AllyIQ_Icon.png";
import "./header.scss";
import Typography from "../typography/Typography";
import React, { useEffect, useRef } from "react";
import { Constants, TextVariant } from "../../constants/appConstants";


export const Header = () => {

  return (
    <div className="header-container">
      <div className="header-primary-container flex align-items-center justify-content-center">
        <img src={AllyGpo_icon} alt="allyGPOIcon" width={"80px"} />
      </div>
      <div className="header-secondary-container px-2 w-full">
        <Typography
          variant={TextVariant.HEADING1}
          className="text-white m-0 p-3 pl-5"
        >
          {Constants.CONTRACTS_EXPLORER}
        </Typography>
      </div>
    </div>
  );
};

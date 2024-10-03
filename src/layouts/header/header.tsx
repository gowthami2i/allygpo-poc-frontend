import AllyGpo_icon from "../../assets/images/png/AllyIQ_Icon.png";
// import AllyGpo_icon from "../../assets/images/svg/ally_gpo_logo.svg";
import "./header.scss";
import Typography from "../../typography/Typography";

export const Header = () => {
  return (
    <div className="header-container">
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

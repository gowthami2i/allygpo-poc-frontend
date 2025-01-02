import { Constants, TextVariant } from "../../../constants/appConstants";
import AllyGpo_icon from "../../../assets/images/AllyIQ_Icon.png";
import Typography from "../typography/Typography";
import "./header.scss";
import { InputSwitch } from "primereact/inputswitch";
import { useHeaderContext } from "../../../context/HeaderContext";

export const Header = () => {
  const context = useHeaderContext();

  return (
    <div className="header-container">
      <div className="header-primary-container flex align-items-center justify-content-center">
        <img src={AllyGpo_icon} alt="allyGPOIcon" width={"80px"} />
      </div>
      <div className="header-secondary-container px-2 w-full flex justify-content-between">
        <Typography
          variant={TextVariant.HEADING1}
          className="text-white m-0 p-3 pl-5"
        >
          {Constants.CONTRACTS_EXPLORER}
        </Typography>
        <div className="p-3 flex gap-1">
          <Typography
            variant={TextVariant.SUBHEADING1}
            className="text-white m-0 mt-1"
          >
            Docling Parser
          </Typography>
          <InputSwitch
            checked={context?.checked ?? false}
            onChange={(e) => {
              context?.setChecked(e.value)
            }}
          />
          <Typography
            variant={TextVariant.SUBHEADING1}
            className="text-white m-0 mt-1"
          >
            Vision Parser
          </Typography>
        </div>
      </div>
    </div>
  );
};

import React from "react";

interface IIconProps {
  iconSize?: number;
  iconName: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export enum IconNames {
  chatIcon = "chatIcon",
  trashIcon = "trashIcon",
  uploadIcon = "uploadIcon",
  documentIcon = "documentIcon",
  tickIcon = "tickIcon",
  chatLogo = "chatLogo",
}

const TrashIcon = () => {
  return (
    <path
      d="M2.25 14.25C1.8375 14.25 1.4845 14.1033 1.191 13.8097C0.8975 13.5162 0.7505 13.163 0.75 12.75V3H0V1.5H3.75V0.75H8.25V1.5H12V3H11.25V12.75C11.25 13.1625 11.1033 13.5157 10.8097 13.8097C10.5162 14.1038 10.163 14.2505 9.75 14.25H2.25ZM9.75 3H2.25V12.75H9.75V3ZM3.75 11.25H5.25V4.5H3.75V11.25ZM6.75 11.25H8.25V4.5H6.75V11.25Z"
      fill="#D9342B"
    />
  );
};

const ChatIcon = () => {
  return <path d="M0 16V10L8 8L0 6V0L19 8L0 16Z" fill="#095192" />;
};

const UploadIcon = () => {
  return (
    <path
      d="M1 10.75V12.25C1 12.6478 1.15804 13.0294 1.43934 13.3107C1.72064 13.592 2.10218 13.75 2.5 13.75H11.5C11.8978 13.75 12.2794 13.592 12.5607 13.3107C12.842 13.0294 13 12.6478 13 12.25V10.75M3.25 4.75L7 1M7 1L10.75 4.75M7 1V10"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  );
};

const DocumentIcon = () => {
  return (
    <>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.25 2.5C14.25 2.4337 14.2237 2.37011 14.1768 2.32322C14.1299 2.27634 14.0663 2.25 14 2.25H7C6.27065 2.25 5.57118 2.53973 5.05546 3.05546C4.53973 3.57118 4.25 4.27065 4.25 5V19C4.25 19.7293 4.53973 20.4288 5.05546 20.9445C5.57118 21.4603 6.27065 21.75 7 21.75H17C17.7293 21.75 18.4288 21.4603 18.9445 20.9445C19.4603 20.4288 19.75 19.7293 19.75 19V9.147C19.75 9.0807 19.7237 9.01711 19.6768 8.97022C19.6299 8.92334 19.5663 8.897 19.5 8.897H15C14.8011 8.897 14.6103 8.81798 14.4697 8.67733C14.329 8.53668 14.25 8.34591 14.25 8.147V2.5ZM15 12.25C15.1989 12.25 15.3897 12.329 15.5303 12.4697C15.671 12.6103 15.75 12.8011 15.75 13C15.75 13.1989 15.671 13.3897 15.5303 13.5303C15.3897 13.671 15.1989 13.75 15 13.75H9C8.80109 13.75 8.61032 13.671 8.46967 13.5303C8.32902 13.3897 8.25 13.1989 8.25 13C8.25 12.8011 8.32902 12.6103 8.46967 12.4697C8.61032 12.329 8.80109 12.25 9 12.25H15ZM15 16.25C15.1989 16.25 15.3897 16.329 15.5303 16.4697C15.671 16.6103 15.75 16.8011 15.75 17C15.75 17.1989 15.671 17.3897 15.5303 17.5303C15.3897 17.671 15.1989 17.75 15 17.75H9C8.80109 17.75 8.61032 17.671 8.46967 17.5303C8.32902 17.3897 8.25 17.1989 8.25 17C8.25 16.8011 8.32902 16.6103 8.46967 16.4697C8.61032 16.329 8.80109 16.25 9 16.25H15Z"
        fill="#095192"
      />
      <path
        d="M15.75 2.82396C15.75 2.63996 15.943 2.52296 16.086 2.63796C16.2073 2.73596 16.315 2.84996 16.409 2.97996L19.422 7.17696C19.49 7.27296 19.416 7.39696 19.298 7.39696H16C15.9337 7.39696 15.8701 7.37062 15.8232 7.32373C15.7763 7.27685 15.75 7.21326 15.75 7.14696V2.82396Z"
        fill="#095192"
      />
    </>
  );
};

const TickIcon = () => {
  return (
    <path
      d="M1.09375 5.84375L5.03125 9.78125L12.9062 1.34375"
      stroke="#00A991"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      transform="translate(0, 5)" /* Adjust the second value to control margin-top */
    />
  );
};

const ChatLogo = () => {
  return (
    <>
      <circle cx="17.5" cy="17.5" r="17.5" fill="white" />
      <mask
        id="mask0_96_1145"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="35"
        height="35"
      >
        <circle cx="17.5" cy="17.5" r="17.5" fill="#095192" />
      </mask>
      <g mask="url(#mask0_96_1145)">
        <path
          d="M17.5389 -1.81055C6.87341 -1.81055 0 5.99352 0 17.5775C0 29.1615 6.87896 36.8101 17.4611 36.8101C28.0433 36.8101 35 28.9284 35 17.4221C35 5.91581 28.2765 -1.81055 17.5389 -1.81055ZM27.5825 26.697H13.1306C9.26634 26.697 6.09612 23.6831 6.09612 19.9753C6.09612 16.2676 9.26634 13.2536 13.1306 13.2536H18.9269V18.4267H13.2083C12.3588 18.4267 11.6648 19.1206 11.6648 19.9698C11.6648 20.819 12.3588 21.5128 13.2083 21.5128H22.1693V12.3988C22.1693 11.6273 21.4753 10.9335 20.6258 10.8558H13.6691C14.3631 7.84185 17.2224 5.68269 20.5481 5.68269C24.4123 5.68269 27.5825 8.69663 27.5825 12.4044V26.697Z"
          fill="#095192"
        />
      </g>
      <circle cx="17.5" cy="17.5" r="17" stroke="#E0E0E0" />
    </>
  );
};
export default function Icon({ iconSize = 24, iconName }: IIconProps) {
  const renderIcon = () => {
    switch (iconName) {
      case IconNames.chatIcon:
        return <ChatIcon />;
      case IconNames.trashIcon:
        return <TrashIcon />;
      case IconNames.uploadIcon:
        return <UploadIcon />;
      case IconNames.documentIcon:
        return <DocumentIcon />;
      case IconNames.tickIcon:
        return <TickIcon />;
      case IconNames.chatLogo:
        return <ChatLogo />;
      default:
        return <ChatIcon />;
    }
  };
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox={`0 0 ${iconSize} ${iconSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {renderIcon()}
    </svg>
  );
}

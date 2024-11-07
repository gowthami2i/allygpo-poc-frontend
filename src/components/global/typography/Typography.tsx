import React from "react";
import { TextVariant } from "../../../constants/appConstants";

export interface ITypography {
  variant: string;
  className?: string;
  children?: string | any;
  style?: any;
}

const Typography = ({ variant, children, className = "" }: ITypography) => {
  return (
    <>
      {(() => {
        switch (variant) {
          /* Headings - Normal*/
          case TextVariant.HEADING1:
            return (
              <h1 className={`text-2xl font-semibold ${className} `}>
                {children}
              </h1>
            );
          case TextVariant.HEADING2:
            return (
              <h1 className={`text-2xl font-medium ${className} `}>
                {children}
              </h1>
            );
          case TextVariant.HEADING3:
            return (
              <p className={`text-base font-bold ${className}`}>{children}</p>
            );
          case TextVariant.SUBHEADING1:
            return (
              <p className={`text-sm font-bold ${className}`}>{children}</p>
            );
          case TextVariant.SUBHEADING2:
            return (
              <p className={`text-sm font-semibold ${className}`}>{children}</p>
            );
          case TextVariant.SUBHEADING3:
            return (
              <p className={`text-sm font-medium ${className}`}>{children}</p>
            );
          case TextVariant.SUBHEADING4:
            return (
              <p className={`text-sm font-semibold ${className}`}>{children}</p>
            );
          case TextVariant.BODY1:
            return (
              <p className={`text-base font-normal ${className}`}>{children}</p>
            );
          case TextVariant.BODY2:
            return (
              <p className={`text-sm font-normal ${className}`}>{children}</p>
            );
          case TextVariant.BODY3:
            return (
              <p className={`text-xs font-normal ${className}`}>{children}</p>
            );
          default:
            <p className={`text-sm font-normal ${className}`}>{children}</p>;
        }
      })()}
    </>
  );
};
export default Typography;

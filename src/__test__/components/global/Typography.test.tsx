import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import { TextVariant } from "../../../constants/appConstants";
import Typography from "../../../components/global/typography/Typography";

describe("Typography Component", () => {
  const variants = [
    { variant: TextVariant.HEADING1, tag: "h1", className: "text-2xl font-semibold" },
    { variant: TextVariant.HEADING2, tag: "h1", className: "text-2xl font-medium" },
    { variant: TextVariant.HEADING3, tag: "p", className: "text-base font-bold" },
    { variant: TextVariant.SUBHEADING1, tag: "p", className: "text-sm font-bold" },
    { variant: TextVariant.SUBHEADING2, tag: "p", className: "text-sm font-semibold" },
    { variant: TextVariant.SUBHEADING3, tag: "p", className: "text-sm font-medium" },
    { variant: TextVariant.SUBHEADING4, tag: "p", className: "text-sm font-semibold" },
    { variant: TextVariant.BODY1, tag: "p", className: "text-base font-normal" },
    { variant: TextVariant.BODY2, tag: "p", className: "text-sm font-normal" },
    { variant: TextVariant.BODY3, tag: "p", className: "text-xs font-normal" },
  ];

  variants.forEach(({ variant, tag, className }) => {
    it(`renders correct markup for variant ${variant}`, () => {
      render(
        <Typography variant={variant} className="test-class">
          Test Content
        </Typography>
      );

      const element = screen.getByText("Test Content");

      // Check that the correct HTML tag is used
      expect(element.tagName.toLowerCase()).toBe(tag);

      // Check that the correct classes are applied
      expect(element).toHaveClass(className);
      expect(element).toHaveClass("test-class");
    });
  });
});

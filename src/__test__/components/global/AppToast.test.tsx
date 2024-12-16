import React from "react";
import { render } from "@testing-library/react";
import AppToast from "../../../components/global/toast/AppToast";
import "@testing-library/jest-dom"; 

describe("AppToast", () => {
    it("renders without crashing", () => {
        render(<AppToast />);
    });

    it("renders the toast component", () => {
        const { getByTestId } = render(<AppToast />);
        const toastComponent = getByTestId("app-toast");
        expect(toastComponent).toBeInTheDocument();
    });

    // Add more test cases here...
});
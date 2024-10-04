import { StrictMode } from "react";
import App from "./App.tsx";
import "primereact/resources/themes/tailwind-light/theme.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import ReactDOM from "react-dom/client";
import "./app.scss";
import "primeicons/primeicons.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

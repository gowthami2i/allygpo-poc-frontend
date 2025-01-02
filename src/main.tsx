import { StrictMode } from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import "./app.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

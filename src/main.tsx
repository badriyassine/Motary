import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement as HTMLElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

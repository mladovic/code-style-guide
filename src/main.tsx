import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DarkModeCtxProvider } from "./features/dark-mode";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeCtxProvider>
      <App />
    </DarkModeCtxProvider>
  </StrictMode>
);

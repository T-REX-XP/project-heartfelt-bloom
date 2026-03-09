import { createRoot } from "react-dom/client";
import { FluentProvider } from "@fluentui/react-components";
import { lightTheme } from "./theme";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <FluentProvider theme={lightTheme}>
    <App />
  </FluentProvider>
);

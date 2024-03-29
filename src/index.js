import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

import { StoreProvider } from "./StoreProvider";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StoreProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StoreProvider>
);

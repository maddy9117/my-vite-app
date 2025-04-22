import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { SearchProvider } from "./context/SearchContext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SearchProvider>
        <App />
      </SearchProvider>
    </Provider>
  </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ApiProvider } from "./components/contexts/ApiContext.jsx";
import { ChartProvider } from "./components/contexts/ChartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChartProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </ChartProvider>
  </React.StrictMode>
);
